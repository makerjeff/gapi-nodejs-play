/**
 * SERVER.JS
 * SPARTAN EXPRESS SERVER
 * Created by jefferson.wu on 1/7/16.
 */
// ===== MODULES =====
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var colors = require('colors');
var favicon = require('serve-favicon');

// ===== GLOBALS =====
var app = express();        //init express
var port = process.argv[2]; //input port at launch

// ===== MIDDLEWARE =====
//serve favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

//serve static files using express
app.use(express.static(__dirname + '/public'));

// = logs to node console with every transaction
//TODO Make this log to local file.
app.use(function(request, response, next){
    console.log('%s %s %s', request.method, request.url, request.path);
    next();
});

// enable JSON parsing of POST requests
app.use(bodyParser.json());

// ===== EXPRESS ROUTES =====

// default tester route
app.get('/debug', function(request, response){
    var randomNumber = Math.ceil(Math.random() * 100);
    response.type('text/plain');
    response.send('Express routes are working. Your lucky number of the moment is ' + randomNumber + '.');
});

app.get('/debug/:loc', function(request, response){
    var inputMessage = request.params.loc;
    response.type('text/html');
    response.send('Debug Route 2 also working. You typed, <b>"' + inputMessage + '".</b>');
});
//basic 404 to catch all at the end
app.get('*', function(request, response){
    response.sendFile(__dirname + '/public/404.html');
});

// ===== MAIN LOGIC =====
init();


// ===== FUNCTION DEFINITIONS =====
/**
 * Starts the EXPRESS server.
 *
 */
function init() {
    console.log(colors.rainbow(' Starting EXPRESS server on ' + port + ' on a ' + process.arch + ' machine.'));

    //open port on defined port, if nothing is available, default to 8000.
    app.listen(port || 8000);
}