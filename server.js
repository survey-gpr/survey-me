var express = require('express');
var https =  require('https');
var fs = require('fs');
var app = express();
var key = fs.readFileSync('./cert/survey-me.pem');
var cert = fs.readFileSync('./cert/survey-me.cert.pem');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res, next) {
    // Handle the get for this route
    console.log('GET METHOD');
    res.send({'username':'momoko'});
});

app.post('/', function (req, res, next) {
    // Handle the post for this route
    console.log('POST METHOD');
    res.send({'username':'momoko'});
});

var server = https.createServer({key:key,cert:cert},app).listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
