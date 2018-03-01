var mysql = require('mysql');
var fs = require('fs');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'remote',
    password: 'P@ssw0rd',
    database: 'survey'
});



function SurveyDAO() {
    this.list = function(){
        return new Promise(function(resolve, reject){
            connection.connect(function (err) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    reject(err);
                }
                console.log('connected as id ' + connection.threadId);
            });

            connection.query('SELECT * FROM survey', function (error, results, fields) {
                connection.end();
                if (error) {
                    console.error('error insert: ' + error.stack);
                    reject(error);
                }
                else{
                    resolve(results);
                }
            });
        });
    };
    this.save = function (question) {
        return new Promise(function (resolve, reject) {
            connection.connect(function (err) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    reject(err);
                }
                console.log('connected as id ' + connection.threadId);
            });
            
            let re = {
                title: question.title,
                question: JSON.stringify(question),
                create_date: new Date()
            };
            connection.query('INSERT INTO survey SET ?', re, function (error, results, fields) {
                connection.end();
                if (error) {
                    console.error('error insert: ' + error.stack);
                    reject(error);
                }else{
                    resolve();
                }
                
            });
            
        });
    };
}

var surveyDAO = new SurveyDAO();

module.exports = surveyDAO;