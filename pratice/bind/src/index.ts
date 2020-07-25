var slice = Array.prototype.slice;
function bind(asThis) {
    // 截取处第一以外的函数
    var args = slice.call(arguments, 1);
    var fn = this;
    function resultFn() {
        var args2 = slice.call(arguments, 0);
        return fn.apply(resultFn.prototype.isPrototypeOf(this) ? this : asThis, args.concat(args2))
    }
    resultFn.prototype = fn.prototype;
    return resultFn;
}

// new 的四部操作
/* 
    var fn = function (a) {
        this.a = a
    }
    new fn('x')  

    var temp = {}
    temp._proto_ = fn.prototype
    fn.call(temp, 'x')
    return temp
*/

// 既然bind不能用了 那么 const ... 应该也是用不了了的 -_-
/* function bind(asThis, ...args) {
    console.log(asThis, this)
    const fn = this;
    return function(...args2) {
       return fn.call(asThis, ...args, ...args)
    };
}*/

export default bind; 

if (!Function.prototype.bind) {
    Function.prototype.bind = bind;
}