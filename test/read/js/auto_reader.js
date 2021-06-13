;(function(){
    var wHeight = getViewportSize().height;
    var sHeight = getScrollSize().height;
    var playing = false;
    var t = null;

    var AutoReader = function(opt){
        this.playBtn = opt.playBtn;
        this.sTopBtn = opt.sTopBtn;

        var _self = this;
        addEvent(this.sTopBtn, 'click',function(){
            window.scrollTo(0, 0);
            clearInterval(t);
            _self.playBtn.style.backgroundColor = '#ff0000';
        }, false);

        addEvent(window, 'scroll', function(){
            _self.sTopBtnShow.call(_self);
        });

        addEvent(this.playBtn, 'click', function(){
            _self.setAutoPlay.call(this);
        });
    }

    AutoReader.prototype = {
        sTopBtnShow: function(){
            var sTop = getScrollOffset().top,
                sTopBtn = this.sTopBtn;
            sTopBtn.style.display = sTop ? 'block' : 'none';
        },
        setAutoPlay: function(){
            var sTop = getScrollOffset().top;
            var _self = this;
            
            if (sHeight === wHeight + sTop) {
                return;
            }

            if (!playing) {
                t = setInterval(function(){
                    var sTop = getScrollOffset().top;
                    console.log(wHeight, sTop, wHeight + sTop);
                    console.log(sHeight)
                    if (sHeight <= wHeight + sTop) {
                        clearInterval(t);
                        _self.style.backgroundColor = '#ff0000';
                        playing = false;
                        return;
                    } else {
                        window.scrollBy(0, 5);
                        _self.style.backgroundColor = '#00ff00'
                    }
                }, 1);
                playing = true;
            } else {
                clearInterval(t);
                _self.style.backgroundColor = '#ff0000';
                playing = false;
            }
        }
    }

    window.AutoReader = AutoReader;
})();