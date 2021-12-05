;(function(doc){
    var oItems = doc.getElementsByClassName('wf-item'),
        oItemsLen = oItems.length,
        _arr = [];
    
    var init = function() {
        setImgPos()
    }

    function setImgPos() {
        var item;
        console.log(oItemsLen)
        for(var i = 0;i < oItemsLen; i++) {
            // 1200 - 40(5行4个间隔 一个间隔是10) /5(分五行)
            item = oItems[i];
            item.style.width = '232px';

            if (i < 5) {
                _arr.push(item.offsetHeight);
                item.style.top = '0';

                if ((i + 1) % 5 === 1) {
                    item.style.left = '0';
                } else {
                    item.style.left = i * (232 + 10) + 'px'
                }
            } else {
                let minIdx = getMinIdx(_arr);
                // 最小下标到左边的距离
                item.style.left = oItems[minIdx].offsetLeft + 'px';
                item.style.top = (_arr[minIdx] + 10) + 'px';
                _arr[minIdx] += (item.offsetHeight + 10);
            }


        }
        console.log(_arr)
    }

    // 找最小高度的下标
    function getMinIdx(arr) {
        return [].indexOf.call(arr,Math.min.apply(null, arr));
    }
    window.onload = function() {
        init();
    }
})(document)