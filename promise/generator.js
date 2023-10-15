/* function generator(arr) {
    let nextIdx = 0;
    return {
        next: () =>  {
            const result = nextIdx < arr.length - 1  ? { value: arr[nextIdx ++], done: false } : { value: arr[nextIdx ++] || undefined, done: true }
            return result;
        }
    }
} */

const fs = require('fs').promises;

function *getUserClasses (uid) {
    let userDatas = yield fs.readFile('./data/user.json');
    userDatas = JSON.parse(userDatas);
    const userData = userDatas.find(user => user.id === uid);
    let classDatas = yield fs.readFile('./data/class.json');
    classDatas = JSON.parse(classDatas);

    let userClassData = {
        id: userData.id,
        name: userData.name,
        classes: []
    }

    classDatas.map(c => {
        const studentsArr = JSON.parse(c.students);
        studentsArr.map(s => {
            if (s === uid) {
                userClassData.classes.push({
                    id: c.id,
                    name: c.name
                })
            }
        })
    })

    return userClassData
}

function co(iterator) {
    return new Promise((resolve, reject) => {
        function walk(data) {
            const { value, done } = iterator.next(data);
            if (!done) {
                Promise.resolve(value).then(res => {
                    walk(res);
                }, reject)
            } else {
                resolve(value)
            }
        }

        walk()
    })
}
/* const it = getUserClasses(1);
const { value, done } = it.next(); 
value.then(res => {
    console.log(res.toString('utf-8'));
    const { value, done }  = it.next(res);
    console.log(value)
}) */
/* co(getUserClasses(1)).then(res => {
    console.log(res)
}).catch((err) => {
    console.log(err);
}) */

async function getUserClasses(uid) {
    let userDatas = await fs.readFile('./data/user.json');
    userDatas = JSON.parse(userDatas);
    const userData = userDatas.find(user => user.id === uid);
    let classDatas = await fs.readFile('./data/class.json');
    classDatas = JSON.parse(classDatas);

    let userClassData = {
        id: userData.id,
        name: userData.name,
        classes: []
    }

    classDatas.map(c => {
        const studentsArr = JSON.parse(c.students);
        studentsArr.map(s => {
            if (s === uid) {
                userClassData.classes.push({
                    id: c.id,
                    name: c.name
                })
            }
        })
    })

    return userClassData
}

getUserClasses(1).then((res) => {
    console.log(res)
}).catch(error => {
    console.log('error', error)
})
