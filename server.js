var express = require('express');
var bodyParser = require('body-parser');
//var https =  require('https');
var fs = require('fs');
var app = express();
var surveyDAO = require('./dao/suvery_dao');
// var key = fs.readFileSync('./cert/survey-me.pem');
// var cert = fs.readFileSync('./cert/survey-me.cert.pem');
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/questions', function (req, res, next) {
    console.log('GET METHOD');
    var surveyModel = JSON.parse(fs.readFileSync('./survey.json','utf8'));
    res.send(surveyModel);
});

app.post('/questions',function(req,res,next) {
    var survey = req.body;
    surveyDAO.save(survey).then(function(){
        res.sendStatus(200);
    }).catch(function(err){
        res.status(500);
    });
});
/* 
app.post('/', function (req, res, next) {
    // Handle the post for this route
    console.log('POST METHOD');
    res.send({'username':'momoko'});
}); */

// var server = https.createServer({key:key,cert:cert},app).listen(3000, function () {
//     var host = server.address().address;
//     var port = server.address().port;

//     console.log('Example app listening at http://%s:%s', host, port);
// });

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});