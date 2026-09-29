# Magister · Formulario de matrícula

Formulario de matrícula por pasos para una academia de oposiciones, desarrollado con **Angular 22**.
Es la migración de un reto frontend que hice originalmente en React. El diseño es el mismo, píxel a píxel,
pero ahora el formulario funciona de principio a fin.

**Demo:** https://romerogarcia.github.io/Reto-Frontend-Magister/

**Stack:** Angular 22 · TypeScript (strict) · Signals · Componentes standalone · Reactive Forms ·
Zoneless · Lazy loading · SCSS (BEM + atomic design + design tokens) · Responsive · Vitest · Stylelint

## Funcionalidades

- **Proceso de 6 pasos:** especialización → horario y modalidad → tarifa → datos personales →
  dirección → forma de pago → confirmación.
- **Validación de formularios:** campos obligatorios, email, **DNI/NIE con letra de control**,
  móvil español y código postal. Los errores aparecen junto a cada campo.
- **Estado compartido con signals** (`EnrollmentStore`). Se guarda en `sessionStorage`, así que
  recargar la página o volver atrás no borra lo introducido.
- **Guards de navegación:** no se puede saltar a un paso sin completar los anteriores, y la
  página final solo se ve después de enviar.
- **Accesibilidad:** botón principal con contraste 12:1 (WCAG AAA), `role="radiogroup"`/`aria-checked` en los botones de opción,
  `aria-current` en el paso activo, foco visible con teclado y envío con Enter.
- **Lazy loading** de cada página y un título de pestaña para cada paso.
- **Responsive:** móvil, tablet y escritorio.

## Arquitectura

```
src/app/
├── core/                      Lógica de negocio (sin UI)
│   ├── enrollment.model.ts    Tipos de los datos de cada paso
│   ├── enrollment.data.ts     Opciones (ramas, tarifas...) y configuración de los pasos
│   ├── enrollment.store.ts    Estado global con signals + persistencia
│   ├── step.guard.ts          Guards funcionales (CanActivateFn)
│   ├── forms/                 Mensajes de error reutilizables
│   └── validators/            Validadores personalizados (DNI/NIE, móvil, CP)
├── ui/                        Componentes de interfaz (atomic design)
│   ├── atoms/                 button, icon, logo, info-link, control
│   ├── molecules/             form-field, fieldset, choice-group, checkbox, step-actions
│   ├── organisms/             steps-sidebar
│   └── templates/             step-layout, hero-layout
├── pages/                     Una página por paso (standalone, OnPush, lazy)
├── app.routes.ts
└── app.config.ts
src/styles/
├── abstracts/                 Design tokens: colores, tipografía, espaciado, breakpoints, mixins
├── base/                      Reset y estilos de elementos HTML
├── atoms/                     Átomos aplicados con directiva sobre elementos nativos
└── layout/                    Utilidades de maquetación (l-grid, l-stack)
```

## Sistema de diseño

### Atomic design + BEM

Cada componente de `ui/` define un bloque BEM con prefijo según su nivel:

| Prefijo | Nivel     | Ejemplos                                                  |
| ------- | --------- | --------------------------------------------------------- |
| `a-`    | Átomo     | `a-button--primary`, `a-control--invalid`, `a-logo__text` |
| `m-`    | Molécula  | `m-form-field__label`, `m-choice-group--grid`             |
| `o-`    | Organismo | `o-steps-sidebar__item--active`                           |
| `t-`    | Plantilla | `t-step-layout__title`, `t-hero__text--wide`              |
| `l-`    | Layout    | `l-grid--3`, `l-stack`                                    |
| `u-`    | Utilidad  | `u-visually-hidden`                                       |

La clase del bloque se pone en el propio elemento del componente (`host`), así no se añaden
`div` extra. Como los nombres BEM ya son únicos, los componentes usan
`ViewEncapsulation.None` y sus estilos viven junto a cada componente.

**Stylelint** comprueba que todas las clases sigan este patrón (`npm run lint:styles`). Una clase
como `.section2__container-b__button` hace fallar el lint.

### Design tokens

Todos los valores salen de variables en `src/styles/abstracts/`. Cualquier `.scss` las importa con
`@use 'abstracts' as *;`:

- **Colores** (`_colors.scss`): la paleta original (`$navy-900`, `$sky-500`...) más alias
  semánticos (`$color-text-muted`, `$color-action`, `$color-error`...). Los componentes solo
  usan los alias.
- **Tipografía** (`_typography.scss`): familia, pesos, escala de tamaños y tamaños fluidos con
  `clamp()` para los títulos.
- **Espaciado y medidas** (`_spacing.scss`): escala `$space-*`, radios, sombras, alturas de controles.
- **Tamaños de pantalla** (`_breakpoints.scss`): `sm` 576px, `md` 768px, `lg` 1024px, `xl` 1280px,
  con los mixins `mq()` (mobile-first) y `mq-down()`.

### Responsive

Mobile-first. En móvil y tablet, el panel lateral pasa a ser una cabecera con el paso actual y
una barra de progreso. Los campos se colocan en una columna en móvil y en 2–3 columnas a partir
de tablet.

## Scripts

```bash
npm install
npm start        # http://localhost:4200
npm test         # tests unitarios con Vitest
npm run lint:styles  # comprueba BEM y buenas prácticas en SCSS
npm run build    # build de producción en dist/
npm run build:pages  # build para GitHub Pages en docs/
```

La demo se publica con GitHub Pages desde la carpeta `docs/` de la rama `main`.
Para actualizarla: `npm run build:pages` y haz commit de `docs/`.

Requiere Node.js 22.22.3 o superior (o Node 24).

## Qué cambió respecto a la versión React

| Antes (React 18, 2022)                                    | Ahora (Angular 22)                                          |
| --------------------------------------------------------- | ----------------------------------------------------------- |
| Solo maquetación: los botones no hacían nada              | Formulario completo con estado y validación                 |
| Sidebar copiado en las 6 páginas                          | Un único componente `StepsSidebar` configurado por datos    |
| Opciones escritas a mano en el HTML                       | Datos en `enrollment.data.ts` y renderizado con `@for`      |
| `<a>` dentro de `<button>` (HTML no válido)               | Botones semánticos con navegación programática              |
| Se podía entrar a cualquier paso por la URL               | Guards que controlan el orden de los pasos                  |
| El texto escrito en los inputs apenas se leía             | Los campos rellenos se ven con contraste suficiente         |
| Sin tests                                                 | Tests unitarios del store, guards, validadores y formulario |
| CSS con clases repetidas por página y medidas fijas en px | Atomic design + BEM + design tokens, validado con Stylelint |
| Solo escritorio (anchos fijos de 850px)                   | Responsive, mobile-first                                    |

## Posibles mejoras

- Guardar las matrículas en Firebase/Firestore (la configuración está en el proyecto original).
- Hacer funcionales los textos informativos ("Consulta condiciones", "Ver información legal"), por ejemplo con un modal.
- Pasar los formularios a Signal Forms cuando la API sea estable.
