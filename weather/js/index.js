let app ={
    init(){
        var _this = this
        this.getData(function(data){
            _this.renderData(data)
            _this.bindEvent()
        })
    },
    bindEvent(){

    },
    renderData(data){
        let weather = data.weather[0]
        console.log(data.weather[0])
        let date = new Date(weather.last_update)
        $$('.month')[0].innerText = month(date.getMonth())
        $$('.week')[0].innerText = week(date.getDay())
        $$('.city .city-name')[0].innerText = weather.city_name
        $$('.detail .detail-tem')[0].innerText = weather.now.temperature+"°"
        $$('.detail .iconfont')[0].classList.add(icon(weather.now.code))
        var future = data.weather[0].future
        $$('.week-list li').forEach(function(curr,index,array){
            let date = new Date(future[index].date)
            curr.children[0].innerText = week(date.getDay())
            curr.children[1].classList.add(icon(future[index].code1))
            curr.children[2].innerText = future[index].low + "°~" + future[index].high+"°"
        })
        
    },
    getData(callback){
        let xhr = new XMLHttpRequest()
        xhr.open('GET','https://weixin.jirengu.com/weather?key=study_javascript_in_jirengu.com')
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                    callback(JSON.parse(xhr.responseText))
                }
            }
        }
        xhr.send()
    }
}

app.init()

function $(selector){
    return document.querySelector(selector)
}

function $$(selector){
    return document.querySelectorAll(selector)
}

function icon(val){
    if (0 <= val && val<4 ){
        return "icon-sunny"
    } else if (4 <= val && val<10){
        return "icon-cloudy"
    } else if (10 <= val && val<20){
        return "icon-rainy"
    } else if (20 <= val && val<26){
        return "icon-snowy"
    } else if (32 <= val && val<37){
        return "icon-cloudy"
    }else{
        return "icon-sunset"
    }
}

function month(val){
    let result = '';
    switch (val) {
        case 0:
            result =  'January '
            break;
        case 1:
            result = ' February'
            break;
        case 2:
            result = 'March'
            break;
        case 3:
            result = 'April'
            break;
        case 4:
            result = 'May'
            break;
        case 5:
            result = 'June'
            break; 
        case 6:
            result = 'July'
            break
        case 7:
            result = 'August'
            break;
        case 8:
            result = 'September'
            break
        case 9:
            result = 'October'
            break
        case 10:
            result = 'November'
            break
        case 11:
            result = 'December'
            break
    }
    return result
}

function week(val){
    let result = ''
    switch (val) {
        case 0:
            result = 'Sunday'
            break;
        case 1:
            result = 'Monday '
            break;
        case 2:
            result = 'Tuesday'
            break;
        case 3:
            result = 'Wednesday'
            break;
        case 4:
            result = 'Thursday'
            break;
        case 5:
            result = 'Friday'
            break;
        case 6:
            result = 'Saturday'
            break;
    }
    return result
}