var slice = Array.prototype.slice;
function bind(asThis) {
    // 截取处第一以外的函数
    var args = slice.call(arguments, 1);
    var fn = this;
    return function() {
        var args2 = slice.call(arguments, 0);
        return fn.apply(asThis, args.concat(args2))
    }
}

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