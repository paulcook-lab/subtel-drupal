# 🛣️ Roadmap de Componentes para TRA (Telecommunications Regulatory Authority, UAE)

**Basado en:** Análisis comparativo de MKM.ee (Estonia) y SUBTEL (Chile)  
**Objetivo:** Modernizar sitio TRA con componentes reutilizables probados  
**Timeline:** 12-18 meses en 3 fases  
**Costo Estimado:** $500K - $1.2M

---

## 📋 Índice

1. [Estrategia](#estrategia)
2. [Componentes Críticos](#componentes-críticos-p0)
3. [Componentes Secundarios](#componentes-secundarios-p1)
4. [Roadmap Detallado](#roadmap-detallado)
5. [Arquitectura Técnica](#arquitectura-técnica)
6. [Consideraciones de Localización](#consideraciones-de-localización)

---

## 🎯 Estrategia

### Principio Core: "Boil the Lake"
**No reinventar la rueda.** TRA debe:
- ✅ Copiar arquitectura de componentes de SUBTEL (ya validado)
- ✅ Integrar mejores prácticas de accesibilidad de MKM.ee
- ✅ Adaptar a contexto local UAE (idioma árabe, colores oficiales)
- ✅ Agregar componentes específicos de regulador telecom

### Fases de Implementación

| Fase | Duration | Focus | Deliverable |
|------|----------|-------|-------------|
| **1: Foundation** | 0-3 meses | Header, Hero, Services, Footer, Accessibility | Site moderno con navegación clara |
| **2: Digital Services** | 3-6 meses | Portal solicitudes, Búsqueda, Chat IA, Dashboard | Regulador digital completo |
| **3: Innovation** | 6-12 meses | APIs públicas, Automatización, Análisis avanzado | Ecosystem abierto |

---

## 🔴 COMPONENTES CRÍTICOS (P0)

Estos **MUST HAVE** en Fase 1 (0-3 meses).

### 1. Header Navigation Component

**Basado en:** SUBTEL (menú jerarquizado) + MKM (búsqueda arriba)

**Requisitos:**
```
┌─────────────────────────────────────────┐
│ 🏛️ TRA LOGO | SEARCH | Language (EN/AR) │  ← Header principal
├─────────────────────────────────────────┤
│ Solicitudes | Regulaciones | Datos | Contacto  │  ← Nav principal
│   ├─ Submenu 1                          │
│   ├─ Submenu 2                          │
│   └─ ...                                │
├─────────────────────────────────────────┤
│ Breadcrumb (si aplica)                  │
└─────────────────────────────────────────┘
```

**Especificaciones:**
- Logo TRA 200x50px (izquierda)
- Búsqueda global (centro)
- Selector EN/AR muy visible (derecha)
- Menú hamburger en móvil (<640px)
- Submenu dropdown en desktop
- Sticky en scroll (opcional en v1)
- WCAG 2.1 AA: contraste > 4.5:1, keyboard nav

**Stack Recomendado:**
- Drupal: Metatag del template
- Frontend: Vue.js component o Twig template puro
- CSS: CSS Grid + Flexbox
- Estado: localStorage para lang selector

**Tiempo de Dev:** 5-7 días  
**Testing:** Responsive (mobile, tablet, desktop), teclado, screen reader

---

### 2. Hero Carousel Component

**Basado en:** SUBTEL carrusel 3-banners

**Requisitos:**
```
┌──────────────────────────────────────────────┐
│                                              │
│   [  BANNER CON IMAGEN + OVERLAY TEXT  ]     │
│                                              │
│   ⚫ ⚪ ⚪   ← Navigation dots               │
└──────────────────────────────────────────────┘
```

**Especificaciones:**
- 3 banners por defecto (configurable)
- Altura: 400px desktop, 250px mobile
- Auto-play cada 5 segundos
- Pausa en hover
- Navigation dots (clickables)
- Imagen background-cover
- Text overlay con fondo semi-transparent
- CTA button (opcional por banner)
- Accesible: role="region" aria-label

**Datos Ejemplo:**
```json
[
  {
    "id": 1,
    "image_url": "/images/hero-1.jpg",
    "title": "Solicitudes Online",
    "description": "Presentar tus solicitudes en línea de forma fácil",
    "cta_text": "Inicia ahora",
    "cta_url": "/solicitudes"
  }
]
```

**Tiempo de Dev:** 4-6 días  
**Testing:** Autoplay, navegación, responsive, accessibility

---

### 3. Service Grid Component

**Basado en:** SUBTEL service cards con descripción

**Requisitos:**
```
┌────────┬────────┬────────┐
│ Card 1 │ Card 2 │ Card 3 │
├────────┼────────┼────────┤
│ Card 4 │ Card 5 │ Card 6 │
└────────┴────────┴────────┘
Mobile: Stack vertical
```

**Especificaciones:**
- Grid: 3 columnas (desktop), 2 (tablet), 1 (mobile)
- Cards: 300x300px mínimo
- Cada card: Icono + Título + Descripción + Link
- Background: Color uniforme o image
- Hover effect: Elevación (box-shadow) o color change
- Padding interno: 20px
- Gap entre cards: 16px
- Fully responsive

**Datos Ejemplo:**
```json
{
  "services": [
    {
      "id": 1,
      "icon": "📋",
      "title": "Gestión de Solicitudes",
      "description": "Presenta y da seguimiento a tus solicitudes",
      "link": "/solicitudes",
      "color": "#cc0000"
    }
  ]
}
```

**Tiempo de Dev:** 3-4 días  
**Testing:** Responsive, hover states, accessibility

---

### 4. Accessibility Toggle Component

**Basado en:** MKM.ee controles

**Requisitos:**
```
┌─ Accesibilidad ─────────────────┐
│ Aumentar Texto    [ A ][ AA ]    │
│ Alto Contraste    [ ON / OFF ]   │
│ Reset             [ Reset ]      │
└─────────────────────────────────┘
```

**Especificaciones:**
- 3 funciones: Tamaño texto, contraste alto, reset
- Botones claramente visibles
- Estado persistido en localStorage
- CSS variables dinámicas:
  ```css
  :root {
    --font-size: 16px;
    --contrast-mode: false;
  }
  
  body.contrast-high {
    --text-color: #000;
    --bg-color: #fff;
    --link-color: #0066cc;
  }
  ```
- Accessible: ARIA labels, keyboard nav
- Posición: Siempre visible (top-right o integrated en header)

**Tiempo de Dev:** 2-3 días  
**Testing:** localStorage persistence, contrast ratio, keyboard

---

### 5. Footer Component

**Basado en:** MKM.ee footer multi-columna

**Requisitos:**
```
┌─────────────────────────────────────────────────┐
│ COLUMNA 1    │ COLUMNA 2    │ COLUMNA 3        │
│ • Link 1     │ • Link 1     │ • Link 1         │
│ • Link 2     │ • Link 2     │ • Link 2         │
├─────────────────────────────────────────────────┤
│ Social Icons │ Legal Links  │ Contacto         │
├─────────────────────────────────────────────────┤
│ Copyright © 2026 TRA                            │
└─────────────────────────────────────────────────┘
```

**Especificaciones:**
- 4-5 columnas (desktop), stack vertical (mobile)
- Cada columna: Header + lista de links
- Social media icons (LinkedIn, Twitter, etc.)
- Horarios de atención
- Contacto info (teléfono, email)
- Legal/Privacy links
- Copyright notice
- Responsive: 4 cols → 2 cols → 1 col

**Datos Ejemplo:**
```json
{
  "columns": [
    {
      "title": "Servicios",
      "links": [
        {"text": "Solicitudes", "url": "/solicitudes"},
        {"text": "Regulaciones", "url": "/regulaciones"}
      ]
    }
  ],
  "social": [
    {"icon": "linkedin", "url": "https://linkedin.com/company/tra"}
  ],
  "contact": {
    "phone": "+971 4 XXX XXXX",
    "email": "info@tra.gov.ae",
    "hours": "9:00 - 17:00 (Lunes a Viernes)"
  }
}
```

**Tiempo de Dev:** 3-4 días  
**Testing:** Responsive, link functionality, social icons

---

### 6. Cookie Banner Component

**Basado en:** GDPR standard

**Requisitos:**
```
┌─────────────────────────────────────────────────┐
│ Este sitio usa cookies. Acepta para continuar.  │
│                                                 │
│ [Aceptar]  [Rechazar]  [Configurar] ────────→  │
└─────────────────────────────────────────────────┘
```

**Especificaciones:**
- Sticky bottom until dismissed
- Opción de aceptar/rechazar/configurar
- ConfigModal con checkboxes:
  - ☑ Essential (siempre checked)
  - ☐ Analytics
  - ☐ Marketing
- Guardar preferencia en cookie por 1 año
- Accesible: ARIA live region, keyboard nav
- Mobile friendly

**Stack:**
- Cookie library: js-cookie
- Modal: Bootstrap Modal o custom

**Tiempo de Dev:** 2-3 días  
**Testing:** Cookie storage, modal functionality

---

## 🟡 COMPONENTES SECUNDARIOS (P1)

Estos vienen después de P0, dentro de Fase 1-2.

### 7. Search Bar Component
- Búsqueda global con autocompletado
- Integración ElasticSearch
- Historial de búsquedas
- Filtros por tipo (documentos, noticias, servicios)

**Tiempo de Dev:** 8-10 días

---

### 8. News/Updates Carousel
- Similar a Service Grid pero con noticias
- Imagen, fecha, título, extracto, link
- 3-4 tarjetas visibles
- Auto-scroll opcional
- Arrows para navegación

**Tiempo de Dev:** 5-6 días

---

### 9. Request Portal Component
**CRÍTICO para regulador telecom**

Permitir que operadores presenten solicitudes online:
- Formulario multi-step
- Validación en tiempo real
- Carga de documentos
- Seguimiento de estado
- Email notifications

**Tiempo de Dev:** 20-25 días (incluye backend)

---

### 10. Chatbot/IA Component
**Basado en:** IRCO de SUBTEL

- Embed como iframe o Web Component
- Bilingüe (EN + AR)
- FAQs integrados
- Fallback a formulario de contacto

**Tiempo de Dev:** 10-15 días (si usas vendor como Dialogflow)

---

### 11. Data Dashboard
- KPIs principales (solicitudes pendientes, espectro asignado, etc.)
- Gráficos interactivos (Chart.js, Recharts)
- Mapas de cobertura (Mapbox, Leaflet)
- Export a CSV/JSON

**Tiempo de Dev:** 15-20 días

---

## 📅 Roadmap Detallado

### FASE 1: Foundation (0-3 meses)

**Sprint 1 (Semanas 1-2):**
- [ ] Setup proyecto (Drupal 10, theme custom)
- [ ] Design System (tokens CSS, colores)
- [ ] Header component
- [ ] Footer component

**Sprint 2 (Semanas 3-4):**
- [ ] Hero Carousel
- [ ] Service Grid
- [ ] Accessibility Toggle
- [ ] Cookie Banner

**Sprint 3 (Semanas 5-6):**
- [ ] Search Bar (básico)
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] WCAG 2.1 AA audit
- [ ] Staging deploy

**Sprint 4 (Semanas 7-8):**
- [ ] QA y fixes
- [ ] Performance optimization (Lighthouse > 80)
- [ ] SEO setup (meta tags, schema.org)
- [ ] Production deploy Phase 1

**Deliverable:** Sitio moderno, accesible, mobile-first.

### FASE 2: Digital Services (3-6 meses)

**Sprint 5-6:**
- [ ] Request Portal backend
- [ ] Request Portal frontend
- [ ] Email notifications
- [ ] Status tracking

**Sprint 7-8:**
- [ ] News Carousel
- [ ] Chatbot integration
- [ ] Advanced Search (ElasticSearch)
- [ ] Initial Dashboard (KPIs básicos)

**Sprint 9-10:**
- [ ] Integration testing
- [ ] UAT con operadores
- [ ] Training para staff
- [ ] Production deploy Phase 2

**Deliverable:** Portal digital completo, solicitudes online, soporte IA.

### FASE 3: Innovation (6-12 meses)

**Sprint 11-12:**
- [ ] Public APIs (REST endpoints)
- [ ] Developer documentation
- [ ] API key management
- [ ] Rate limiting

**Sprint 13-14:**
- [ ] Advanced Dashboard (mapas, predicciones)
- [ ] Automation workflows
- [ ] Analytics avanzado (Google Analytics 4)

**Sprint 15-16:**
- [ ] Optimización continua
- [ ] Performance tuning
- [ ] Scaling infrastructure
- [ ] Final polish

**Deliverable:** Ecosystem abierto, datos públicos, automatización.

---

## 🏗️ Arquitectura Técnica

### Stack Recomendado

**Backend:**
- Framework: Drupal 10 (como SUBTEL)
- Database: PostgreSQL
- Search: ElasticSearch
- Cache: Redis
- API: REST (+ GraphQL opcional)

**Frontend:**
- Template Engine: Twig (Drupal-native)
- JS Framework: Vue.js 3 (para componentes complejos)
- CSS: CSS Grid + Flexbox
- Build: Webpack/Vite
- CSS Preprocessor: SCSS

**Infrastructure:**
- Hosting: AWS / Azure / Local data center UAE
- CI/CD: GitHub Actions / GitLab CI
- Monitoring: Datadog / New Relic
- CDN: Cloudflare

**Design System:**
```
/theme/
  /css/
    /tokens/
      _colors.scss    → Paleta UAE
      _typography.scss → Open Sans
      _spacing.scss   → 8px grid
    /components/
      _header.scss
      _footer.scss
      _hero.scss
      ...
  /templates/
    /components/
      header.html.twig
      footer.html.twig
      ...
  /images/
    icons/            → SVG iconset
```

---

## 🌍 Consideraciones de Localización

### Árabe vs Inglés

**Cambios de Layout:**
- Árabe (RTL): texto y direcciones se invierten
- Usar CSS `direction: rtl` en `<html dir="ar">`

```css
.header-nav {
  flex-direction: row;  /* LTR */
}

html[dir="ar"] .header-nav {
  flex-direction: row-reverse;  /* RTL */
}
```

### Paleta de Colores UAE

**Mantener identidad oficial:**
- Rojo: #CC0000 (primario)
- Verde: #00A651 (secundario)
- Blanco: #FFFFFF (fondo)
- Gris: #333333 (texto)

**Pero modernizar:**
- Agregar gradientes sutiles
- Sombras más definidas
- Espaciado más generoso
- Tipografía más legible

### Tipografía

**Árabe:**
- Arial, Cairo, Droid Arabic Naskh, Scheherazade
- Size: Mínimo 16px (más grande que inglés)

**Inglés:**
- Open Sans (como SUBTEL)
- Size: 14-16px body

---

## 📊 Matriz de Estimación

| Componente | Dev Days | QA Days | Total | Costo Est. |
|------------|----------|---------|-------|-----------|
| Header | 6 | 2 | 8 | $8K |
| Hero Carousel | 5 | 2 | 7 | $7K |
| Service Grid | 4 | 1 | 5 | $5K |
| Accessibility | 3 | 1 | 4 | $4K |
| Footer | 4 | 1 | 5 | $5K |
| Cookie Banner | 3 | 1 | 4 | $4K |
| **Subtotal P0** | **25** | **8** | **33** | **$33K** |
| Search Bar | 9 | 3 | 12 | $12K |
| News Carousel | 6 | 2 | 8 | $8K |
| Request Portal | 25 | 8 | 33 | $33K |
| Chatbot | 12 | 4 | 16 | $16K |
| Dashboard | 18 | 6 | 24 | $24K |
| **Subtotal P1** | **70** | **23** | **93** | **$93K** |
| APIs | 20 | 8 | 28 | $28K |
| Advanced Features | 40 | 15 | 55 | $55K |
| **Subtotal P2** | **60** | **23** | **83** | **$83K** |
| **Overhead (PM, Infra, etc.)** | | | | **$141K** |
| **TOTAL** | **155** | **54** | **209 días** | **$350K** |

**Nota:** Costo total estimado $350-500K para todos los componentes + infraestructura.

---

## ✅ Checklist de Aceptación

Cada componente debe pasar:

- [ ] Funciona en todos los navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Responsive en móvil, tablet, desktop
- [ ] WCAG 2.1 AA accesible (Lighthouse score > 80)
- [ ] Performance: CLS < 0.1, LCP < 2.5s
- [ ] Bilingüe (EN/AR) con RTL support
- [ ] Documentado (componentes.md)
- [ ] Unit tested (90%+ coverage)
- [ ] E2E tested (Cypress/Playwright)
- [ ] Code reviewed por 2+ desarrolladores
- [ ] Aprobado por producto y diseño

---

## 🎓 Referencias y Inspiración

**Sitios Analizados:**
- SUBTEL (subtel.gob.cl) - Chile
- MKM.ee (mkm.ee) - Estonia
- Ofcom (ofcom.org.uk) - UK
- FCC (fcc.gov) - USA

**Recursos Técnicos:**
- Drupal 10 Documentation
- Vue.js 3 Guide
- WCAG 2.1 Guidelines
- Material Design System
- Carbon Design System (IBM)

---

## 📌 Conclusión

**TRA puede lograr una transformación digital completa en 12-18 meses replicando componentes comprobados de SUBTEL y MKM.ee, adaptándolos al contexto local UAE.**

La clave es:
1. **Fase 1:** Foundation (componentes base)
2. **Fase 2:** Digital Services (portal, búsqueda, chat)
3. **Fase 3:** Innovation (APIs, datos abiertos)

**Inversión estimada:** $350-500K  
**ROI:** Operadores más eficientes, transparencia regulatoria, mejor experiencia usuario.

---

*Documento preparado: 06 de Junio, 2026*  
*Basado en análisis de sitios web de reguladores telecom globales*
