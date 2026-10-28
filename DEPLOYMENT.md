# Plan de despliegue — Rastreomex

Este documento es el mapa de ruta para llevar el sitio a producción y mantenerlo
actualizado después. Está dividido en etapas. No hay que hacerlas todas de
una sentada — cada etapa termina en un estado funcional, y la siguiente se
retoma cuando estés listo.

**Estado de cada etapa:** `⬜ pendiente` · `🔄 en curso` · `⏸ pausado` · `✅ hecho`

---

## Decisión 0: dónde hospedar ✅ resuelto — Cloudflare Pages

Pediste AWS a menos que hubiera una razón para no usarlo. La investigué y
el resultado es: **AWS es una opción válida y barata, pero no es la más
simple.** Esto es lo que encontré, con costos reales (no estimados de memoria):

| | **AWS (S3 + CloudFront)** | **Cloudflare Pages** |
|---|---|---|
| Costo mensual | ~$0.50 USD (solo la zona DNS en Route 53) + lo que ya pagas por el dominio. El resto (CloudFront) cae dentro de su capa gratuita permanente de 1 TB de transferencia / 10M requests al mes — para este sitio nunca la vas a rozar. | **$0.00 USD.** Sin letra chica: bandwidth ilimitado, SSL, CDN y hasta 100 dominios personalizados gratis por proyecto. |
| Pasos para configurar | Bucket S3, distribución CloudFront, certificado ACM, política de acceso (OAC), y luego un workflow de CI que suba archivos con credenciales de AWS (IAM) y mande invalidar el caché. Son ~6-8 piezas que conectar. | Conectas el repo de GitHub, defines el comando de build y la carpeta de salida. Cloudflare hace el resto (SSL, CDN, dominio) solo. |
| Mantenimiento | Tú administras cada pieza (certificados, políticas, invalidaciones). | Cloudflare administra todo; tú solo hateas `git push`. |
| Ventaja real de AWS | Si en el futuro el **backend real** (la plataforma de rastreo tipo Traccar, con base de datos, API, cuentas de usuario) también va a vivir en AWS (EC2/RDS/etc.), tiene sentido tener todo en la misma cuenta desde ahora — mismo panel, misma facturación, mismo IAM. | — |

**Mi recomendación:** si ya sabes que el backend real de la plataforma va a
vivir en AWS más adelante, usa AWS desde ahora — la Etapa 1 queda igual de
fácil y evitas migrar después. Si todavía no es seguro, o quieres lo más
simple posible para esta landing page, Cloudflare Pages te da exactamente el
mismo resultado (sitio rápido, HTTPS, dominio propio) con una fracción del
trabajo de configuración y sin ningún costo.

**Si decides AWS, seguimos con el plan tal cual está abajo.** Si prefieres
Cloudflare Pages, la Etapa 1 se reduce a 10 minutos — dímelo y te la adapto.

Fuentes consultadas: [CloudFront pricing](https://www.costbench.com/software/cdn-edge/aws-cloudfront/) ·
[Costo real S3+CloudFront+Route53](https://dev.to/pkkolla/deploying-a-static-website-with-aws-under-1-per-month-1m6e) ·
[Límites de Cloudflare Pages](https://developers.cloudflare.com/pages/platform/limits/)

---

## Etapa 0 — Ya hecho en este repo ✅

Esto ya está resuelto por el trabajo de las últimas sesiones, solo se deja
registrado aquí:

- [x] Prerendering configurado (`@nguniversal/express-engine`). `npm run
      prerender` genera HTML estático completo en `dist/rastreomex/browser/`
      — esa carpeta es exactamente lo que se sube al hosting, sin necesidad
      de un servidor Node en producción.
- [x] `robots.txt` y `sitemap.xml` en la raíz del build.
- [x] Meta tags, Open Graph, JSON-LD (negocio local + FAQ) usando
      `https://rastreomex.com/` como dominio canónico.
- [x] Imágenes de fondo comprimidas (~90% más chicas que el original).

**Dominio:** se queda en pausa por ahora (ver nota abajo). No bloquea nada
de lo que sigue — Cloudflare Pages da una URL gratis (`algo.pages.dev`) sin
necesidad de dominio propio, suficiente para que el equipo revise el sitio.

> **Nota:** mientras el dominio siga pendiente, `src/index.html` sigue
> apuntando a `https://rastreomex.com/` en el canonical/OG/JSON-LD. Eso no
> afecta la revisión interna por `pages.dev`, pero hay que recordar
> actualizarlo si el dominio final resulta ser otro, antes de anunciar el
> sitio como oficial.

---

## Etapa 1 — Infraestructura de hosting ✅ hecho (Cloudflare)

1. ~~Entrar a Cloudflare → Pages → conectar el repo de GitHub~~ ✅
   (`hackdracko/rastreomex`).
2. ~~Build command: `npm run prerender` · Output directory:
   `dist/rastreomex/browser`~~ ✅
3. Cloudflare detecta cada push a `master` y hace el deploy solo. Esto
   reemplaza toda la Etapa 3 (CI/CD) de una vez. ✅

**Sitio en vivo (revisión interna):**
**https://rastreomex.roman-jimenez-estrada.workers.dev/**

> Nota: el proyecto quedó configurado como **Workers** (la plataforma
> unificada de Cloudflare), no como "Pages" clásico — por eso la URL es
> `*.workers.dev` en vez de `*.pages.dev` como se anticipaba en este plan.
> Funciona igual (mismo CDN, mismo deploy automático en cada push); solo
> cambia el nombre del dominio gratuito. Hubo que agregar `wrangler.toml`
> en la raíz del repo para que Cloudflare sirva el sitio como archivos
> estáticos — sin ese archivo, intentaba auto-configurar el proyecto
> asumiendo Angular 19+ (este proyecto usa Angular 16) y el deploy fallaba.

Verificado: `robots.txt`, `sitemap.xml`, imágenes y CSS cargan con
status 200. El contenido corresponde a la versión actual (Plan Plataforma
Propia, carrusel de precios, header nuevo, teléfono corregido).

---

## Etapa 2 — Dominio y DNS ⏸ pausado

**⏸ En pausa por decisión del 2026-10-27** — de momento el objetivo es
solo exponer el sitio en la URL gratis de Cloudflare (`*.pages.dev`) para
que el equipo lo revise. Retomamos esto cuando el dominio esté comprado.

Cuando se retome:

1. Comprar `rastreomex.com` (sugerido: directo en Cloudflare Registrar,
   precio de costo y DNS ya integrado — ver mensaje anterior).
2. **Decidir el dominio canónico:** `rastreomex.com` o `www.rastreomex.com`.
   El otro debe redirigir al elegido (evita contenido duplicado para SEO —
   ya configuramos `rastreomex.com` sin `www` en el canonical, así que esa
   sería la elección consistente con el trabajo de SEO ya hecho).
3. En el proyecto de Cloudflare Pages: **Custom domains → Set up a custom
   domain** → Cloudflare conecta el DNS solo si el dominio vive en la misma
   cuenta.
4. Verificar HTTPS funcionando con el candado correcto.

---

## Etapa 3 — CI/CD: que cada cambio se despliegue solo ✅ ya incluido

Esta es la etapa que responde directamente a "que cualquier cambio chico o
grande sea fácil de integrar". La idea: **nunca subir archivos a mano.**
Guardas el cambio, haces `git push`, y en 2-3 minutos ya está en vivo.

Con Cloudflare Pages esto no requiere nada aparte — ya quedó resuelto en la
Etapa 1. Cada `git push` a `master` dispara el build y deploy
automáticamente, y además te da una URL de preview única para cada
rama/PR antes de llegar a producción (gratis, viene incluido).

---

## Etapa 4 — Verificación 🔄 en curso

### Ahora (revisión interna)

- [x] Sitio en línea y verificado (robots.txt, sitemap.xml, imágenes, CSS
      — todo status 200): **https://rastreomex.roman-jimenez-estrada.workers.dev/**
- [ ] Compartir la URL con las personas que van a revisar el sitio.
- [ ] Probar en un celular real: menú hamburguesa, carrusel de precios,
      botones de WhatsApp (que abran con el número correcto).
- [ ] Juntar el feedback del equipo antes de comprar el dominio y anunciar
      el sitio como oficial.

### Más adelante (cuando el dominio esté conectado — Etapa 2)

- [ ] Correr [PageSpeed Insights](https://pagespeed.web.dev/) sobre el
      dominio real (no `pages.dev`) — confirmar que el prerendering y las
      imágenes comprimidas se reflejan en el puntaje.
- [ ] Verificar `https://rastreomex.com/robots.txt` y
      `https://rastreomex.com/sitemap.xml` accesibles.
- [ ] Dar de alta el sitio y el sitemap en
      [Google Search Console](https://search.google.com/search-console).
- [ ] Revisar que el certificado SSL no muestre advertencias en ningún
      navegador.

---

## Etapa 5 — Flujo de trabajo para cambios futuros ⬜

Una vez completadas las etapas 1-4, el flujo para **cualquier cambio**
(chico: cambiar un texto o precio — grande: una sección nueva) es siempre
el mismo:

1. Hacer el cambio en el código (local o conmigo).
2. `git add` → `git commit` → `git push` a `master`.
3. Esperar el deploy automático (2-5 min según el proveedor).
4. Verificar en producción.

No hay pasos manuales de "subir archivos" en ningún escenario — ese es
justo el punto de automatizar la Etapa 3 ahora en vez de subir todo a mano
la primera vez.

### Plan de rollback

Si un despliegue rompe algo, Cloudflare Pages tiene un botón de "Rollback
to this deployment" en el dashboard sobre cualquier deploy anterior — un
clic, sin tocar git.

---

## Checklist resumen antes de anunciar el sitio como oficial

- [ ] Dominio confirmado y decidido (`rastreomex.com` vs `www`)
- [ ] Hosting elegido y funcionando (Etapa 1)
- [ ] DNS propagado, HTTPS verificado (Etapa 2)
- [ ] Deploy automático probado con un cambio real (Etapa 3)
- [ ] PageSpeed + Search Console (Etapa 4)
- [ ] Probado en al menos un celular real, no solo en el navegador de
      escritorio

---

## Preguntas resueltas

1. ~~¿AWS o Cloudflare Pages?~~ → **Cloudflare Pages** (2026-10-27).
2. ~~¿Ya tienes cuenta de Cloudflare?~~ → No, se crea como parte de la
   Etapa 1.
3. ~~¿El dominio ya está comprado?~~ → No. **En pausa** — de momento solo
   se expone el sitio en `*.pages.dev` para revisión del equipo (ver
   Etapa 2).

## Preguntas abiertas (para retomar la Etapa 2 más adelante)

1. ¿Confirmas que el dominio final es `rastreomex.com` (no `.mx` u otro)?
2. Cuando se compre: ¿`rastreomex.com` o `www.rastreomex.com` como
   dominio canónico? (recomendado: `rastreomex.com`, ya es lo que está
   configurado en el SEO)
