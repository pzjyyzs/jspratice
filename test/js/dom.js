/* var thumbItem  = document.getElementsByClassName('thumbs-list-item');
var sliderItem = document.getElementsByClassName('slider-list-item');
console.log(sliderItem)
for (var i = 0; i < thumbItem.length; i++) {
    (function (index){
        thumbItem[index].onclick = function() {
            for(var j = 0;j < thumbItem.length; j++) {
                thumbItem[j].className = 'thumbs-list-item';
                sliderItem[j].className = 'slider-list-item';
            }
            this.className += ' cur';
            sliderItem[index].className += ' active';
        }
    })(i)
   
} */

;(function(){
    var Slider = function(opt) {
        this.sliderItem = document.getElementsByClassName(opt.sliderItem);
        this.thumbsItem = document.getElementsByClassName(opt.thumbItem);

        this.bindClick();
    }

    Slider.prototype = {
        bindClick: function() {
            var slider = this.sliderItem,
                thumbs = this.thumbsItem;
            for (var i = 0; i < thumbs.length; i++) {
                (function (index){
                    thumbs[index].onclick = function() {
                        for(var j = 0;j < thumbs.length; j++) {
                            thumbs[j].className = 'thumbs-list-item';
                            slider[j].className = 'slider-list-item';
                        }
                        this.className += ' cur';
                        slider[index].className += ' active';
                    }
                })(i)
            }
        }
    }

    window.Slider = Slider;
})()