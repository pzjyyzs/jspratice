const db = require('./db');
const inquirer = require('inquirer');

module.exports.add = async (title) => {
   const list = await db.read();
   list.push({ title, done: false});
   db.write(list);
}

module.exports.clear = async () => {
    db.write([]);
}

function createTask(list) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '输入任务标题'
    }).then(answer => {
        list.push({
            title: answer.title,
            done: false
        })
        db.write(list)
    })
}

function askForAction(list, index) {
    inquirer.prompt({
        type: 'list', 
        name: 'action',
        message: '请选择操作',
        choices: [
            { name: 'quit', value: 'quit'},
            { name: '已完成', value: 'markAsDone' },
            { name: '未完成', value: 'markAsUnDone' },
            { name: '改标题', value: 'updateTitle' },
            { name: '删除', value: 'remove' },
        ]
    }).then(operator => {
        switch (operator.action) {
            case 'markAsDone':
                list[index].done = true;
                db.write(list);
                break;
            case 'markAsUnDone':
                list[index].done = false;
                db.write(list);
                break;
            case 'updateTitle':
                inquirer.prompt({
                    type: 'input',
                    name: 'title',
                    message: '新的标题',
                    default: list[index].title
                }).then(title => {
                    list[index].title = answer.title;
                    db.write(list)
                })
                break;
            case 'remove':
                list.splice(index, 1)
                db.write(list)
                break;
        }
    })
}

function printTasks(list) {
    inquirer
        .prompt({
            type: 'list',
            name: 'index',
            message: '请选择你想操作的任务',
            choices: [{ name: "退出", value: '-1' }, ...list.map((task, index) => {
                console.log('123', task)
                return { name: `${task.done ? '[x]' : '[_]'} ${index + 1} - ${task.title}`, value: index.toString() }
            }), { name: '+ 创建任务', value: '-2' }]
        }).then(answer => {
            const index = parseInt(answer.index);
            if (index >= 0) {
                askForAction(list, index)
            } else if (index === -2) {
                createTask(list)
            }
        })
}

module.exports.showAll = async () => {
    const list = await db.read();
    list.forEach((task, index) => {
        console.log(`${task.done ? '[x]' : '[_]'} ${index + 1} - ${task.title}`)
    });

    printTasks(list);

}