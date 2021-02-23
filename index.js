// aca busca los archivos de acuerdo a la extensión 
let fs = require('fs');
let path = require('path');
let directory = process.argv[2];
let ext = process.argv[3];

let extn = '.' + ext;
fs.readdir(directory, (err, data)=>{
    if(err){
       console.log(err);
    } else {
       if(extn === ext){
        let filter = [];
        data.forEach((file)=>{
          
            if(path.extname(file)===extn){

                filter.push(file)
                console.log(filter)
                        
            }
                 
        });
       }
       console.log('probando')
       
      
        
    }
     
});