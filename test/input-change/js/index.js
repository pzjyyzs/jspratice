window.onload = function(){
    init();
}

function init() {
    keySearch();
}

var keySearch = (function(){
    var search = document.getElementById('J_search_kw'),
        autoKw = document.getElementById('J_autoKw'),
        recomKw = JSON.parse(document.getElementById('J_recomKw').innerHTML),
        kwOrder = 0,
        t = null;

    addEvent(search, 'focus', function(){
        clearTimeout(t);
        autoKw.style.color = '#ccc';
    });

     addEvent(search, 'blur', function(){
        autoKwShow(this.val, true);
        t = setInterval(autoKwChange, 3000);
    });

    addEvent(search, 'input', function(){
        autoKwShow(this.val, false);
    });

    addEvent(search, 'propertychange', function(){
        autoKwShow(this.val, false);
    });

    function setAutoKws(){
        autoKwChange();
        t = setInterval(autoKwChange, 3000);
    }
    

    function autoKwChange(){
        var len = recomKw.length;

        autoKw.innerHTML = recomKw[kwOrder];
        kwOrder = kwOrder >= len - 1 ? 0 : kwOrder + 1; 
    }

    function autoKwShow(val, isBlur) {
        if (val.length <= 0){
            autoKw.className = 'auto-kw show';
            autoKw.style.color = isBlur ? '#989898' : '#ccc';
        } else {
            autoKw.className = 'auto-kw hide';
        }
    }

    return function(){
        setAutoKws();
    };
})();