import bind from '../src/index'

Function.prototype['bind2'] = bind;
console.assert((Function.prototype as any).bind2 !== undefined)
const fn1 = function() {
    console.log()
    console.log(1, this)
    return this;
}
const newFn1 = fn1['bind2']({name:'test'})
console.assert((newFn1() as any).name === 'test')


const fn2 = function(p1, p2) {
    return [this, p1,p2]
}

const newFn2 = fn2['bind2']({ name: 'test'}, 124, 456);
console.assert(newFn2()[0].name === 'test')
console.assert(newFn2()[1] === 124)
console.assert(newFn2()[2] === 456)


const anotherFn2 = fn2['bind2']({ name: 'test'}, 123)
console.assert(anotherFn2(245)[0].name === 'test')
console.assert(anotherFn2(245)[1] === 123)
console.assert(anotherFn2(245)[2] === 245)