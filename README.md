# Mindata RIU Challenge

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 18.2.7.

## Servidor de desarrollo

Ejecuta `ng serve` para iniciar un servidor de desarrollo. 
Navega a `http://localhost:4200/`.  

La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.
## Generación de código

Ejecuta `ng generate component component-name` para generar un nuevo componente.  
También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construcción

Ejecuta `ng build` para construir el proyecto.  
Los artefactos de la construcción se almacenarán en el directorio `dist/`.

## Ejecución de pruebas unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

### <u>Resultados:</u>
![Descripción de la imagen](test1.png)
![Descripción de la imagen](test2.png)

[Ver reporte coverage completo](https://marcoscolombo66.github.io/mindatachallenge/coverage/index.html).
## Ejecución de pruebas end-to-end

Ejecuta `ng e2e` para ejecutar las pruebas end-to-end a través de una plataforma de tu elección. Para usar este comando, primero necesitas agregar un paquete que implemente las capacidades de prueba end-to-end.

## <u>Observaciones</u>

### Componentes
Se encuentran en la carpeta 
*src/app/dashboard/pages*

**heroes** muestra el *listado paginado* de heroes.
También permite la *búsqueda* desde el input.

**info-heroe** muestra la información del heroe filtrado por su id.

**popup** sirve para *editar* un determinado heroe filtrado por el id o *agregar* uno nuevo, desde el botón *añadir*.
### Services
Se encuentran en la carpeta 
*src/app/services/*

**hero** es el servicio que contiene las llamadas a las APIs que nos permiten obtener, guardar, modificar y borrar los registros de los *heroes.*

**url-config** es el servicio donde configuramos las URLs.

### Interceptores
Se encuentran en la carpeta 
*src/app/shared/interceptors*
Agregué un interceptor para validar que en el listado de heroes al producirse un **error en la petición http**, se utilice una segunda URL.
La primera URL la dejé con un error para poder probarlo, los mismos se observan en la consola del código, donde se muestran los mensajes.
### Directivas
Se encuentran en la carpeta 
*src/app/directives/*

Al crear o editar en la caja de texto del **nombre** del héroe, siempre se muestra en mayúscula.
