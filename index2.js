const fs = require('fs'); // fs es el módulo del sistema de archivos Node.js le permite trabajar con el sistema de archivos en su computadora.
const path = require('path'); //El path módulo proporciona utilidades para trabajar con rutas de archivos y directorios. 
const http = require('http');
const colors = require('colors');
const markdownIt = require('markdown-it')();
const  jsdom  =  require ( "jsdom" ) ; 
const  {  JSDOM  }  =  jsdom ;
const fetchUrl = require("fetch").fetchUrl;
const resolve = require('path').resolve;
const { rejects } = require('assert');
const { Console } = require('console');
// resolve('../../bb/tmp.txt')
let allLinks = []
let onlyLink = []
let detailsLinks = {};
let brokenLiks = [];
let okLinks = [];
let linksFail = {};
let linksOk = {};

const allowedExtensions = /(.md|.markdown|.mdown|.mkdn|.mkd|.mdwn|.mdtxt|.text|.Rmd )$/i;  // Extenciones permitidas  Porque sucede esto??

// const filePath = (fileRoute) =>{
//   // return new Promise((resolve, reject) => {
//   fs.readFile(fileRoute, { encoding: 'utf8' }, (err, data) => { // fs.readFile()método se utiliza para leer archivos en su computadora. Este devuleve un objeto Buffer (secuencia de bytes de longitud fija)
//   // Si no hay errores, 'data' será un objeto Buffer de Node.js. Al igual que pasa con readFileSync(), puedes pasar 'utf8' como segundo parámetro y
//   // luego el callback como tercero de modo de que data sea un String y no un Buffer.
//     if (data) {
//       const str = data.toString();
//       getLink(str, fileRoute)
//       if(allLinks.length > 1) {
//         allLinks.forEach((link) => {
//         // console.log(cyanColor(link.file), greenColor(link.href), blueColor(link.text));
//         linkStatus(link.href)
//         .then((res) => {
//           console.log(res, greenColor(link.href), blueColor(link.text))
//         })
//         .catch(err =>{
//           console.log(err);
//         })
//         })
//       }
//       else{
//         console.log(redColor('No se encontaron documentos con links'));
//       }
//     } else {
//       console.log(redColor('Error: Ruta Invalida'));
//       console.log(err.message);
//     }
//   });
// // }) 
// }
const filePath = (fileRoute) =>{
  return new Promise((resolve, reject) => {
  fs.readFile(fileRoute, { encoding: 'utf8' }, (err, data) => { // fs.readFile()método se utiliza para leer archivos en su computadora. Este devuleve un objeto Buffer (secuencia de bytes de longitud fija)
  // Si no hay errores, 'data' será un objeto Buffer de Node.js. Al igual que pasa con readFileSync(), puedes pasar 'utf8' como segundo parámetro y
  // luego el callback como tercero de modo de que data sea un String y no un Buffer.
    if (data) {
        const expReg = /https?:\/\/(?!.*:\/\/)\S+(?=\))/g;
        let str = data.match(expReg);
      // getLink(str, fileRoute)
      resolve(str)
      console.log(str)
      str.forEach(element => {
        getLink(element, fileRoute)
      })
    } else {
      reject(console.log(colors.red('Error: Ruta Invalida')))
    }
  });
})
}






// Funcion que obtiene el link, el texto y el archivo 
const getLink = (fileMd, pathParameter, optionsParameter, twoOptionsParameter) => {
    
        tokens = markdownIt.render(fileMd); // convierte el archivo .md a html
        const domContent = new JSDOM(tokens); // 
        const links = Array.from(domContent.window.document.querySelectorAll('a'));
        allLinks = [];
        for (let index = 0; index < fileMd.length; index++) {
            const element = fileMd[index];
            console.log(fileMd)
            
        }
        // links.forEach((link) => { 
            
        //  const cada = link
        // //  options(cada, pathParameter, optionsParameter, twoOptionsParameter)
        // })
       
 

}
const options = (link, pathParameter, optionsParameter, twoOptionsParameter) =>{
    if(link.href.includes("http")){
        if (pathParameter && !optionsParameter ) {
            detailsLinks = {
                href: link.href,
                text: link.text,
                file: pathParameter,
              }
              // onlyLink.push(link.href)
              allLinks.push(detailsLinks);
              console.log(allLinks);

          } else if (optionsParameter === '--validate' && !twoOptionsParameter) {
              console.log("entro al --validate");
              linkStatus(link, pathParameter)
              

              
          } else if (optionsParameter == '--stats' && !twoOptionsParameter) {
            console.log("entro al -stats");
        
          } else if (optionsParameter == '--stats' && twoOptionsParameter === '--validate' || optionsParameter === '--validate' &&  twoOptionsParameter === '--stats' ) {
            console.log("entro al --stats --validate");
        
          } else {
            console.log("Error instrucciones");
          }

      
    }
}


const linkStatus = (link, pathParameter) => {
    
        fetchUrl(link.href, (error, meta, body) => {
   
            if(meta.status >=400){
             linksFail = {
                 href: link.href,
                 text: link.text,
                 file: pathParameter,
                 status: meta.status,
                 validate: 'fail'
               }
               brokenLiks.push(linksFail)
               console.log(brokenLiks)
               return brokenLiks
              
             // brokenLiks.push(element.href)
             
            } else if (meta.status < 400) {
             linksOk = {
                 href: link.href,
                 text: link.text,
                 file: pathParameter,
                 status: meta.status,
                 validate: "ok"
               }
               okLinks.push(linksOk)
               console.log(okLinks)
               return okLinks
               
            }
           
          
         })
   
    
    
    // return allLinks
  // })
 
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
  return new Promise((resolve, reject) => {
  fs.readdir(pachParameter, (err, data) => {
    if(err){
      reject(console.log(colors.red('Directorio no encontrado')));
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
        console.log(colors.red('No se econtraron archivos con extension Markdown'));
      } else {
        filter.forEach(fileMarkdown=> {
          const absolutePath = `${pachParameter}\\${fileMarkdown}`;
          resolve(absolutePath)
          // resolve(filePath(absolutePath)
          // .then(res => {
          //   console.log(res);
          // })
          // .catch(err =>{
          //   console.log(err)
          // }))
          })
      }
    }
  });
})
} 






module.exports = {
  directoryPath,
  filePath,
  getLink,
  options,
}
