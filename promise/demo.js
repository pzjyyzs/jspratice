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
    // onFulfilledCallback = null;
    onFulfilledCallback = [];
    // 存储失败回调函数
    // onRejectedCallback = null;
    onRejectedCallback = [];


    resolve = (value) => {  
        // 只有在pending下才更改状态 
        if (this.status === PENDING) {
            this.status = FULFILLED;

            this.value = value;

            while (this.onFulfilledCallback.length) {
                // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
                this.onFulfilledCallback.shift()(value);
            }
        }
    }

    reject = (reason) => {
         // 只有在pending下才更改状态 
        if (this.status === PENDING) {
            this.status = REJECTED;

            this.reason = reason;

            while (this.onRejectedCallback.length) {
                this.onRejectedCallback.shift()(reason);
            }
        }
    }

    then(onFulfilled, onRejected) {

        const promise2 = new MyPromise((reslove, reject) => {
            if (this.status === FULFILLED) {

                queueMicrotask(() => {
                    const x = onFulfilled(this.value);
                    resolvePromise(promise2, x, reslove, reject);
                })
            } else if (this.status === REJECTED) {
                onRejected(this.reason)
            } else if (this.status === PENDING) {
                this.onFulfilledCallback.push(onFulfilled);
                this.onRejectedCallback.push(onRejected);
            }
        })
        
        return promise2;
    }


}

function resolvePromise(promise2, x, reslove, reject) {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }

    if (x instanceof MyPromise) {
        x.then(reslove, reject)
    } else {
        reslove(x)
    }
}

let a = new MyPromise((res, rej) => {
    //setTimeout(() => {
        res('success');
    //}, 300)
   /*  rej('fail') */
})

a.then(value => {
    console.log(1)
    console.log(value)
    return value
}).then(value => {
    console.log(2)
    console.log(value)
}).then(value => {
    console.log(3)
    console.log(value)
})