var mysql = require('mysql');
var fs = require('fs');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'remote',
    password: 'P@ssw0rd',
    database: 'survey'
});



function SurveyDAO() {
    this.save = function (question) {
        return new Promise(function (resolve, reject) {
            connection.connect(function (err) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    reject(err);
                }
                console.log('connected as id ' + connection.threadId);
            });

            var surveyJSON = fs.readFileSync('./survey.json', 'utf8');
            var surveyModel = JSON.parse(surveyJSON);
            let re = {
                title: surveyModel.title,
                question: surveyJSON,
                create_date: new Date()
            };
            connection.query('INSERT INTO survey SET ?', re, function (error, results, fields) {
                if (error) {
                    console.error('error insert: ' + err.stack);
                    reject(err);
                }
            });
            connection.end();
            resolve();
        });
    };
}

moudle.exports = new SurveyDAO();