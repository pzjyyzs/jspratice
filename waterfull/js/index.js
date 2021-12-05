;(function(doc){

    // 外层盒子 oWrapper

    // 列数 column

    // 间隙 gap
    // 盒子宽度 itemWidth （总宽度 - （列数 - 1）*间隙 ） / 列数

    var Waterfall = function(wrapper, opt) {
        this.oWrapper = doc.getElementsByClassName(wrapper)[0];
        this.column = opt.column;
        this.gap = opt.gap;


        this.pageNum = 0;
        this.pageSize = 0;
        this.heightArr = [];
        this.itemWidth = (this.oWrapper.offsetWidth - (this.column - 1) * this.gap) / this.column;
    }

    Waterfall.prototype = {
        init: function(){
            this.getImgDatas(this.pageNum);
            this.bindEvent();
        },

        bindEvent: function(){
            window.addEventListener('scroll', this.scrollToBottom.bind(this), false);
            // window.addEventListener('resize', debounce(this.resize.bind(this), 50))
        },

        scrollToBottom: function(){
            if (getScrollTop() + getWindowHeight() >= getScrollHeight()) {
                this.pageNum++;

                if (this.pageNum <= this.pageSize - 1) {
                    this.getImgDatas(this.pageNum)
                }
            }
        },

        getImgDatas: function(pageNum){
            var _self = this;
            xhr.ajax({
                url: 'http://127.0.0.1:8080/img',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    pageNum: pageNum,
                },
                success: function(data) {
                    console.log(data)
                    if (data !== 'NO DATA') {
                        var pageData = JSON.parse(data.pageData);
                        _self.pageSize = parseInt(data.pageSize);
                        _self.renderList(pageData, _self.pageNum);
                    }
                }
            });
        },

        renderList: function(data, pageNum){
            var oFrag = doc.createDocumentFragment();

            data.forEach(function(elem, idx) {
                var minIdx = getMinIdx(this.heightArr);
                var oItem = doc.createElement('div'),
                    oImg = new Image(),
                    itemLeft = (idx + 1) % this.column === 1 ? '0' : idx * (this.itemWidth + this.gap),
                    minHeightElemLeft = minIdx === 0 ? 0 : (minIdx * (this.itemWidth + this.gap)),
                    itemHeight = elem.height * this.itemWidth / elem.width;
                
                oItem.className = 'wf-item';
                oItem.style.width = this.itemWidth + 'px';
                oItem.style.height = elem.height * this.itemWidth / elem.width + 'px';
                oImg.src = elem.img;

                oItem.appendChild(oImg);
                oFrag.appendChild(oItem);

                if (idx < this.column && pageNum == 0) {
                    this.heightArr.push(itemHeight);
                    console.log(this.heightArr)
                    oItem.style.top = '0';
                    oItem.style.left = itemLeft + 'px'
                } else {
                    oItem.style.left = minHeightElemLeft + 'px';
                    oItem.style.top = ( this.heightArr[minIdx] + this.gap ) + 'px';
                    this.heightArr[minIdx] += (itemHeight + this.gap);
                }
                oImg.style.opacity = '1'
            }, this);

            this.oWrapper.appendChild(oFrag);
        },

       /*  resize: function() {
            if (document.body.offsetWidth < 600) return ;
            this.init()
        } */
    }

    function getMinIdx(arr) {
        return [].indexOf.call(arr,Math.min.apply(null, arr));
    }

    function debounce(fn, delay) {
        delay = delay || 100;
        var time = null;
        return function() {
            var _self = this;
            if (time){window.clearTimeout(time)}
            time = setTimeout(() => {
                fn.apply(_self, arguments);
                time = null;
            }, delay)
        }
    }

    window.Waterfall = Waterfall;
})(document);