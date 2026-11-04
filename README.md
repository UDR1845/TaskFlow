# TaskFlow – Gestor de Tareas

**TaskFlow** es una aplicación web desarrollada con Angular que permite organizar actividades personales mediante la creación, consulta, edición y eliminación de tareas.

El proyecto forma parte del Producto Académico N.º 1 de Ingeniería de Software II.

## Objetivo

Desarrollar una aplicación web sencilla e intuitiva que facilite la organización y el seguimiento de tareas personales.

## Funcionalidades

- Registrar tareas con título, descripción y prioridad.
- Visualizar las tareas registradas.
- Editar información de las tareas.
- Eliminar tareas.
- Marcar tareas como pendientes o completadas.
- Filtrar tareas por estado y prioridad.
- Guardar información en LocalStorage para conservarla al recargar la página.

## Tecnologías utilizadas

- Angular 21.1.0
- TypeScript
- HTML5 y SCSS
- Bootstrap 5
- Bootstrap Icons
- LocalStorage
- Git y GitHub
- GitHub Actions
- GitHub Pages

## Requisitos

- Node.js compatible con Angular CLI.
- npm.
- Angular CLI 21.1.0.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/UDR1845/TaskFlow.git
cd TaskFlow
```

Instalar dependencias:

```bash
npm install
```

## Ejecución local

```bash
ng serve
```

Abrir en el navegador:

`http://localhost:4200/`

## Compilación

```bash
npm run build
```

Los archivos compilados se generan en el directorio `dist/`.

## Persistencia

La aplicación utiliza LocalStorage del navegador. No requiere un servidor ni una base de datos externa.

## Integración continua

GitHub Actions ejecuta automáticamente la instalación de dependencias y la compilación de Angular ante cambios en las ramas `develop` y `main`, así como en los Pull Requests dirigidos a ellas.

## Estructura principal

```text
src/
└── app/
    ├── core/
    │   ├── models/
    │   └── services/
    ├── features/
    │   └── tasks/
    │       ├── components/
    │       └── pages/
    └── shared/

.github/
└── workflows/
    └── ci.yml

docs/
```


**Repositorio:** https://github.com/UDR1845/TaskFlow
