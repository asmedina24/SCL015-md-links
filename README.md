
## Índice

* [1. Definición del Proyecto](#1-Definición-del-Proyecto)
* [2. Instalación](#2-Instalación)
* [3. Uso de la libreria](#3-Uso-de-la-libreria)
* [4. Diagrama de flujo](#4-Diagrama-de-flujo)
* [5. Autor](#5-Autor)


## 1. Definición del Proyecto

Md-links-mj es una libreria que lee y analiza archivos en formato markdown para verificar los links contenidos y reportar su estado (sin conexión, útiles o rotos) y dar algunas estadísticas que se imprimirán en consola como la cantidad de links, el estado de los links y  el total de links únicos.



## 2. Instalación

* Instalar previamente npm y Node.js en tu computador.

* Para instalar la librería ejecuta el siguiente comando en la terminal:

```js
$ npm i md-links-mj
```
## 3. Uso de la libreria

 En el archivo JS:

```js
const mdlinks = require('md-links-mj');   
```

En la terminal:
 ```
md-links <path-to-file> [options]   
```


### Opciones:

**Leer archivos con extensión .md**

 ```
md-links <path-to-file.md>   
```
![opcion file](https://i.imgur.com/nAyfkyT.png)

En este caso se obtiene como resultado:
- Nombre: Archivo o ruta donde fue encontrado el link.
- Titulo: Descripción del link.
- Enlace: Link encontrado.


**--validate**

Entrega la validacion o status de los links (status: 200, 404, 500 etc).

 ```
md-links <path-to-file.md> --validate  
```
![opcion validate](https://i.imgur.com/Ga5GRwT.png)


**--stats**

Entrega las siguientes estadística: `Total` el total de links encontrados; `Unique` el total de links unicos.

 ```
md-links <path-to-file.md> --stats  
```

![opcion stats](https://i.imgur.com/EqeaUJ3.png)


**--stats --validate**

Las dos opiciones combinadas, además de Total y Unique, agregan la siguiente estadística: `Broken` el total de links rotos;

`md-links <path-to-file.md> --stats --validate || md-links <path-to-file.md> --validate --stats`

![opcion stats and validate](https://i.imgur.com/rTjYBp4.png)


## 4. Diagrama de Flujo
![opcion validate and stats](https://i.imgur.com/t4zfZLl.jpg)

## 5. Autor
* [Alejandra Medina](https://github.com/asmedina24) 
* [Caroline Jeldres](https://github.com/Caroline-Jeldres) 