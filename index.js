// aca busca los archivos de acuerdo a la extensión 
let fs = require('fs'); // Modulo de sistema de archivos
let path = require('path'); // coloca la ruta a absoluta, busca la ruta rela o abso
const folder = process.argv[2]; // argumento que busca la posicion
const allowedExt = /(.md|.mdtxt|.mdwn|.mkd|.mdown|.markdown|.mdtxt|.text|.Rmd)$/i; // Extensiones permitidas
const absolutePath = path.normalize(path.resolve(folder)); // normalize() arregla la ruta. resolve()la hace absoluta
const markdownIt = require('markdown-it')();
const readFile = require('./funtion');
const json = require('jsdom');
const { JSDOM } = json;
const colors = require('colors');
const fetchUrl = require("fetch").fetchUrl;// manipula los http peticiones y respuestas 400 y 200, 

let allLink = []; 
let detailEnlace = {};

// Leer el directorio y filtrar archivos que cumplan con extension md
const directory = (route) => {
    fs.readdir(route, (error, data)  =>{
        if(error){
            console.log(error.code, 'No es un directorio')
        } else {
            filter = [];
            data.forEach(archive => {
                if(allowedExt.exec(path.extname(archive))){ 
                    filter.push(archive)
                } 
            });
            if(filter.lenght === 0){
                console.log('No se encontraton archivos .md')
            } else {
                filter.forEach(archiveMd =>{
                    const absoluteRoute = `${route}\\${archiveMd}`;
                    console.log('Archivo el cual esta leyendo', absoluteRoute)
                });
            }
        }
    });
} 
// leer el archivo con extension md
const file= (fileRoute)=> {
    fs.readFile(fileRoute, {encoding: 'utf-8'}, (error, data) => { // lea el archivo
        if(data){
            const dataString = data.toString(); //convierta la data en string
            getLink(dataString, fileRoute);
            stateLinks(allLink, 200);
            // console.log(dataString)  // la data y el archivo que leyo}
            if(allLink.length > 1 ){
                allLink.forEach(link => {
                    console.log( colors.green(link.text), colors.blue(link.href))
                  
                })
            } else {
                console.log('No se encontraron documentos con Links')
            }
        } else{
            console.log(error.code, 'Esta ruta es inválida.')

        }

    }) 
}

// Obtener los link
const getLink = (param1 , param2) => {
    let renderer =  markdownIt.render(param1);//nos trae los links sin informacion relevante y con etiqueta privada
    const content = new JSDOM(renderer); 
    const liks = Array.from(content.window.document.querySelectorAll('a')); // crea un array con todas las a
    allLink = [];
    liks.forEach(enlace =>{
        if(enlace.href.includes('http')) {
            detailEnlace =  { 
                href: enlace.href,
                text: enlace.text,
                file: param2,
            }
            allLink.push(detailEnlace);
         
        }
    })
}

//Funcion para filtar los estados del link

const stateLinks = (link, num) =>{
    console.log('jksdfdkfd')
     link.forEach(elemento => {
       fetchUrl(elemento.href, (error, meta, body) =>{
            // console.log(444, body.toString());
            console.log(555, meta.status);
            if(meta.status === 200) {
                console.log('_________________________________________')
                console.log(('File: '+ elemento.file + '\n'), colors.blue('Titulo: ' + elemento.text + '\n'), colors.yellow('href: ' + elemento.href + '\n'),  colors.green('Estado: ' + meta.status));
            } else {
                console.log('________enlace roto__________')
                console.log(('File: '+ elemento.file + '\n'), colors.blue('Titulo: ' + elemento.text + '\n'), colors.yellow('href: ' + elemento.href + '\n'),  colors.green('Estado: ' + meta.status));
            }
            
        }) 
    })
}



// si es un archivo o un directorio 
if (fs.lstatSync(folder).isFile()) {
    console.log('Esto es un archivo')
    file(folder);
   
}  else {
    console.log('Esto es un directorio')
   directory(folder); 
}


