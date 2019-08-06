var app = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var privateKey = fs.readFileSync('');
var certifcate = fs.readFileSync('');

var credentials = {
    ssl: true,
    port: 33456,
    key: privateKey,
    cert: certifcate,
};

var httpServer = http.createServer(app);
var PORT = 33455;

httpServer.listen(PORT, function () {
    console.log('HTTP Server is running on: http://www.chenyanfeng.cn:%s', PORT);
});

var httpsServer = https.createServer(credentials, app);
var SSLPORT = 33456;

httpsServer.listen(SSLPORT, function () {
    console.log('HTTPS Server is running on: https://www.chenyanfeng.cn:%s', SSLPORT);
});

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/', function (req, res) {
    if (req.protocol === 'https') {
        res.status(200).send('Welcome to Safety Land!');
    } else {
        res.status(200).send('Welcome!');
    }
})

app.post('/test', urlencodedParser, function (req, res) {
    console.log(req.query.id);
    console.log(req.query.name);
    res.send('Welcome!ID:' + req.query.name + ',name:' + req.query.name);res.send('Welcome!ID:' + req.query.name + ',name:' + req.query.name);
})

app.post('/token', urlencodedParser, function (request, response) {
    var wxUrl = "https://api.weixin.qq.com/sns/jscode2session?appid= xxxxxxxxxxxxxxxxxx&secret=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&js_code=" + request.query.code +"&grant_type=authorization_code";
    var content = '';
    var req = https.request(wxUrl, function (res) {
        res.on('data', function (body) {
            console.log('return');
            content += body;
        }).on("end", function () {
            response.write(content);
            response.end();
        });
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
    })
    req.end();
});

