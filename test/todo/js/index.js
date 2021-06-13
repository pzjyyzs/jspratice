/* 模块化开发 */
init();

function init(){
    initTodoList;
}

var initTodoList = (function(){
    var showInput = document.getElementsByClassName('j-show-input')[0],
        inputWrap = document.getElementsByClassName('input-wrap')[0],
        addItem = document.getElementsByClassName('j-add-item')[0],
        textInput = document.getElementById('textInput'),
        oList = document.getElementsByClassName('j-list')[0],
        isEdit = false,
        curIdx = null;
        inputShow = false;

    addEvent(showInput, 'click', function(){
        if (inputShow) {
            inputWrap.style.display = 'none';
            inputShow = false;
            restoreStatus();
        } else {
            inputWrap.style.display = 'block';
            inputShow = true;
        }
    });

    addEvent(addItem, 'click', function(){
        var oItems = document.getElementsByClassName('item'),
            val = textInput.value,
            len = val.length,
            itemLen = oItems.length;
            

        if (len === 0) {
            return;
        }

        for(var i = 0; i < itemLen; i++) {
            item = elemChildren(oItems[i])[0];
            var text = item.innerText;
            if (val === text) {
                alert('已存在');
                return;
            }

        }

        if (isEdit) {
            var itemP = elemChildren(oItems[curIdx])[0].innerText;

            itemP.innerText = content;

            liParent.className += ' active';
            addItem.innerText = 'add';
        } else {
            var oLi = document.createElement('li');
            oLi.className = 'item';
            oLi.innerHTML = itemTpl(val);
            oList.appendChild(oLi);
        }
        textInput.value = '';
        inputWrap.style.display = 'none';
        restoreStatus();
    });

    addEvent(oList, 'click', function(e){
        var e  = e || window.event,
            tar = e.target || e.srcElement,
            className = tar.className,
            tarIdx = Array.prototype.indexOf.call(oItems, liParent),
            liParent = elemParent(tar, 2),
            oItems = document.getElementsByClassName('item');

        if (className === 'edit-btn fa fa-edit') {
            var itemLen = oItems.length,
                item;
            
            showInput.style.display = 'block';
            inputShow = true;
            for (var i = 0; i < itemLen; i++) {
                item = oItems[i];
                item.className = 'item';
            }

            curIdx = tarIdx;
            liParent.className += ' active';
            addItem.innerText = 'edit No.' + ( curIdx + 1 );
            isEdit = true;
        } else if (className === 'remove-btn fa fa-times') {
            liParent.remove();
            restoreStatus();
        }
    });

    function restoreStatus() {
        isEdit = false;
        curIdx = null;
        textInput.value = '';
        addItem.innerText = 'add';
    }

    function itemTpl(text) {
        return (
            '<p class="item-content">'+ text +'</p>' +
            '<div class="btn-group">' +
                '<a href="javascript:;" class="edit-btn fa fa-edit"></a>' +
                '<a href="javascript:;" class="remove-btn fa fa-times"></a>' +
            '</div>'
        )
    }
})();

/* var tpl = document.getE */