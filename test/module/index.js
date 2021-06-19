;(function(){
    var Test = function(){

    }

    Test.prototype = {
        init: function(){
            // 启动
            this.bindEvent();
        },
        bindEvent: function(){
            // 事件在这里
        },

    }

    window.Test = Test;
})();