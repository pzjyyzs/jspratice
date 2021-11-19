class MyPromise {
    constructor(excutor) {
        console.log(excutor)
        excutor(this.resolve, this.reject)
    }

    resolve = () => {  console.log(this) }
    reject = () => {}
   /*  resolve() {
        console.log(this)
    }
    reject() {

    } */
}

let a = new MyPromise((a, b) => {
    a()
})