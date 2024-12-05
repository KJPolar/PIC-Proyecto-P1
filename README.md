# PIC-Proyecto-P1
Sistema de Gestión de Proyectos y Empleados
Descripción del Proyecto
Este proyecto es una aplicación web para gestionar empleados y proyectos, con funcionalidades para listar, crear, actualizar y eliminar registros. Además, permite gestionar la relación muchos a muchos entre empleados y proyectos mediante una tabla intermedia denominada Participaciones, que incluye el rol del empleado en cada proyecto.

El sistema ha sido desarrollado utilizando tecnologías modernas como Custom Elements, Shadow DOM, API REST, slots, y templates reutilizables. Todo el código está implementado con arrow functions, siguiendo las mejores prácticas de programación moderna.

Tecnologías Utilizadas
HTML5 y CSS3
JavaScript con Arrow Functions
Custom Elements y Shadow DOM
API REST para CRUD de entidades
Fetch API para consumo de datos
Diseño responsivo con estilos encapsulados
Funcionalidades
Entidades
Empleados

Atributos: id_empleado, nombre, puesto, salario
Funcionalidades: Listar, crear, actualizar y eliminar empleados.
Proyectos

Atributos: id_proyecto, nombre_proyecto, fecha_inicio, fecha_fin
Funcionalidades: Listar, crear, actualizar y eliminar proyectos.
Participaciones

Atributos: id_empleado, id_proyecto, rol
Funcionalidades: Listar la relación entre empleados y proyectos.
Componentes Personalizados
<nav-bar>
Menú de navegación que permite moverse entre las vistas principales del sistema.

<employee-list>
Lista de empleados con opciones para editar o eliminar registros.

<project-form>
Formulario para crear o actualizar proyectos.

<participation-list>
Lista de participaciones que muestra la relación entre empleados y proyectos.

<footer-bar>
Pie de página con información del desarrollador.

Menú de Navegación
Inicio: Página principal con una descripción del sistema.
Empleados:
Opciones para registrar, listar y eliminar empleados.
Proyectos:
Opciones para registrar, listar y eliminar proyectos.
Participaciones:
Listado de empleados y proyectos con sus roles asociados.
Acerca de: Información sobre el desarrollador.
Estilo y Responsividad
Estilos encapsulados en el Shadow DOM para garantizar una experiencia visual consistente.
Diseño responsivo para garantizar compatibilidad con dispositivos móviles, tabletas y escritorios.
Configuración y Ejecución
Prerrequisitos
Node.js (opcional, si se utiliza un servidor JSON).
Navegador compatible con Web Components (Chrome, Edge, Firefox).

Aquí tienes un ejemplo de cómo estructurar el archivo README.md para este proyecto.

Sistema de Gestión de Proyectos y Empleados
Descripción del Proyecto
Este proyecto es una aplicación web para gestionar empleados y proyectos, con funcionalidades para listar, crear, actualizar y eliminar registros. Además, permite gestionar la relación muchos a muchos entre empleados y proyectos mediante una tabla intermedia denominada Participaciones, que incluye el rol del empleado en cada proyecto.

El sistema ha sido desarrollado utilizando tecnologías modernas como Custom Elements, Shadow DOM, API REST, slots, y templates reutilizables. Todo el código está implementado con arrow functions, siguiendo las mejores prácticas de programación moderna.

Tecnologías Utilizadas
HTML5 y CSS3
JavaScript con Arrow Functions
Custom Elements y Shadow DOM
API REST para CRUD de entidades
Fetch API para consumo de datos
Diseño responsivo con estilos encapsulados
Funcionalidades
Entidades
Empleados

Atributos: id_empleado, nombre, puesto, salario
Funcionalidades: Listar, crear, actualizar y eliminar empleados.
Proyectos

Atributos: id_proyecto, nombre_proyecto, fecha_inicio, fecha_fin
Funcionalidades: Listar, crear, actualizar y eliminar proyectos.
Participaciones

Atributos: id_empleado, id_proyecto, rol
Funcionalidades: Listar la relación entre empleados y proyectos.
Componentes Personalizados
<nav-bar>
Menú de navegación que permite moverse entre las vistas principales del sistema.

<employee-list>
Lista de empleados con opciones para editar o eliminar registros.

<project-form>
Formulario para crear o actualizar proyectos.

<participation-list>
Lista de participaciones que muestra la relación entre empleados y proyectos.

<footer-bar>
Pie de página con información del desarrollador.

Menú de Navegación
Inicio: Página principal con una descripción del sistema.
Empleados:
Opciones para registrar, listar y eliminar empleados.
Proyectos:
Opciones para registrar, listar y eliminar proyectos.
Participaciones:
Listado de empleados y proyectos con sus roles asociados.
Acerca de: Información sobre el desarrollador.
Estilo y Responsividad
Estilos encapsulados en el Shadow DOM para garantizar una experiencia visual consistente.
Diseño responsivo para garantizar compatibilidad con dispositivos móviles, tabletas y escritorios.
Configuración y Ejecución
Prerrequisitos
Node.js (opcional, si se utiliza un servidor JSON).
Navegador compatible con Web Components (Chrome, Edge, Firefox).
Instalación
Clone el repositorio:

bash
Copiar código
git clone https://github.com/usuario/proyecto-gestion-empleados-proyectos.git
cd proyecto-gestion-empleados-proyectos
Configure la API REST:
Si utiliza json-server:

bash
Copiar código
npm install -g json-server  
json-server --watch db.json  
Abra el archivo index.html en su navegador.

Estructura del Proyecto  
├── api-rest/  
│ ├── node_modules/  
│ ├── index.js  
│ └── package.json  
├── sistema/  
│ ├── node_modules/  
│ ├── js/  
│ ├──── archivos.js  
│ └──index.html  
├── README.md  
API REST
Endpoints
Empleados:

GET: /empleados
POST: /empleados
PUT: /empleados/:id
DELETE: /empleados/:id
Proyectos:

GET: /proyectos
POST: /proyectos
PUT: /proyectos/:id
DELETE: /proyectos/:id
Participaciones:

GET: /participaciones
Autor
Ismael Amagua

Estudiante de Ingeniería en Tecnologias De La Informacion.
Contacto: ciamagua@espe.edu.ec
Licencia
Este proyecto está bajo la licencia MIT.
