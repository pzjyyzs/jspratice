$.ajax({
    url: "http://s.music.163.com/search/get/",
    dataType: "jsonp",
    data: {
        'type': 1,
        'limit': 1
    },
    jsonp: "callback",
    cache: false,
    success: function (data) {
        //function
    }
})