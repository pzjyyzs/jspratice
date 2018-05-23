const App = {
    init() {
        this.audio = new Audio()
        this.lyricObj = {}
        this.bind()
    },
    bind() {
        var _this = this
        this.getSong(function (data) {
            _this.renderData(data)
        })

        $('#play').addEventListener('click', function (e) {
            e.preventDefault()
            if (_this.audio.paused) {
                e.target.classList.remove('play-btn')
                e.target.classList.add('pause-btn')
                _this.audio.play()
            } else {
                e.target.classList.remove('pause-btn')
                e.target.classList.add('play-btn')
                _this.audio.pause()
            }
        })

        this.audio.addEventListener('timeupdate', function () {
            let curTime = Math.floor(_this.audio.currentTime)
            let curM = Math.floor(curTime / 60)
            let curS = curTime % 60
            curM = curM >= 10 ? curM : '0' + curM
            curS = curS >= 10 ? curS : '0' + curS
            $$('.time')[0].innerHTML = curM + ':' + curS

            let scale = _this.audio.currentTime / _this.audio.duration
            $$('.scoll-now')[0].style.width = $$('.scoll')[0].offsetWidth * scale + "px"
            if (scale === 1) {
                $('#next').click()
            }
            let word = _this.lyricObj[curM + ':' + curS]
            if(word){
                $$('.word')[0].innerText = word
            }
        })

        $('#next').addEventListener('click', function (e) {
            e.preventDefault()
            _this.getSong(function (data) {
                _this.renderData(data)
            })
            $('#play').classList.remove('play-btn')
            $('#play').classList.add('pause-btn')
            _this.audio.autoplay = true
        })
    },
    getSong(callback) {
        this.getData('http://api.jirengu.com/fm/getSong.php', callback)
    },
    renderData(data) {
        let _this = this
        let songObj = JSON.parse(data)
        this.audio.src = songObj.song[0].url
        $$('.singer')[0].innerText = songObj.song[0].artist
        $$('.song')[0].innerText = songObj.song[0].title
        $$('.pic')[0].style.backgroundImage = "url(" + songObj.song[0].picture + ")"
        this.getLrc(songObj.song[0].sid, function (data) {
            _this.renderWord(data)
        })
        console.log(songObj.song[0])
    },
    getLrc(sid, callback) {
        this.getData('http://jirenguapi.applinzi.com/fm/getLyric.php?&sid='+sid ,callback)
    },
    renderWord(data){
        let dataObj = JSON.parse(data)
        let word = dataObj.lyric
        let lyricObj = {}
        let arr = word.split('\n').forEach(function(line){
            let times = line.match(/\d{2}:\d{2}/g)
            let str = line.replace(/\[.+?\]/g,'')
            if(Array.isArray(times)){
                times.forEach(function(time){
                    lyricObj[time] = str
                })
            }
        })
        this.lyricObj = lyricObj
    },
    getData(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('get', url, true)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    callback(xhr.responseText)
                }
            }
        }
        xhr.onerror = function () {
            console.log('error')
        }
        xhr.send()
    }
}
App.init()

/* let script = document.createElement('script')
    script.setAttribute("type", "text/javascript");
    script.charset = 'gb2312'
    script.src = 'http://music.qq.com/musicbox/shop/v3/data/random/1/random1.js?p=12'
    document.head.appendChild(script)
    document.head.removeChild(script) 

function JsonCallback(data){
    songArr = data.songlist
}
*/

function $(selector) {
    return document.querySelector(selector)
}

function $$(selector) {
    return document.querySelectorAll(selector)
}

