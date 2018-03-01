var Excel = require('exceljs');
var surveyDAO = require('../dao/suvery_dao');


function ExcelGenerator() {
    this.generate = function () {
        return new Promise(function (resolve, reject) {
            surveyDAO.list().then(function (results) {
                var columnHeaders;
                for (var i = 0; i < results.length; i++) {
                    var answer = JSON.parse(results[i].question);
                    if (i === 0) {
                        columnHeaders = createHeaders(answer);
                        var workbook = new Excel.Workbook();
                        var worksheet = workbook.addWorksheet("My Sheet");
                        worksheet.addRows(columnHeaders);
                        var row1 = worksheet.getRow(1);
                        row1.eachCell(function (cell, colNumber) {
                            console.log('Cell ' + colNumber + ' = ' + cell.value);
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'darkTrellis',
                                fgColor: {
                                    argb: 'FFFFFF00'
                                },
                                bgColor: {
                                    argb: 'FF0000FF'
                                }
                            }
                        });
                        var row2 = worksheet.getRow(2);
                        row2.eachCell(function (cell, colNumber) {
                            console.log('Cell ' + colNumber + ' = ' + cell.value);
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'darkTrellis',
                                fgColor: {
                                    argb: 'FFFFFF00'
                                },
                                bgColor: {
                                    argb: 'FF0000FF'
                                }
                            }
                        });
                    }
                    worksheet.addRow(createRow(answer));
                }
                workbook.xlsx.writeFile("survey.xlsx").then(function () {
                    console.log("xls file is written.");
                    resolve();
                });
            })
        });
    };

    function createHeaders(question) {

        var questionItems = [];
        var columnHeaders = [];
        var columnHeaders2 = [];
        for (var i = 0; i < question.pages.length; i++) {
            questionItems = questionItems.concat(question.pages[i].questions);
        }
        questionItems.forEach(function (questionItem) {
            if (questionItem.type !== 'table') {
                columnHeaders.push(questionItem.question);
                columnHeaders2.push("");
            } else {
                var rowsNumber = questionItem.table.rows.length;
                var columnsNumber = questionItem.table.rows[0].length;


                //columnHeaders.push(questionItem.question);
                for (var j = 0; j < rowsNumber * (columnsNumber - 1); j++) {
                    if (j === 0) {
                        columnHeaders.push(questionItem.question);
                    } else {
                        columnHeaders.push("");
                    }
                }
                for (var m = 0; m < rowsNumber; m++) {
                    var row = questionItem.table.rows[m];
                    for (var n = 1; n < row.length; n++) {
                        columnHeaders2.push(row[n].question);
                    }
                }

            }
        });
        return [columnHeaders, columnHeaders2];
    }

    function createRow(question) {
        var rowData = [];
        var questionItems = [];
        for (var i = 0; i < question.pages.length; i++) {
            questionItems = questionItems.concat(question.pages[i].questions);
        }
        questionItems.forEach(function (questionItem) {
            if (questionItem.type !== 'table') {
                rowData.push(questionItem.value);
            } else {
                var rowsNumber = questionItem.table.rows.length;
                var columnsNumber = questionItem.table.rows[0].length;
                for (var m = 0; m < rowsNumber; m++) {
                    var row = questionItem.table.rows[m];
                    for (var n = 1; n < row.length; n++) {
                        rowData.push(row[n].value);
                    }
                }
            }
        });
        return rowData;
    }
}

var excelGenerator = new ExcelGenerator();
module.exports = excelGenerator;