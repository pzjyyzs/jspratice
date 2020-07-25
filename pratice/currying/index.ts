/* 
 假设 addTwo接受2个参数
 addThree接受三个参数
 addFour 接受四个参数
 请写出一个currify函数 是他们分别接受2,3,4此参数
 currify(addTow)(1)(2)
 currify(addThree)(1)(2)(3)
 currify(addFour)(1)(2)(3)(4)
*/

let addTwo = (a, b) => a + b;

const currify = (fn, params = []) => {
    return (...arg) => {
        if (params.length + arg.length === fn.length) {
            return fn(...params, ...arg)
        } else {
            return currify(fn, [...params, ...arg])
        }
    }
}

// 高阶函数