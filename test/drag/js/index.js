var box = document.getElementsByClassName('box')[0];
elemDrag(box);

/* box.onmousedown = function(e){
    var e = e || window.event;

    x = pagePos(e).X - getStyles(box, 'left');
    y = pagePos(e).Y - getStyles(box, 'top');
    document.onmousemove = function(e){
        var e = e || window.event,
            page = pagePos(e);
        box.style.left = page.X - x + 'px';
        box.style.top = page.Y - y + 'px';
    }

    document.onmouseup = function(e){
        document.onmousemove = null;
        document.onmouseup = null;
    }
} */

/* document.onmousemove = function(e) {
    console.log(box)
    var e = e || window.event,
        page = pagePos(e);
    box.style.left = page.X + 'px';
    box.style.top = page.Y + 'px';
} */


function elemDrag(elem){
    var x,
        y;
    
    addEvent(elem, 'mousedown',function(e){
        var e = e || window.event;
        x = pagePos(e).X - getStyles(elem, 'left');
        y = pagePos(e).Y - getStyles(elem, 'top');

        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        cancelBubble(e);
        preventDefaultEvent(e);
    });

    function mouseMove(e) {
        var e = e || window.event;
        elem.style.left = pagePos(e).X - x + 'px';
        elem.style.top = pagePos(e).Y - y + 'px';
    }

    function mouseUp(e) {
        var e = e || window.event;
        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, 'mouseup', mouseUp);
    }
}