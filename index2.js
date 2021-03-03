// aca busca los archivos de acuerdo a la extensión 
let fs = require('fs'); // Modulo de sistema de archivos
let path = require('path'); // coloca la ruta a absoluta, busca la ruta rela o abso
const folder = process.argv[2]; // argumento que busca la posicion
const allowedExt = /(.md|.mdtxt|.mdwn|.mkd|.mdown|.markdown|.mdtxt|.text|.Rmd)$/i; // Extensiones permitidas
const absolutePath = path.normalize(path.resolve(folder)); // normalize() arregla la ruta. resolve()la hace absoluta
const marked = require('marked');
const readFile = require('./funtion');

//  LEE el archivo
const directory = (ejemplo) => {
    fs.readdir(ejemplo, (err, data) => {
        if (err) {
            console.log('Directorio no encontrado');
            console.log(err)
        } else {
            filter = [];
            data.forEach(file => {
                if (allowedExt.exec(path.extname(file))) { // Metodo exec() ejecuta busqueda sobre coincidencias, devuelve resultado como array o null 
                    filter.push(file);  //path.extname devuelde del punto en adelante de la extension
                }
            });
            console.log(filter)
            if (filter.length === 0) { // Object.entries verifica si esta array vacio
                console.log('Nose se encontraron archivos con extension md');
            } else {
                filter.forEach(fileMarkdown => {
                    const probando = `${ejemplo}\\${fileMarkdown}`;
                    console.log('Archivo el cual esta leyendo', probando)
                    // readFile(probando)
                })
            }
        }
    });
}
// directory(folder);

// leyendo las lineas del archivos 
// const readAr = (leerArchivo) => {
//     let content = new Promise((resolve, reject) => {
//         fs.readFile(leerArchivo, 'utf-8', (error, data) => {
//             if (error) {
//                 reject(err);
//             }
//             resolve(data);
//             // const lines = data.split('\n').length - 1; // 
//             // console.log('Este documento tiene:', lines, 'lineas');
//             // console.log(data);
//             //     })
//             // }
//         });
//     })
//     return content
// }



const getLinks = () => {
    // let printLinks = new Promise((resolve, reject) => {
    // const renderer = new marked.Renderer();
    // console.log('esta es la constante rendere', renderer);
    readFile.readFile(absolutePath)
         .then(datos => {
            // console.log(datos)
            let renderer = new marked.Renderer();//nos trae los links sin informacion relevante y con etiqueta privada
            let links = [];
            renderer.link = function (href, title, text) {
                links.push({// esto se pusheara al arreglo de links
                    href: href,
                    text: text,
                    file: absolutePath,
                });
            };
            // console.log(links)
            // marked(datos, {
            //     renderer: renderer // objeto tipo texto (token) - a travez de marked nos manda la info de forma liviana y sin informacion relevante
            // });
            }).catch(err => {
            (console.log(err));
        })
    // });
}
// getLinks()


//Verificar si un archivo o una carpeta existen
if (fs.lstatSync(folder).isFile()) {
    console.log('Esto es un archivo')
    getLinks();
   
}  else {
    console.log('Esto es un directorio')
   directory(folder); // ocurrió algún error
}

