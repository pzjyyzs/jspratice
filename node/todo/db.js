const homedir = require('os').homedir();
const home = process.env.HOME || homedir;
const path = require('path');
const dbPath = path.join(home, '.todo');
const fs = require('fs');

const db = {
    read(path = dbPath){
        return new Promise((reslove, reject) => {
            fs.readFile(path, { flag: 'a+' }, (error, data) => {
                if (error){ 
                    console.log(error)
                    return reject(error)
                } 
                let list
                try {
                    list = JSON.parse(data.toString());
                } catch(error2) {
                    list = []
                }
                reslove(list);
                
            })
        })
       
    },
    write(list, path = dbPath){
        return new Promise((reslove, reject) => {
            const string = JSON.stringify(list);
        fs.writeFile(path, string + '\n', (error) => {
            if (error) {
                reject(error);
                return;
            } else {
                reslove();
            }
        })
        })
        
    }
}

module.exports = db;