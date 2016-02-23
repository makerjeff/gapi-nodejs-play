/**
 * BASE64_SERVER.JS *EXPERIMENTAL*
 * BASE 64 FILE TRANSFER EXPRESS SERVER 0.1
 * Updated by jefferson.wu on 2016.FEB.23.
 */
//ENVIRONMENT VARS / KEYS
require('./dev_env.js');

//server version
var serverVersion = '0.1';

// ===== MODULES =====
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var colors = require('colors');
var favicon = require('serve-favicon');
var Twitter = require('twitter');



// ===== GLOBALS =====
var app = express();        //init express
var port = process.argv[2]; //input port at launch

// ===== TWITTER SPECIFIC =====
var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});



// ===== MIDDLEWARE =====

//enable CORS
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//serve favicon
app.use(favicon(__dirname + '/public/favicon.ico'));
//serve static files
app.use(express.static(__dirname + '/public'));

// = logs to node console with every transaction
//TODO Make this log to local file.
app.use(function(request, response, next){
    console.log('%s %s %s %s', request.method, request.url, request.path, colors.yellow(Date().toString()));
    next();
});

// enable JSON parsing of POST requests
app.use(bodyParser.json());

// ===== EXPRESS ROUTES =====
initDebugRoutes();


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
    //console message
    console.log(colors.rainbow(' Starting ') + colors.yellow('TWITTER EXPRESS SERVER ') + colors.blue(serverVersion) + colors.rainbow(' on ') + port + colors.rainbow(' on a ') + process.arch + colors.rainbow(' machine.'));

    //open port on defined port, if nothing is available, default to 8000.
    app.listen(port || 3000);
}

/**
 * Initializes all the DEBUG routes, acts as template to all other routes.
 */
function initDebugRoutes(){
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
}

/**
 * Define and initialize all the TWITTER routes
 */
function initTwitterRoutes(){

//first test twitter route
    app.get('/tweest', function(request, response){
        var tweestObject = [
            {'name':'jeff', 'title':'creative technologist'},
            {'name':'stephen', 'title':'executive producer'},
            {'name':'helena', 'title':'digital producer / project manager / trafficker / qa'},
            {'name':'ryan', 'title':'senior digital producer'},
            {'name':'chianne', 'title':'digital producer'}
        ];

        response.type('text/html');
        response.send(JSON.stringify(tweestObject));

    });

}


// TWITTER FUNCTIONS
/**
 * Dump current environment API keys to the console.
 */
function debugCurrentKeys(){
    console.log('consumer key: ' + process.env.CONSUMER_KEY);
    console.log('consumer secret: ' + process.env.CONSUMER_SECRET);
    console.log('access token key: ' + process.env.ACCESS_TOKEN_KEY);
    console.log('access token secret: ' + process.env.ACCESS_TOKEN_SECRET);
}

function searchTweets(){
    console.log('searching for: ' + query + '...');

    client.get('search/tweets',{q:query, count:3, include_entities: true} ,function(error, tweets, response){
        if(error) {
            throw error;
        } else {
            console.log(tweets);
            //console.log(response);
        }
    });
}