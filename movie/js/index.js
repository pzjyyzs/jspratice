var Paging = {
    init() {
        this.$tabs = $('footer>div')
        this.$page = $('main>section')
        this.bind()
    },
    bind() {
        var _this = this
        this.$tabs.on('click', function () {
            var $this = $(this)
            var index = $this.index()
            $this.addClass('active')
                .siblings().removeClass('active')
            _this.$page.eq(index).fadeIn().siblings().fadeOut()
            var page = $this.attr('data-page')
            if(page){
                getAndRender(page)
            }
        })
    }
}

var Top250 = {
    init() {
        var _this = this
        this.page = 0
        this.isFinshed = false
        this.count = 10
        this.isLoading = false
        this.$container = $('.top250')
        this.flag = ''
        this.bind()
        this.$container.find('.container').empty()
        this.getData(function (data) {
            _this.renderData(data)
            _this.page++
        })
    },
    bind() {
        var _this = this
        this.$container.on('scroll', function () {
            if (_this.isToBottom() && !_this.isFinshed && !_this.isLoading) {
                _this.getData(function (data) {
                    _this.renderData(data)
                    _this.page++
                    if (_this.page * _this.count > data.total) {
                        _this.isFinshed = true
                    }
                })
            }
        })
    },
    getData(callback) {
        var _this = this
        this.isLoading = true
        $.ajax({
            url: 'https://api.douban.com/v2/movie/top250',
            data: {
                start: this.count * this.page,
                count: this.count
            },
            dataType: 'jsonp'
        }).done(function (ret) {
            _this.isLoading = false
            callback(ret)
        })
    },
    renderData(data) {
        var _this = this
        data.subjects.forEach(function (item) {
            var $node = $(`<div class="item">
                
                <div class="cover">
                    <a href = "${item.alt}" ><img src="${item.images.small}" alt=""></a>
                        </div>
                    <div class="detail">
                        <a href = "${item.alt}" ><h2>${item.title}</h2></a>
                        <div class="extra">
                            <span class="score">${item.rating.average}</span>
                            <span class="collection">${item.collect_count}</span>收藏
                        </div>
                        <div class="extra">${item.year + '/' + item.genres.join('、')}</div>
                        <div class="extra">${'导演:' + item.directors.map(v => v.name).join('、')}</div>
                        <div class="extra">${'主演:' + item.casts.map(v => v.name).join('、')}</div>
                    </div>
                </div >`)
            _this.$container.find('.container').append($node)
        })
    },
    isToBottom() {
        console.log(this.$container.height() + this.$container.scrollTop() + "/" + this.$container.find('.container').height())
        return this.$container.height() + this.$container.scrollTop() === this.$container.find('.container').height() + 17
    }
}
var Usa = {
    init() {
        var _this = this
        this.$container = $('.beimei')
        this.$container.find('.container').empty()
        this.getData(function (data) {
            _this.renderData(data)
        })
    },
    getData(callback) {
        $.ajax({
            url: 'https://api.douban.com/v2/movie/us_box',
            dataType: 'jsonp'
        }).done(function (ret) {
            callback(ret)
        })
    },
    renderData(data) {
        var _this = this
        data.subjects.forEach(function (item) {
            var $node = $(`<div class="item">
                
                <div class="cover">
                    <a href = "${item.subject.alt}" ><img src="${item.subject.images.small}" alt=""></a>
                        </div>
                    <div class="detail">
                        <a href = "${item.subject.alt}" ><h2>${item.subject.title}</h2></a>
                        <div class="extra">
                            <span class="score">${item.subject.rating.average}</span>
                            <span class="collection">${item.subject.collect_count}</span>收藏
                        </div>
                        <div class="extra">${item.subject.year + '/' + item.subject.genres.join('、')}</div>
                        <div class="extra">${'导演:' + item.subject.directors.map(v => v.name).join('、')}</div>
                        <div class="extra">${'主演:' + item.subject.casts.map(v => v.name).join('、')}</div>
                    </div>
                </div >`)
            _this.$container.find('.container').append($node)
        })
    }
}
var Search = {
    init() {
        this.page = 0
        this.isFinshed = false
        this.count = 10
        this.isLoading = false
        this.$container = $('.search')
        this.bind()
    },
    bind() {
        var _this = this
        this.$container.find('.search-area > .btn').on('click', function () {
            var keyword = _this.$container.find('.search-area>input').val()
            _this.page = 0
            _this.$container.find('.container').empty()
            _this.getData(keyword, function (data) {
                _this.renderData(data)
            })
        })
        this.$container.find('.search-area > input').on('keyup', function (e) {
            if (e.key === 'Enter') {
                var keyword = _this.$container.find('.search-area>input').val()
                _this.page = 0
                _this.$container.find('.container').empty()
                _this.getData(keyword, function (data) {
                    _this.renderData(data)
                })
            }
        })
        this.$container.on('scroll', function () {
            if (_this.isToBottom() && !_this.isFinshed && !_this.isLoading) {
                var keyword = _this.$container.find('.search-area>input').val()
                _this.getData(keyword, function (data) {
                    _this.renderData(data)
                    _this.page++
                    if (_this.page * _this.count > data.total) {
                        _this.isFinshed = true
                    }
                })
            }
        })
    },
    getData(keyword, callback) {
        var _this = this
        _this.$container.find('.loading').show()
        _this.isLoading = true
        $.ajax({
            url: 'http://api.douban.com/v2/movie/search',
            data: {
                q: keyword,
                start: this.count * this.page,
                count: this.count
            },
            dataType: 'jsonp'
        }).done((ret) => {
            _this.isLoading = false
            callback(ret)
        })
    },
    renderData(data) {
        var _this = this
        data.subjects.forEach(function (item) {
            var $node = $(`<div class="item"> 
                <div class="cover">
                    <a href = "${item.alt}" ><img src="${item.images.small}" alt=""></a>
                        </div>
                    <div class="detail">
                        <a href = "${item.alt}" ><h2>${item.title}</h2></a>
                        <div class="extra">
                            <span class="score">${item.rating.average}</span>
                            <span class="collection">${item.collect_count}</span>收藏
                        </div>
                        <div class="extra">${item.year + '/' + item.genres.join('、')}</div>
                        <div class="extra">${'导演:' + item.directors.map(v => v.name).join('、')}</div>
                        <div class="extra">${'主演:' + item.casts.map(v => v.name).join('、')}</div>
                    </div>
                </div >`)
            _this.$container.find('.container').append($node)
        })
    },
    isToBottom() {
        console.log(this.$container.height() + this.$container.scrollTop() + "/" + this.$container.find('.container').height())
        return this.$container.height() + this.$container.scrollTop() === this.$container.find('.container').height() + 69
    }
}
var App = {
    init() {
        /*Paging.init()
        Top250.init()
        Usa.init()
        Search.init()
        */
        var serach = location.search.replace(/^\?/, '').split('=')
        Paging.init()
        if (serach[0] === 'page') {
            console.log(serach[1])
            initGetAndRender(serach[1])
        } else {
            initGetAndRender('top250')
        }
    }
}
function initGetAndRender(page) {
    if (page === 'top250') {
        Top250.init()
    } else if (page === 'usbox') {
        Usa.init()
        $("footer>div[data-page='usbox']").trigger("click")
    } else {
        Search.init()
        $("footer>div[data-page='search']").trigger("click")
    }
}
function getAndRender(page){
    if (page === 'top250') {
        Top250.init()
    } else if (page === 'usbox') {
        Usa.init()
    } else {
        Search.init()
    }
    setUrl(page)
}
function setUrl(page){
    var url = location.pathname + '?page=' + page
    history.pushState({ url: url, title: document.title }, document.title, url)
}

App.init()
window.onpopstate = function () {
    App.init()
}
