# Actualización del Tema SUBTEL Drupal

**Fecha:** Junio 6, 2026  
**Rol:** Análisis UX de subtel.cl + Integración Drupal + IRCO + UI Kit Digital

## 📋 Análisis Realizado

### 1. Auditoría de subtel.cl (Web Oficial)
- ✅ Tipografía: **Open Sans** (actualizada en CSS)
- ✅ Color principal texto: **#475156** (actualizado)
- ✅ Estructura: Header gov bar + nav principal + búsqueda + carrusel noticias + footer
- ✅ Componentes: Botones, cards, links, carrusel

### 2. Kit Digital del Gobierno
- Colores agregados para estados (Success, Warning, Danger, Info)
- Componentes UI respetando normas de accesibilidad (WCAG 2.1)
- Tipografía: Open Sans para body, Georgia para títulos

### 3. IRCO - Asistente IA
- Accesible en: http://172.30.10.179:5173/
- Sin autenticación requerida
- Integrado como iframe embebido reutilizable

## 📝 Cambios Implementados

### A. CSS Actualizado (`subtel-platform.css`)
```
✅ Tipografía: Open Sans (subtel.cl)
✅ Color texto: #475156 (oficial SUBTEL)
✅ Kit Digital colors: --kit-success, --kit-warning, --kit-danger, --kit-info
✅ Nuevos estilos:
   - .irco-embed (contenedor principal)
   - .irco-embed-header (header con gradiente)
   - .irco-embed-container (iframe)
   - .news-carousel (grid de noticias)
   - .news-card (tarjeta individual)
```

### B. Nuevos Templates Twig

#### 1. `block--irco-embed.html.twig`
- Bloque reutilizable para integrar IRCO
- Header con gradiente azul SUBTEL
- Badge "Beta" para indicar estado
- Fallback a iframe si no hay contenido dinámico
- Atributos accesibles (role, aria-label)

#### 2. `page--news.html.twig` 
- Página de noticias/anuncios
- Carrusel de 3 noticias de ejemplo
- Estructura similar a subtel.cl
- Integra zona para IRCO (page.irco)
- Enlaces de soporte en footer

#### 3. `page--servicios.html.twig`
- Página de servicios SUBTEL
- Grid de 6 servicios principales
- Sección integrada de IRCO
- Contacto rápido en footer

#### 4. `page--contacto.html.twig`
- Página de contacto
- 4 formas de contacto principales
- Panel de horarios de atención
- Integración de IRCO para soporte
- Estilos inline para items de contacto

## 🎨 Cambios Visuales

### Colores
| Elemento | Color | Anterior | Nuevo |
|----------|-------|----------|-------|
| Tipografía | Font | Source Sans 3 | Open Sans |
| Texto Body | #212529 | #475156 | ✅ OFICIAL SUBTEL |
| Links | var(--subtel-primary) | var(--subtel-primary) | Sin cambios |
| Accent | var(--subtel-accent) | var(--subtel-accent) | Sin cambios |

### Componentes Nuevos
- ✅ Tarjetas de noticias con imagen, título, extracto, fecha
- ✅ Grid de servicios responsivo
- ✅ Bloque IRCO con header personalizado
- ✅ Panel de contacto con ícono emoji

## 📱 Responsividad

Todos los componentes nuevos respetan:
- Mobile-first approach
- Breakpoint máximo: 1280px
- Media queries para tablets (@media 900px)
- Grid responsivo con auto-fit

## ♿ Accesibilidad (Kit Digital)

- ✅ ARIA labels en todos los bloques
- ✅ Semantic HTML (section, main, footer, article, aside)
- ✅ Roles ARIA (banner, navigation, contentinfo)
- ✅ Color contrast según WCAG 2.1 AA
- ✅ Skip link a contenido principal

## 🔗 Integración IRCO

### Ubicación
Disponible en todas las páginas principales:
- Página de noticias
- Página de servicios
- Página de contacto

### Implementación
```html
{% if page.irco %}
  <section class="subtel-band">
    {{ page.irco }}
  </section>
{% endif %}
```

### Configuración
- URL: `http://172.30.10.179:5173/`
- Sin autenticación
- Responsivo (altura: 500px, min-height: 400px)
- Fallback a iframe si no hay contenido dinámico

## 📋 Checklist de Implementación

- ✅ CSS actualizado con colores y tipografía de subtel.cl
- ✅ Kit Digital colors agregados
- ✅ Template IRCO creado y funcionando
- ✅ Página de noticias implementada
- ✅ Página de servicios implementada
- ✅ Página de contacto implementada
- ✅ Accesibilidad según normas
- ✅ Responsividad verificada
- ✅ Documentación completa

## 🧪 Testing Realizado

### Before/After
1. Verificado tipografía (Open Sans visible)
2. Verificado colores (#475156 en body)
3. Verificado carrusel de noticias
4. Verificado integración IRCO (fallback funcional)
5. Verificado responsividad en mobile/tablet/desktop

## 🚀 Próximos Pasos Opcionales

1. Crear módulo Drupal para gestionar IRCO URL dinámicamente
2. Implementar carrusel de noticias desde contenido Drupal (nodes)
3. Agregar más páginas: FAQ, Transparencia, Estadísticas
4. Integrar Matomo analytics para KPIs
5. Setup CDN para imágenes de noticias

## 📞 Contacto

Para preguntas sobre esta actualización:
- Email: contacto@subtel.cl
- Teléfono: +56 2 2327 6000
- Sitio web: https://www.subtel.gob.cl
