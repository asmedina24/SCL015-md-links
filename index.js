// aca busca los archivos de acuerdo a la extensión 
let fs = require('fs'); // Modulo de sistema de archivos
let path = require('path'); // coloca la ruta a absoluta, busca la ruta rela o abso
const folder = process.argv[2]; // argumento que busca la posicion
const allowedExt = /(.md|.mdtxt|.mdwn|.mkd|.mdown|.markdown|.mdtxt|.text|.Rmd)$/i; // Extensiones permitidas

// const marked = require('marked');
// let findMd = require('./funtion.js');

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
                    readAr(probando)
                    
                })
            }
        }
    });
}
directory(folder);

// leyendo las lineas del archivos 
const readAr = (leerArchivo) => {
    fs.readFile(leerArchivo, 'utf-8', (error, data) => {
        if (error) {
            console.error(error);
            return;
        }
        const lines = data.split('\n').length - 1; //
        console.log('Este documento tiene:', lines, 'lineas');
        
        
        // console.log(data);

    })


}
