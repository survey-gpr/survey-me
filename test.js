var generator = require('./util/excel_generator');

generator.generate().then(function(){
    console.log('create excel file successfully');
})