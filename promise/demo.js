// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(excutor) {
        excutor(this.resolve, this.reject)
    }

    status = PENDING;
    value = null;
    reason = null;

    resolve = (value) => {  
        // 只有在pending下才更改状态 
        if (this.status === PENDING) {
            this.status = FULFILLED;

            this.value = value;
        }
    }

    reject = (reason) => {
         // 只有在pending下才更改状态 
        if (this.status === PENDING) {
            this.status = REJECTED;

            this.reason = reason;
        }
    }

    then(onFulfilled, onRejected) {
        if (this.status === FULFILLED) {
            onFulfilled(this.value)
        } else if (this.status === REJECTED) {
            onRejected(this.reason)
        }
    }

}

let a = new MyPromise((res, rej) => {
    //res('success');
    rej('fail')
})

a.then(value => {
    console.log(value)
}, reason => {
    console.log(reason)
})