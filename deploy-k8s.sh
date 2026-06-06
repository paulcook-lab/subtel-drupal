#!/bin/bash
set -e

echo "🚀 SUBTEL Drupal 10 - Despliegue en Kubernetes"
echo "=============================================="
echo ""

# 1. Build Docker image
echo "📦 Paso 1: Construyendo imagen Docker..."
docker build -t paulcook-lab/subtel-drupal:latest .
echo "✅ Imagen Docker construida"
echo ""

# 2. Load image en Docker Desktop K8s
echo "📥 Paso 2: Cargando imagen en Docker Desktop..."
docker tag paulcook-lab/subtel-drupal:latest paulcook-lab/subtel-drupal:latest
echo "✅ Imagen lista"
echo ""

# 3. Crear namespace
echo "📁 Paso 3: Creando namespace 'subtel'..."
kubectl apply -f kubernetes/01-namespace.yaml
echo "✅ Namespace creado"
echo ""

# 4. Aplicar Secret (credenciales de BD)
echo "🔐 Paso 4: Aplicando Secret (credenciales BD)..."
kubectl apply -f kubernetes/02-secret.yaml
echo "✅ Secret aplicado"
echo ""

# 5. Aplicar ConfigMap
echo "⚙️  Paso 5: Aplicando ConfigMap..."
kubectl apply -f kubernetes/02-configmap.yaml
echo "✅ ConfigMap aplicado"
echo ""

# 6. Desplegar PostgreSQL
echo "🗄️  Paso 6: Desplegando PostgreSQL..."
kubectl apply -f kubernetes/05-postgresql.yaml
echo "✅ PostgreSQL desplegado"
echo ""

# 7. Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté listo (máximo 30 segundos)..."
kubectl wait --for=condition=ready pod -l app=postgres -n subtel --timeout=30s
echo "✅ PostgreSQL está listo"
echo ""

# 8. Crear Deployment
echo "🎯 Paso 8: Desplegando Drupal (2 replicas)..."
kubectl apply -f kubernetes/03-deployment.yaml
echo "✅ Deployment creado"
echo ""

# 9. Crear Service
echo "🔗 Paso 9: Exponiendo servicio..."
kubectl apply -f kubernetes/04-service.yaml
echo "✅ Service creado"
echo ""

# 10. Esperar a que Drupal esté listo
echo "⏳ Esperando a que Drupal esté listo (máximo 2 minutos)..."
kubectl wait --for=condition=ready pod -l app=drupal -n subtel --timeout=120s
echo "✅ Drupal está listo"
echo ""

# 11. Obtener URL
echo "🌐 Acceso al servicio:"
echo "=============================================="
kubectl get svc -n subtel
echo ""
echo "🔗 URL: http://localhost:80"
echo ""

# 12. Ver logs
echo "📋 Últimos logs:"
kubectl logs -n subtel -l app=drupal --tail=5
echo ""

# 13. Mostrar credenciales
echo "🔐 CREDENCIALES DE BD:"
echo "=============================================="
echo "Host: postgres"
echo "Database: drupal"
echo "User: admin@subtel.gob.cl"
echo "Password: changeme"
echo "Port: 5432"
echo ""

echo "✅ ¡DESPLIEGUE COMPLETADO!"
echo "=============================================="
echo ""
echo "Comandos útiles:"
echo "  kubectl get pods -n subtel              (ver pods)"
echo "  kubectl logs -n subtel -l app=drupal    (ver logs)"
echo "  kubectl port-forward -n subtel svc/drupal 8080:80  (acceso local)"
echo "  kubectl delete namespace subtel         (eliminar todo)"
