var express = require('express');

var app = express();

var cors = require('cors');

var bodyParser = require('body-parser');
app.use(bodyParser());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/* app.use(cors({
 
    origin: ['*'],
     
    methods: ["GET", "POST"],
     
    alloweHeaders: ["Content-Type", "Authorization"]
     
})) */

app.post('/img', function (req, res) {
    console.log(req.body.pageNum)
    var response = ''

        if (req.body.pageNum == 0) {
            response = page1;
        } else if (req.body.pageNum == 1) {
            response = page2;
        } else  if (req.body.pageNum == 2) {
            response = page3;
        } else {
            response = 'NO DATA'
        }
    
    res.send({
        pageSize: 3,
        pageData: response
    });
})

var server = app.listen(8080,'localhost', function(){
    var host = server.address().address;
    console.log( server.address())
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

var page1 = 
    `[
        {"img":"img/1.jpg","width":"2560","height":"1600"},
        {"img":"img/2.jpg","width":"1366","height":"768"},
        {"img":"img/3.jpg","width":"1920","height":"1080"},
        {"img":"img/4.jpg","width":"1600","height":"2840"},
        {"img":"img/5.jpg","width":"500","height":"750"},
        {"img":"img/6.jpg","width":"700","height":"1066"},
        {"img":"img/7.jpg","width":"960","height":"800"},
        {"img":"img/8.jpg","width":"1280","height":"720"},
        {"img":"img/9.jpg","width":"700","height":"1050"},
        {"img":"img/10.jpg","width":"500","height":"889"},
        {"img":"img/11.jpg","width":"654","height":"368"},
        {"img":"img/12.jpg","width":"927","height":"521"},
        {"img":"img/13.jpg","width":"640","height":"640"},
        {"img":"img/14.jpg","width":"640","height":"960"},
        {"img":"img/15.jpg","width":"800","height":"450"},
        {"img":"img/16.jpg","width":"700","height":"1243"},
        {"img":"img/17.jpg","width":"500","height":"498"},
        {"img":"img/18.jpg","width":"720","height":"395"},
        {"img":"img/19.jpg","width":"1920","height":"1200"},
        {"img":"img/20.jpg","width":"960","height":"600"},
        {"img":"img/21.jpg","width":"1600","height":"900"},
        {"img":"img/22.jpg","width":"700","height":"1050"},
        {"img":"img/23.jpg","width":"500","height":"751"},
        {"img":"img/24.jpg","width":"600","height":"600"},
        {"img":"img/25.jpg","width":"500","height":"333"},
        {"img":"img/26.jpg","width":"533","height":"300"},
        {"img":"img/27.jpg","width":"500","height":"313"},
        {"img":"img/28.jpg","width":"650","height":"853"},
        {"img":"img/29.jpg","width":"650","height":"365"},
        {"img":"img/30.jpg","width":"500","height":"800"},
        {"img":"img/31.jpg","width":"1000","height":"657"},
        {"img":"img/32.jpg","width":"650","height":"915"},
        {"img":"img/33.jpg","width":"1280","height":"538"},
        {"img":"img/34.jpg","width":"1079","height":"1739"},
        {"img":"img/35.jpg","width":"1280","height":"720"},
        {"img":"img/36.jpg","width":"900","height":"900"},
        {"img":"img/37.jpg","width":"450","height":"300"},
        {"img":"img/38.jpg","width":"200","height":"300"},
        {"img":"img/39.jpg","width":"1280","height":"853"},
        {"img":"img/40.jpg","width":"1024","height":"615"}
    ]`;

var page2 = `[
    {"img":"img/1.jpg","width":"2560","height":"1600"},
	{"img":"img/2.jpg","width":"1366","height":"768"},
	{"img":"img/3.jpg","width":"1920","height":"1080"},
	{"img":"img/4.jpg","width":"1600","height":"2840"},
	{"img":"img/5.jpg","width":"500","height":"750"},
	{"img":"img/6.jpg","width":"700","height":"1066"},
	{"img":"img/7.jpg","width":"960","height":"800"},
	{"img":"img/8.jpg","width":"1280","height":"720"},
	{"img":"img/9.jpg","width":"700","height":"1050"},
	{"img":"img/10.jpg","width":"500","height":"889"},
	{"img":"img/11.jpg","width":"654","height":"368"},
	{"img":"img/12.jpg","width":"927","height":"521"},
	{"img":"img/13.jpg","width":"640","height":"640"},
	{"img":"img/14.jpg","width":"640","height":"960"},
	{"img":"img/15.jpg","width":"800","height":"450"},
	{"img":"img/16.jpg","width":"700","height":"1243"},
	{"img":"img/17.jpg","width":"500","height":"498"},
	{"img":"img/18.jpg","width":"720","height":"395"},
	{"img":"img/19.jpg","width":"1920","height":"1200"},
	{"img":"img/20.jpg","width":"960","height":"600"},
	{"img":"img/21.jpg","width":"1600","height":"900"},
	{"img":"img/22.jpg","width":"700","height":"1050"},
	{"img":"img/23.jpg","width":"500","height":"751"},
	{"img":"img/24.jpg","width":"600","height":"600"},
	{"img":"img/25.jpg","width":"500","height":"333"},
	{"img":"img/26.jpg","width":"533","height":"300"},
	{"img":"img/27.jpg","width":"500","height":"313"},
	{"img":"img/28.jpg","width":"650","height":"853"},
	{"img":"img/29.jpg","width":"650","height":"365"},
	{"img":"img/30.jpg","width":"500","height":"800"},
	{"img":"img/31.jpg","width":"1000","height":"657"},
	{"img":"img/32.jpg","width":"650","height":"915"},
	{"img":"img/33.jpg","width":"1280","height":"538"},
	{"img":"img/34.jpg","width":"1079","height":"1739"},
	{"img":"img/35.jpg","width":"1280","height":"720"},
	{"img":"img/36.jpg","width":"900","height":"900"},
	{"img":"img/37.jpg","width":"450","height":"300"},
	{"img":"img/38.jpg","width":"200","height":"300"},
	{"img":"img/39.jpg","width":"1280","height":"853"},
	{"img":"img/40.jpg","width":"1024","height":"615"}
]`;
var page3 = `[
    {"img":"img/1.jpg","width":"2560","height":"1600"},
	{"img":"img/2.jpg","width":"1366","height":"768"},
	{"img":"img/3.jpg","width":"1920","height":"1080"},
	{"img":"img/4.jpg","width":"1600","height":"2840"},
	{"img":"img/5.jpg","width":"500","height":"750"},
	{"img":"img/6.jpg","width":"700","height":"1066"},
	{"img":"img/7.jpg","width":"960","height":"800"},
	{"img":"img/8.jpg","width":"1280","height":"720"},
	{"img":"img/9.jpg","width":"700","height":"1050"},
	{"img":"img/10.jpg","width":"500","height":"889"},
	{"img":"img/11.jpg","width":"654","height":"368"},
	{"img":"img/12.jpg","width":"927","height":"521"},
	{"img":"img/13.jpg","width":"640","height":"640"},
	{"img":"img/14.jpg","width":"640","height":"960"},
	{"img":"img/15.jpg","width":"800","height":"450"},
	{"img":"img/16.jpg","width":"700","height":"1243"},
	{"img":"img/17.jpg","width":"500","height":"498"},
	{"img":"img/18.jpg","width":"720","height":"395"},
	{"img":"img/19.jpg","width":"1920","height":"1200"},
	{"img":"img/20.jpg","width":"960","height":"600"},
	{"img":"img/21.jpg","width":"1600","height":"900"},
	{"img":"img/22.jpg","width":"700","height":"1050"},
	{"img":"img/23.jpg","width":"500","height":"751"},
	{"img":"img/24.jpg","width":"600","height":"600"},
	{"img":"img/25.jpg","width":"500","height":"333"},
	{"img":"img/26.jpg","width":"533","height":"300"},
	{"img":"img/27.jpg","width":"500","height":"313"},
	{"img":"img/28.jpg","width":"650","height":"853"},
	{"img":"img/29.jpg","width":"650","height":"365"},
	{"img":"img/30.jpg","width":"500","height":"800"},
	{"img":"img/31.jpg","width":"1000","height":"657"},
	{"img":"img/32.jpg","width":"650","height":"915"},
	{"img":"img/33.jpg","width":"1280","height":"538"},
	{"img":"img/34.jpg","width":"1079","height":"1739"},
	{"img":"img/35.jpg","width":"1280","height":"720"},
	{"img":"img/36.jpg","width":"900","height":"900"},
	{"img":"img/37.jpg","width":"450","height":"300"},
	{"img":"img/38.jpg","width":"200","height":"300"},
	{"img":"img/39.jpg","width":"1280","height":"853"},
	{"img":"img/40.jpg","width":"1024","height":"615"}
]`;
