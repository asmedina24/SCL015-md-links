const fs = require('fs'); // fs es el módulo del sistema de archivos Node.js le permite trabajar con el sistema de archivos en su computadora.
const colors = require('colors');
// const directoryPath = require('./index')
const {filePath, directoryPath, getLink, options} = require('./index.js');
// const { link } = require('cli-color/beep');

const folder = process.argv[2];  //comienza con 2 porque los dos primeros elementos en la matriz process.argv siempre es['path/to/node.exe', 'path/to/js/file', ...]
const optionsArgv = process.argv[3];
const twoOptionsArgv = process.argv[4];


// const commandLineInterface = (folderParameter) => {
  if (fs.lstatSync(folder).isFile()) {
      console.log(colors.green("Es un archivo"))
      filePath(folder)
      .then(res => {
        getLink(res).then(link => {
          const imprimir = options(link, folder, optionsArgv, twoOptionsArgv );
          console.log(imprimir)
          // options(res, optionsArgv, folder, twoOptionsArgv );
        })
        .catch(err =>{
          console.log(err)
        })
        // options(res, optionsArgv, folder, twoOptionsArgv );
      })
      .catch(err =>{
        console.log(err)
      })
    } else {
      console.log(colors.green("Es una carpeta"))
      directoryPath(folder)
      .then(rest => {
        console.log(rest)
        filePath(rest)
        .then(res => {
          // res.forEach(element => {
          //   getLink(element, rest, optionsArgv, twoOptionsArgv )
          // });
          
          // options(res, optionsArgv, folder, twoOptionsArgv );
        })
        .catch(err =>{
          
        })
        // options(rest, optionsArgv, folder, twoOptionsArgv );
      })
      .catch(err =>{
        
      })
    }
// }
// }

// const options = (optionsParameter, folderParameter, twoOptionsParameter) => {
//   if (folderParameter && !optionsParameter ) {
//     commandLineInterface(folderParameter);
//   } else if (optionsParameter === '--validate' && !twoOptionsParameter) {
//       console.log("entro al --validate");

//   } else if (optionsParameter == '--stats' && !twoOptionsParameter) {
//     console.log("entro al -stats");

//   } else if (optionsParameter == '--stats' && twoOptionsParameter === '--validate' || optionsParameter === '--validate' &&  twoOptionsParameter === '--stats' ) {
//     console.log("entro al --stats --validate");

//   } else {
//     console.log("Error instrucciones");
//   }
//   }

//  options(optionsArgv, folder, twoOptionsArgv );
