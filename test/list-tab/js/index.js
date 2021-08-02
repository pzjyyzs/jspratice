window.onload = function(){
    init();
}

function init() {
    initMenu();
}

var initMenu = (function(){
    var oMenu = document.getElementsByClassName('menu-wrap')[0],
        oMenuItems = document.getElementsByClassName('main-item'),
        menuLen = oMenuItems.length,
        oSub = document.getElementsByClassName('sub')[0],
        oSubItems = document.getElementsByClassName('sub-item'),
        subLen = oSubItems.length,
        menuItem,
        subItem;
    
    addEvent(oMenu, 'mouseleave', menuMouseOut);

    for(var i = 0;i< menuLen; i++) {
        menuItem = oMenuItems[i];

        addEvent(menuItem, 'mouseenter', menuItemMouseEnter);
    }
    
    function menuItemMouseEnter(e){
        var e = e || window.event,
            tar = e.target || e.srcElement,
            thisIdx = Array.prototype.indexOf.call(oMenuItems, tar);
        oSub.className = 'sub';
        addActive(thisIdx);
    }

    function addActive(index){
        removeAllActive();
        oMenuItems[index].className += ' active';
        oSubItems[index].className += ' active'
    }

    function removeAllActive() {
        for(var i = 0;i < menuLen; i++){
            menuItem = oMenuItems[i];
            subItem = oSubItems[i];
            menuItem.className = 'main-item';
            subItem.className = 'sub-item';
        }
    }

    function menuMouseOut() {
        oSub.className += ' hide';
        removeAllActive();
    }
});