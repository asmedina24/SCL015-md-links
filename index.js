const fs = require('fs'); // fs es el módulo del sistema de archivos Node.js le permite trabajar con el sistema de archivos en su computadora.
const path = require('path'); //El path módulo proporciona utilidades para trabajar con rutas de archivos y directorios. 
const http = require('http');
const colors = require('colors');
const markdownIt = require('markdown-it')();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetchUrl = require('fetch').fetchUrl;
const resolve = require('path').resolve;
 const { rejects } = require('assert');
const { Console } = require('console');
// resolve('../../bb/tmp.txt')

let allLinks = []
let detailsLinks = {};


const allowedExtensions = /(.md|.markdown|.mdown|.mkdn|.mkd|.mdwn|.mdtxt|.text|.Rmd )$/i;  // Extenciones permitidas  Porque sucede esto??


const filePath = (fileRoute) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileRoute, { encoding: 'utf8' }, (err, data) => { // fs.readFile()método se utiliza para leer archivos en su computadora. Este devuleve un objeto Buffer (secuencia de bytes de longitud fija)
      if (data) {
        const str = data.toString();
        resolve(getLink(str, fileRoute))
      } else {
        reject(console.log(colors.red('Error: Ruta Invalida')))
      }
    });
  })
}

// Funcion que obtiene el link, el texto y el archivo 
const getLink = (fileMd, pathParameter) => {
  tokens = markdownIt.render(fileMd); // convierte el archivo .md a html
  const domContent = new JSDOM(tokens); // 
  const links = Array.from(domContent.window.document.querySelectorAll('a'));
  allLinks = [];
   links.forEach((link) => {
         if (link.href.includes("http")) {
      detailsLinks = {
        href: link.href,
        text: link.text,
        file: pathParameter,
      }
      allLinks.push(detailsLinks)
    }
  })
  return allLinks  
}


const opcionFile = (folder) => {
  filePath(folder)
    .then(res => {
      res.map(element => {
        console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ')
        console.log(colors.cyan('\n'+ ' Nombre: '+ element.file+ '\n'), colors.yellow('Titulo: '+element.text+ '\n'), colors.green('Enlace: '+ element.href));
      })
    })
    .catch(err => {
      console.log(err)
    })
}


const opcionValidate = (folder) => {
  filePath(folder)
    .then(res => {
      res.forEach((link) => {
        linkStatus(link.href)
          .then(response => {
            if (response >= 400) {
              console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ')
              console.log(colors.cyan('\n'+ ' Nombre: '+ link.file + '\n'), colors.yellow('Titulo: ' + link.text+ '\n'), colors.blue('Enlace: '+ link.href+ '\n'), colors.red('Estatus: '+ response+ '\n'), colors.red('Estado: Fallido'))
            } else {
              console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ')
              console.log(colors.cyan('\n'+ ' Nombre: '+ link.file + '\n'), colors.yellow('Titulo: ' + link.text+ '\n'), colors.blue('Enlace: '+ link.href+ '\n'), colors.green('Estatus: '+ response+ '\n'), colors.green('Estado: OK'))
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
    .catch(err => {
      console.log(err)
    })
}


const opcionStats = (folder) => {
  filePath(folder)
    .then(res => {
      console.log(colors.cyan('TOTAL:', res.length))
    })
    .catch(err => {
      console.log(err)
    })
}


const opcionStatsValidate = (folder) => {
  filePath(folder)
    .then(res => {
      const broken = [];
      res.forEach((link) => {
        broken.push(linkStatus(link.href));
      })
      Promise.all(broken)
        .then(response => {
          const result = response.filter(status => {
            if (status >= 400) {
              return status;
            }
          })
          console.log(colors.cyan('Total:', res.length))
          console.log(colors.red('Rotos:', result.length))
          
        })
    })
    .catch(err => {
      console.log(err)
    })
}



// Funcion que obtiene el estatus del Link
const linkStatus = (link) => {
  return new Promise((resolve, rejects) => {
    fetchUrl(link, (error, meta) => {
      if (meta) {
        resolve(meta.status);
      } else {
        rejects(error)
      }
    })
  })
}



const unico = (folder) => {
  const unique = [];
  filePath(folder)
    .then(res => {
      res.map((link) => {
        unique.push(link.href)
      })
      const mySet = new Set(unique);
      console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ')
      console.log(colors.green('\n'+ "Unico:", mySet.size))
    })
    .catch(err => {
      console.log(err)
    })
}




const directoryPath = (pachParameter) => {
  return new Promise((resolve, reject) => {
    fs.readdir(pachParameter, (err, data) => {
      if (err) {
        reject(console.log(colors.red('Directorio no encontrado')));
        console.log(err.me)
      } else {
        filter = []
        data.forEach(file => {
          if (allowedExtensions.exec(path.extname(file))) { //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            //path.extname () devuelve la extensión del path, desde la última aparición del carácter .(punto)  (ejemplo .js , .txt)
            filter.push(file)
          }
        });
        if (filter.length === 0) { // Object.entries devuelve una lista con las claves y valores del objeto. En caso el objeto sea vacío va a devolver un array vacío.
          console.log(colors.red('No se econtraron archivos con extension Markdown'));
        } else {
          filter.forEach(fileMarkdown => {
            const absolutePath = `${pachParameter}\\${fileMarkdown}`;
           resolve(absolutePath)
            
          })
        }
      }
    });
  })
}


module.exports = {
  directoryPath,
  filePath,
  opcionFile,
  opcionValidate,
  opcionStats,
  opcionStatsValidate,
  unico
}
