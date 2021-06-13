// 事件的封装
function addEvent(el, type, fn) {
    if (el.addEventListener) {
        el.addEventListener(type, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + type, function (){
            handle.call(el); // fn中使用this attachEvent的this指向window 所以要手动指向
        });
    } else {
        el['on' + type] = fn;
    }
}

// 滚动了多少值的封装
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset 
        }
    } else {
        return {
            left: document.body.scrollLeft + document.documentElement.scrollLeft, // body documentElement只能存在一个 所以相加
            top: document.body.scrollTop + document.documentElement.scrollTop,
        }
    }
}

// 文档内容高度
// 如果有margin 拿到的是不包含margin的距离
function getScrollSize() {
    if (document.body.scrollHeight) {
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        }
    } else {
        return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight,
        }
    }
}

// 窗口高度
function getViewportSize() {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight,
            }
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
            }
        }
    }
}

// 找子元素
function elemChildren(node) {
    var temp = {
        'length': 0,
        'splice': Array.prototype.splice
    },
    len = node.childNodes.length;

    for(var i = 0; i < len; i++) {
        var childItem = node.childNodes[i];

        if (childItem.nodeType === 1) {
            temp[temp.length] = childItem;
            temp['length']++;
        }
    }
    return temp;
}

// 寻找node的第n个父元素
function elemParent(node, n) {
    var type = typeof(n);

    if (type === 'undefined') {
        return node.parentNode;
    } else if (n <= 0 || type !== 'number') {
        return undefined;
    }

    while(n) {
        node = node.parentNode;
        n--;
    }
    return node;
}