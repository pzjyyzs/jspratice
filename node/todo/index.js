const homedir = require('os').homedir();
const home = process.env.HOME || homedir;
const path = require('path');
const dbPath = path.join(home, '.todo');
const fs = require('fs');

module.exports.add = (title) => {
    fs.readFile(dbPath, { flag: 'a+' }, (error, data) => {
        if (error){ 
            console.log(error)
        } else {
            let list
            try {
                list = JSON.parse(data.toString());
            } catch(error2) {
                list = []
            }
            console.log(list);
            const task = {
                title: title,
                done: false
            }
            list.push(task)
            const string = JSON.stringify(list)
            fs.writeFile(dbPath, string + '\n', (writeError) => {
                if (writeError) {
                    console.log('writeError', writeError)
                }
            })
        }
    })
}