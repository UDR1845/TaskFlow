# TaskFlow - Gestor de Tareas

Aplicación web desarrollada con Angular y Bootstrap que permite
organizar actividades personales mediante el registro, edición,
eliminación y seguimiento de tareas.

## Tecnologías utilizadas

- Angular
- TypeScript
- Bootstrap 5
- Bootstrap Icons
- SCSS
- LocalStorage

## Funcionalidades

- Registrar nuevas tareas.
- Consultar tareas registradas.
- Editar información de las tareas.
- Eliminar tareas.
- Marcar tareas como completadas.
- Filtrar por estado y prioridad.
- Almacenar información en el navegador.

## Requisitos previos

- Node.js
- npm
- Angular CLI

## Instalación

Clonar el repositorio:

    git clone URL_DEL_REPOSITORIO

Ingresar al proyecto:

    cd TaskFlow

Instalar dependencias:

    npm install

## Ejecución

Iniciar el servidor de desarrollo:

    ng serve

Abrir en el navegador:

    http://localhost:4200/

## Compilación

    ng build

## Almacenamiento

TaskFlow utiliza LocalStorage para conservar las tareas
en el navegador del usuario.

## Estructura general

    src/
      app/
        core/
          models/
          services/
        features/
          tasks/
            components/
            pages/
        shared/

## Despliegue

La aplicación tendrá como destino de publicación
GitHub Pages.

## Autor

Nombre del estudiante: [Tu nombre]

Curso: Ingeniería de Software 2
Universidad Continental
