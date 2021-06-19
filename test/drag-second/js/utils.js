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

function removeEvent(elem, type, fn) {
    if (elem.addEventListener) {
        elem.removeEventListener(type, fn, false);
    } else if (elem.attachEvent) {
        elem.detachEvent('on' + type, fn);
    } else {
        elem['on' + 'type'] = null;
    }
}

function cancelBubble(e) {
    var e = e || window.event;

    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

function preventDefaultEvent(e) {
    var e = e || window.event;
    if (e.preventDefault){
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}

function pagePos(e) {
    var sLeft = getScrollOffset().left,
        sTop = getScrollOffset().top,
        cLeft = document.documentElement.clientLeft || 0,
        cTop = document.documentElement.clientTop || 0;
    
    return {
        X: e.clientX + sLeft - cLeft,
        Y: e.clientY + sTop - cTop
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

function getStyles(elem, prop) {
    if (window.getComputedStyle) {
        if (prop) {
            return parseInt(window.getComputedStyle(elem, null).getPropertyValue(prop))
        } else {
            return window.getComputedStyle(elem, null);
        }
    } else {
        if (prop) {
            return parseInt(elem.currentStyle[prop]);
        } else {
            return elem.currentStyle;
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

function elemDrag(elem) {
    var x,
        y;
    
    addEvent(elem, 'mousedown', function(e){
        var e = e || window.event;
        // 点击的点距离可是区域的位置 - 当前元素的位置 = 点击的点 到元素内的距离
        // 移动后 拿到点击的点的位置 - 点到元素内的距离 = 当前元素的位置 实现了元素的移动
        x = pagePos(e).X - getStyles(elem, 'left');
        y = pagePos(e).Y = getStyles(elem, 'top');

        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        cancelBubble(e);
        preventDefaultEvent(e);
    });
    function mouseMove(e){
        var e = e || window.event;

        elem.style.left = pagePos(e).X - x + 'px';
        elem.style.top = pagePos(e).Y - y + 'px';
    } 

    function mouseUp(e){
        var e = e || window.event;
        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, 'mouseup', mouseUp);
    }
}