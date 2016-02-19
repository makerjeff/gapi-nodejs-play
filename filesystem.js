/**
 * FILE SYSTEM TEST
 * instructions:
 * - run by node filesystem.js < query string >
  */

var fs = require('fs');
var colors = require('colors');
var file = process.argv[2];

//async read
fs.readFile(file, function(error, data){
    if(error){
        return console.log(Error(error));
    } else {
        console.log(colors.blue('async read of file: ') + data.toString());
    }
});

//synchronous file read

var data = fs.readFileSync(file);
console.log(colors.green('sync read of file: ') + data.toString());

// end file indicator
console.log(colors.red('end of program'));