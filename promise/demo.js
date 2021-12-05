// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(excutor) {
        try {
            excutor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error);
        }
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

        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

        const promise2 = new MyPromise((reslove, reject) => {
            if (this.status === FULFILLED) {

                queueMicrotask(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, reslove, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            } else if (this.status === REJECTED) {

                queueMicrotask(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, reslove, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
                
            } else if (this.status === PENDING) {

                this.onFulfilledCallback.push(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, reslove, reject);   
                    } catch (error) {
                        reject(error)
                    }
                });

                this.onRejectedCallback.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, reslove, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                });
            }
        })
        
        return promise2;
    }

    static reslove (parameter) {
        if (parameter instanceof MyPromise) {
            return parameter
        }

        return new MyPromise(reslove => {
            reslove(parameter)
        });
    }

    static reject (reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        })
    }
}

function resolvePromise(promise, x, resolve, reject) {
    // 如果相等了，说明return的是自己，抛出类型错误并返回
    if (promise === x) {
      return reject(new TypeError('The promise and the return value are the same'));
    }
  
    if (typeof x === 'object' || typeof x === 'function') {
      // x 为 null 直接返回，走后面的逻辑会报错
      if (x === null) {
        return resolve(x);
      }
  
      let then;
      try {
        // 把 x.then 赋值给 then 
        then = x.then;
      } catch (error) {
        // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
        return reject(error);
      }
  
      // 如果 then 是函数
      if (typeof then === 'function') {
        let called = false;
        try {
          then.call(
            x, // this 指向 x
            // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
            y => {
              // 如果 resolvePromise 和 rejectPromise 均被调用，
              // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
              // 实现这条需要前面加一个变量 called
              if (called) return;
              called = true;
              resolvePromise(promise, y, resolve, reject);
            },
            // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
            r => {
              if (called) return;
              called = true;
              reject(r);
            });
        } catch (error) {
          // 如果调用 then 方法抛出了异常 error：
          // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
          if (called) return;
  
          // 否则以 error 为据因拒绝 promise
          reject(error);
        }
      } else {
        // 如果 then 不是函数，以 x 为参数执行 promise
        resolve(x);
      }
    } else {
      // 如果 x 不为对象或者函数，以 x 为参数执行 promise
      resolve(x);
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

let task1 = () => new Promise((reslove, reject) => setTimeout(() => { reject('第一扇门关了') }, 3000))

let task2 = () => new Promise((reslove, reject) => setTimeout(() => { reject('第二扇门关了') }, 4000))

let task3 = () => new Promise((reslove, reject) => setTimeout(() => { reslove('第二扇门开了') }, 5000))

Promise.all([
    task1().then(() => ({status: 'ok'}), () => ({status: 'not ok'})), 
    task2().then(() => ({status: 'ok'}), () => ({status: 'not ok'})), 
    task3().then(() => ({status: 'ok'}), () => ({status: 'not ok'}))
]).then((val) => console.log(val), (reason) => console.log(reason))