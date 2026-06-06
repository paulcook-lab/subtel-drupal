# 🚀 SUBTEL Drupal 10 - Despliegue en Kubernetes

**Status:** ✅ Desplegado en Docker Desktop Kubernetes  
**Namespace:** `subtel`  
**Réplicas:** 2 pods  
**Acceso:** `http://localhost:8080`

---

## 📊 Estado Actual

```bash
kubectl get all -n subtel
```

**Componentes:**
- ✅ Namespace `subtel` creado
- ✅ ConfigMap con variables de entorno
- ✅ Deployment (2 réplicas de Drupal)
- ✅ LoadBalancer Service en localhost

---

## 🌐 Acceso a la Aplicación

### Opción 1: Port-Forward (Ya configurado)
```bash
kubectl port-forward -n subtel svc/drupal 8080:80
```
**URL:** `http://localhost:8080`

### Opción 2: LoadBalancer (Docker Desktop)
```bash
kubectl get svc -n subtel
```
**URL:** `http://localhost` (puerto 80 expuesto)

---

## 📋 Logs & Debugging

```bash
# Ver logs en vivo
kubectl logs -n subtel -l app=drupal -f

# Ver logs últimas líneas
kubectl logs -n subtel -l app=drupal --tail=50

# Exec en el pod
kubectl exec -it <pod-name> -n subtel -- /bin/bash

# Describir pod
kubectl describe pod <pod-name> -n subtel
```

---

## 🔧 Configuración de Drupal

Al acceder por primera vez, Drupal mostrará la página de instalación. Para completar la configuración:

1. **Database:** Usa SQLite (por defecto, sin DB externa)
2. **Site Name:** SUBTEL Chile
3. **Admin Account:** 
   - Username: `admin`
   - Password: (elige uno seguro)
4. **Email:** `admin@subtel.gob.cl`

### Activar el Tema personalizado
```bash
# Accede al pod
kubectl exec -it <pod-name> -n subtel -- /bin/bash

# Dentro del pod
cd /var/www/html
./bin/drush theme:enable subtel_improved
./bin/drush config:set system.theme default subtel_improved
./bin/drush cache:rebuild
```

---

## 📦 Archivos de Configuración

```
kubernetes/
├── 01-namespace.yaml      # Namespace: subtel
├── 02-configmap.yaml      # Variables de entorno
├── 03-deployment.yaml     # 2 réplicas de Drupal
└── 04-service.yaml        # LoadBalancer Service
```

---

## 🚀 Comandos Útiles

```bash
# Escalar a más réplicas
kubectl scale deployment drupal -n subtel --replicas=3

# Reiniciar pods
kubectl rollout restart deployment/drupal -n subtel

# Ver eventos
kubectl get events -n subtel --sort-by='.lastTimestamp'

# Ejecutar comando en pod
kubectl exec -n subtel <pod-name> -- /bin/drush status

# Copiar archivo del pod
kubectl cp subtel/<pod-name>:/path/to/file ./local-file
```

---

## 🛑 Eliminar el Despliegue

```bash
# Eliminar todo (namespace + recursos)
kubectl delete namespace subtel

# Eliminar solo deployment
kubectl delete deployment drupal -n subtel
```

---

## 📊 Mejoras Futuras

- [ ] PostgreSQL o MySQL como database backend
- [ ] PersistentVolume para archivos Drupal
- [ ] Nginx Ingress Controller para routing
- [ ] SSL/TLS con Let's Encrypt
- [ ] Health checks mejorados
- [ ] Resource limits y requests optimizados
- [ ] CI/CD con GitHub Actions

---

## 🔗 Referencias

- **Kubernetes Docs:** https://kubernetes.io/docs/
- **Docker Desktop K8s:** https://docs.docker.com/desktop/kubernetes/
- **Drupal en K8s:** https://www.drupal.org/docs/hosting

---

**¡Drupal 10 desplegado en Kubernetes! 🎉**
