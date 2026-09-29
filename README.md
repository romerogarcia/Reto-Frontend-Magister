# Magister · Formulario de matrícula

Formulario de matrícula por pasos para una academia de oposiciones, desarrollado con **Angular 22**.
Es la migración de un reto frontend que hice originalmente en React. El diseño es el mismo, píxel a píxel,
pero ahora el formulario funciona de principio a fin.

**Stack:** Angular 22 · TypeScript (strict) · Signals · Componentes standalone · Reactive Forms ·
Zoneless · Lazy loading · SCSS (BEM) · Vitest

## Funcionalidades

- **Proceso de 6 pasos:** especialización → horario y modalidad → tarifa → datos personales →
  dirección → forma de pago → confirmación.
- **Validación de formularios:** campos obligatorios, email, **DNI/NIE con letra de control**,
  móvil español y código postal. Los errores aparecen junto a cada campo.
- **Estado compartido con signals** (`EnrollmentStore`). Se guarda en `sessionStorage`, así que
  recargar la página o volver atrás no borra lo introducido.
- **Guards de navegación:** no se puede saltar a un paso sin completar los anteriores, y la
  página final solo se ve después de enviar.
- **Accesibilidad:** `role="radiogroup"`/`aria-checked` en los botones de opción,
  `aria-current` en el paso activo, foco visible con teclado y envío con Enter.
- **Lazy loading** de cada página y un título de pestaña para cada paso.

## Arquitectura

```
src/app/
├── core/                    Lógica de negocio (sin UI)
│   ├── enrollment.model.ts  Tipos de los datos de cada paso
│   ├── enrollment.data.ts   Opciones (ramas, tarifas...) y configuración de los pasos
│   ├── enrollment.store.ts  Estado global con signals + persistencia
│   ├── step.guard.ts        Guards funcionales (CanActivateFn)
│   └── lower-case-url-serializer.ts
├── shared/
│   ├── steps-sidebar/       Panel lateral (selector de atributo: no añade nodos al DOM)
│   ├── field-error/         Mensaje de error reutilizable para cualquier control
│   └── validators/          Validadores personalizados (DNI/NIE, móvil, CP)
├── pages/                   Una página por paso (standalone, OnPush, lazy)
├── app.routes.ts
└── app.config.ts
src/styles/                  SCSS original (BEM) migrado a @use
```

## Scripts

```bash
npm install
npm start        # http://localhost:4200
npm test         # tests unitarios con Vitest
npm run build    # build de producción en dist/
```

Requiere Node.js 22.22.3 o superior (o Node 24).

## Qué cambió respecto a la versión React

| Antes (React 18, 2022)                         | Ahora (Angular 22)                                    |
| ---------------------------------------------- | ----------------------------------------------------- |
| Solo maquetación: los botones no hacían nada   | Formulario completo con estado y validación           |
| Sidebar copiado en las 6 páginas               | Un único componente `StepsSidebar` configurado por datos |
| Opciones escritas a mano en el HTML            | Datos en `enrollment.data.ts` y renderizado con `@for` |
| `<a>` dentro de `<button>` (HTML no válido)    | Botones semánticos con navegación programática        |
| Se podía entrar a cualquier paso por la URL    | Guards que controlan el orden de los pasos            |
| El texto escrito en los inputs apenas se leía  | Los campos rellenos se ven con contraste suficiente   |
| Sin tests                                      | Tests unitarios del store, guards, validadores y formulario |

## Posibles mejoras

- Guardar las matrículas en Firebase/Firestore (la configuración está en el proyecto original).
- Diseño responsive para móvil. El diseño original es solo para escritorio.
- Pasar los formularios a Signal Forms cuando la API sea estable.
