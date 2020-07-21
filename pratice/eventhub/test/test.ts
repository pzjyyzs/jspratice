import EventHub from '../src/index';

console.log(EventHub)

const eventHub = new EventHub()

let called = false
eventHub.on('xxx', y => {
    called = true
    console.assert(called)
})

eventHub.emit('xxx', 'aaaaa')