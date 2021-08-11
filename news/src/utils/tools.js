function tplReplace(tpl, replaceObject) {
    return tpl.replace(/{{(.*?)}}/g, (node, key) => {
        return replaceObject[key]
    });
}

function getUrlQueryValue (key) {
    const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'),
          res = window.location.search.substr(1).match(reg);
    
    return res != null ? decodeURIComponent(res[2]) : null; 
}

function throttle(fn, delay) {
    var t = null,
        begin = new Date().gettime();
    
    return function (){
        var _self = this,
            args = arguments,
            cur = new Date().getTime();
        
        clearTimeout(t);

        if (cur - begin >= delay) {
            fn.apply(_self, args);
            begin = cur;
        } else {
            t = setTimeout(() => {
                fn.apply(_self, args);
            }, delay)
        }
    }
}

module.exports = {
    tplReplace,
    getUrlQueryValue,
    throttle
}