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

    // 存储成功回调函数
    onFulfilledCallback = null;
    // 存储失败回调函数
    onRejectedCallback = null;


    resolve = (value) => {  
        // 只有在pending下才更改状态 
        if (this.status === PENDING) {
            this.status = FULFILLED;

            this.value = value;

            this.onFulfilledCallback && this.onFulfilledCallback(value);
        }
    }

    reject = (reason) => {
         // 只有在pending下才更改状态 
        if (this.status === PENDING) {
            this.status = REJECTED;

            this.reason = reason;

            this.onRejectedCallback && this.onRejectedCallback(reason);
        }
    }

    then(onFulfilled, onRejected) {
        if (this.status === FULFILLED) {
            onFulfilled(this.value)
        } else if (this.status === REJECTED) {
            onRejected(this.reason)
        } else if (this.status === PENDING) {
            this.onFulfilledCallback = onFulfilled;
            this.onRejectedCallback = onRejected;
        }
    }

}

let a = new MyPromise((res, rej) => {
    setTimeout(() => {
        res('success');
    }, 300)
   /*  rej('fail') */
})

a.then(value => {
    console.log(value)
}, reason => {
    console.log(reason)
})