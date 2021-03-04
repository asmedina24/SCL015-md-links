const fs = require('fs'); // fs es el módulo del sistema de archivos Node.js le permite trabajar con el sistema de archivos en su computadora.
const path = require('path'); //El path módulo proporciona utilidades para trabajar con rutas de archivos y directorios. 
const http = require('http');
const clc = require('cli-color');
const markdownIt = require('markdown-it')();
const  jsdom  =  require ( "jsdom" ) ; 
const  {  JSDOM  }  =  jsdom ;
const fetchUrl = require("fetch").fetchUrl;
const resolve = require('path').resolve;
const { rejects } = require('assert');
// resolve('../../bb/tmp.txt')
let allLinks = []
let onlyLink = []
let detailsLinks = {};
let brokenLiks = [];

const redColor = clc.red.bold;
const greenColor = clc.green.italic;
const blueColor = clc.blue;
const magentaColor = clc.magenta;
const cyanColor = clc.cyan;

const allowedExtensions = /(.md|.markdown|.mdown|.mkdn|.mkd|.mdwn|.mdtxt|.text|.Rmd )$/i;  // Extenciones permitidas  Porque sucede esto??

const filePath = (fileRoute) =>{
  // return new Promise((resolve, reject) => {
  fs.readFile(fileRoute, { encoding: 'utf8' }, (err, data) => { // fs.readFile()método se utiliza para leer archivos en su computadora. Este devuleve un objeto Buffer (secuencia de bytes de longitud fija)
  // Si no hay errores, 'data' será un objeto Buffer de Node.js. Al igual que pasa con readFileSync(), puedes pasar 'utf8' como segundo parámetro y
  // luego el callback como tercero de modo de que data sea un String y no un Buffer.
    if (data) {
      const str = data.toString();
      getLink(str, fileRoute)
      
        // linkStatus(allLinks.href)
        // .then((res) => {
        //   console.log(res)
        // //  res.forEach((link) =>{
        // //    console.log(link)
        // //  })
        // })
        // .catch(err =>{
        //   console.log(err);
        // })
      if(allLinks.length > 1) {
        allLinks.forEach((link) => {
        // console.log(cyanColor(link.file), greenColor(link.href), blueColor(link.text));
        linkStatus(link.href)
        .then((res) => {
          console.log(res)
        //  res.forEach((link) =>{
        //    console.log(link)
        //  })
        })
        .catch(err =>{
          console.log(err);
        })
        })
      }
      else{
        console.log(redColor('No se encontaron documentos con links'));
      }
    } else {
      console.log(redColor('Error: Ruta Invalida'));
      console.log(err.message);
    }
  });
// }) 
}

// Funcion que obtiene el link, el texto y el archivo 
const getLink = (fileMd, pathParameter) => {
  tokens = markdownIt.render(fileMd); // convierte el archivo .md a html
  const domContent = new JSDOM(tokens); // 
  const links = Array.from(domContent.window.document.querySelectorAll('a'));
  allLinks = [];
  links.forEach((link) => { 
    if(link.href.includes("http")){
      detailsLinks = {
        href: link.href,
        text: link.text,
        file: pathParameter,
      }
      // onlyLink.push(link.href)
      allLinks.push(detailsLinks)
    }
  })
}



const linkStatus = (link) => {
  return new Promise((resolve, rejects) => {
    // link.forEach((element) => {
     fetchUrl(link, (error, meta) => {
       if(meta){
        // brokenLiks.push(element.href)
        resolve({ link: link, estatus: meta.status});
        //  brokenLiks.push(element.href)
        //  console.log('______________________________________')
        //  console.log(element.href, element.file, meta.status, element.text, redColor('Fail'))
       } else {
        rejects(error)
       }
    })

  // })
 })
}




  // linkStatus(allLinks)
  //   .then(res =>{
  //     console.log(res)
  //   })
  //   .catch(err =>{
  //     console.log(err);
  //   })



// const linkStatus = (link) => {
//  link.forEach(element =>{
//   fetchUrl(element.href, (error, meta, body) => {
//     if(meta.status >= 400) {
//       // detailsLinks = {
//       //   href: link.href,
//       //   text: link.text,
//       //   file: pathParameter,
//       // }
//       brokenLiks.push(element.href)
//       // console.log(55, element.href)
//       // console.log('______________________________________')
//       // console.log(element.href, element.file, meta.status, element.text, redColor('Fail'))
//     } else {
//       console.log('______________________________________')
//       console.log(element.href, element.file, meta.status, element.text, 'Ok')
//     }
//   })
//   console.log(333, brokenLiks)
//  })
// }


const directoryPath = (pachParameter) => {
  fs.readdir(pachParameter, (err, data) => {
    if(err){
      console.log(clc.red('Directorio no encontrado'));
      console.log(err.me)
    } else {
      filter =[]
      data.forEach(file => {
        if(allowedExtensions.exec(path.extname(file))){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
          //path.extname () devuelve la extensión del path, desde la última aparición del carácter .(punto)  (ejemplo .js , .txt)
          filter.push(file)
        }
      });
      if(filter.length === 0 ) { // Object.entries devuelve una lista con las claves y valores del objeto. En caso el objeto sea vacío va a devolver un array vacío.
        console.log(redColor('No se econtraron archivos con extension Markdown'));
      } else {
        filter.forEach(fileMarkdown=> {
          const absolutePath = `${pachParameter}\\${fileMarkdown}`;
          filePath(absolutePath)
          })
      }
    }
  });
} 






module.exports = {
  directoryPath,
  filePath
}
