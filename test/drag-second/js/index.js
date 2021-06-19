// 声明模块 形成作用域 但是不执行，也有立即执行的
Element.prototype.dragNClick = (function(menu, elemClick){
    var bTime = 0,
        eTime = 0,
        oPos = [],
        cbTime = 0,
        ceTime = 0,
        counter = 0,
        t = null,
        wWidth = getViewportSize().width,
        wHeight = getViewportSize().height,
        eleWidth = getStyles(this, 'width'),
        eleHeight = getStyles(this, 'height'),
        mWidth = getStyles(menu, 'width'),
        mHeight = getStyles(menu, 'height');

    drag.call(this);
    function drag() {
        var x,
            y,
            _self = this;
        
        addEvent(this, 'mousedown', function(e){
            var e = e || window.event,
                btnCode = e.button;
            if (btnCode === 2) {
                var mLeft = pagePos(e).X,
                    mTop = pagePos(e).Y;

                if (mLeft <= 0) {
                    mLeft = 0;
                } else if (mLeft >= wWidth - mWidth) {
                    mLeft = pagePos(e).X - mWidth;
                }

                if (mTop <= 0) {
                    mTop = 0;
                } else if (mTop >= wHeight - mHeight) {
                    mTop = pagePos(e).Y - mHeight;
                }

                menu.style.left =  mLeft + 'px';
                menu.style.top =  mTop + 'px';
                menu.style.display = 'block';
            } else if (btnCode === 0) {
                menu.style.display = 'none';
                bTime = new Date().getTime();
                oPos = [getStyles(_self, 'left'), getStyles(_self, 'top')]
                x = pagePos(e).X - getStyles(_self, 'left');
                y = pagePos(e).Y - getStyles(_self, 'top');
                
                addEvent(document, 'mousemove', mouseMove);
                addEvent(document, 'mouseup', mouseUp);
                cancelBubble(e);
                preventDefaultEvent(e);
            }
        });

        addEvent(document, 'contextmenu', function(e){
            var e = e || window.event;
            preventDefaultEvent(e);
        });

        addEvent(document, 'click', function(e){
            menu.style.display = 'none';
        });

        addEvent(menu, "click", function(e){
            var e = e || window.event;
            cancelBubble(e);
        })
        function mouseMove(e){
            var e = e || window.event,
                eleLeft = pagePos(e).X - x,
                eleTop = pagePos(e).Y - y;
            
            if (eleLeft <= 0) {
                eleLeft = 0;
            } else if (eleLeft >= wWidth - eleWidth) {
                eleLeft = wWidth - eleWidth; // wWidth - eleWidth - 1 浏览器误差
            }

            if (eleTop <= 0) {
                eleTop = 0;
            } else if (eleTop >= wHeight - eleHeight) {
                eleTop = wHeight - eleHeight; // wHeight - eleHeight - 1 浏览器误差
            }

            _self.style.left = eleLeft + 'px';
            _self.style.top = eleTop + 'px';


        } 

        function mouseUp(e){
            var e = e || window.event;
            eTime = new Date().getTime();
            if (eTime - bTime < 300){
                _self.style.left = oPos[0] + 'px';
                _self.style.top = oPos[1] + 'px';

                counter++;
                if (counter === 1) {
                    cbTime = new Date().getTime();
                }

                if (counter === 2){
                    ceTime = new Date().getTime();
                }

                if (cbTime && ceTime && (ceTime - cbTime < 200)) {
                    elemClick();
                }

                t = setTimeout(function(){
                    cbTime = 0;
                    ceTime = 0;
                    counter = 0;
                    clearTimeout(t);
                }, 500);
            }
            removeEvent(document, 'mousemove', mouseMove);
            removeEvent(document, 'mouseup', mouseUp);
        }
    }
});

