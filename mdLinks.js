const fs = require('fs'); // fs es el módulo del sistema de archivos Node.js le permite trabajar con el sistema de archivos en su computadora.
const colors = require('colors');
// const directoryPath = require('./index')
// const { fetchUrl } = require('fetch');
const {filePath, directoryPath, opcionFile, opcionValidate, opcionStats, opcionStatsValidate, unico} = require('./index.js');

const folder = process.argv[2];  //comienza con 2 porque los dos primeros elementos en la matriz process.argv siempre es['path/to/node.exe', 'path/to/js/file', ...]
const optionsArgv = process.argv[3];
const twoOptionsArgv = process.argv[4];





const options = (folderParameter, optionsParameter, twoOptionsParameter) => {
  if (folderParameter && !optionsParameter ) {
    opcionFile(folderParameter)
  } else if (optionsParameter === '--validate' && !twoOptionsParameter) {
      opcionValidate(folderParameter)

  } else if (optionsParameter == '--stats' && !twoOptionsParameter) {
    unico(folderParameter)
    opcionStats(folderParameter)

  } else if (optionsParameter == '--stats' && twoOptionsParameter === '--validate' || optionsParameter === '--validate' &&  twoOptionsParameter === '--stats' ) {
    unico(folderParameter)
    opcionStatsValidate(folderParameter)
    

  } else {
    console.log(colors.red("Error instrucciones"));
  }
}



// const commandLineInterface = (folderParameter) => {
  if (fs.lstatSync(folder).isFile()) {
      console.log(colors.green("Es un archivo"))
        options(folder, optionsArgv, twoOptionsArgv );
    } else {
      console.log(colors.green("Es una carpeta"))
      directoryPath(folder)
      .then(rest => {
        options(rest, optionsArgv, twoOptionsArgv );
        // options(rest, optionsArgv, folder, twoOptionsArgv );
      })
      .catch(err =>{
        console.log(err)
      })
    }
// }
// }

