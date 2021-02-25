let fs = require('fs');
let path = require('path');
let directive = process.argv[2];
let extensiones = /(.md|.markdown|.mdown|.mkdn|.mkd|.mdwn|.mdtext|.text|.Rmd)$/i;

const pathFile = (file) =>{
  fs.readFile(file, {encoding: 'utf8'}, (err, data)=> {
      if(data){
         let str = data.toString();
         console.log(str);
      }else{
         console.error(err); 
      }
  });
};
const pathDirectory = (file) =>{
   fs.readdir(file, (err, data)=>{
       if(err){
           console.log(err);
       }else{
           filter = [];
           data.forEach(file => {
               if(extensiones.exec(path.extname(file))){
                   filter.push(file);
               }
           });
           if(Object.entries(filter).length === 0){
               console.log('no se encuentran archivos con extensión md');
           }else{
               filter.forEach(fileMd =>{
                   let absolute = `${directive}\\${fileMd}`;
                      pathFile(absolute); 
                });
           }
       }
   });
};

if(fs.readFile(directive) === true){
    console.log('es un archivo');
    pathFile(directive);
}else{
    console.log('es un directorio');
    pathDirectory(directive);
}
