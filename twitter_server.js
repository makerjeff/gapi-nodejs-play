/**
 * TWITTER_SERVER.JS
 * TWITTER EXPRESS SERVER 0.1d
 * Updated by jefferson.wu on 2016.FEB.29.
 *
 * changeLog:
 * 2016.FEB.29:
 * - making body parser use more memory
 * 2016.FEB.24:
 * - more routes, more fixes.
 * 2016.FEB.23:
 * - re-arranging
 * 2016.FEB.19:
 * - enabled CORS
 * - added time stamp
 * 2016.FEB.18:
 * - implementing twitter API data grab
 */
//ENVIRONMENT VARS / KEYS
require('./dev_env.js');

//server version
var serverVersion = '0.1d';

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

var twitterObject = {};     //store the twitter search results

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

//serve static files & favicon
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

// = logs to node console with every transaction
//TODO Make this log to local file.
app.use(function(request, response, next){
    console.log('%s %s %s %s', request.method, request.url, request.path, colors.yellow(Date().toString()));
    next();
});

// enable JSON parsing of POST requests
//TODO pass in config limit '{limit: '5mb'}'
app.use(bodyParser.json());

//app.use(bodyParser.json({limit:'5mb'}));
//app.use(bodyParser.urlencoded({limit: '5mb'}));

// ===== EXPRESS ROUTES =====
initDebugRoutes();
initTwitterRoutes();


// basic 404 catch-all middleware
app.get('*', function(request, response){
    response.sendFile(__dirname + '/public/404.html');
});

// ===== MAIN LOGIC =====
startServer();


// ===== FUNCTION DEFINITIONS =====
/**
 * Starts the EXPRESS server on the defined global port.
 */
function startServer() {
    //console message
    console.log(colors.rainbow(' Starting ') +
        colors.yellow('TWITTER EXPRESS SERVER ') +
        colors.blue(serverVersion) +
        colors.rainbow(' on ') +
        port +
        colors.rainbow(' on a ') +
        process.arch +
        colors.rainbow(' machine.'));

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
 * Initialize Twitter related routes
 */
function initTwitterRoutes(){
    //first twitter route
    app.get('/tweest', function(request, response){
        var tweestArray = [
            {'name':'jeff', 'title':'creative technologist'},
            {'name':'stephen', 'title':'executive producer'},
            {'name':'helena', 'title':'digital producer / project manager / trafficker / qa'},
            {'name':'ryan', 'title':'senior digital producer'},
            {'name':'chianne', 'title':'digital producer'}
        ];

        response.type('text/html');
        response.json(JSON.stringify(tweestArray));
    });

//second twitter route
    app.get('/tweest2', function(request, response){
        var tweestArray = [
            {'name':'jeff', 'title':'creative technologist'},
            {'name':'stephen', 'title':'executive producer'},
            {'name':'helena', 'title':'digital producer / project manager / trafficker / qa'},
            {'name':'ryan', 'title':'senior digital producer'},
            {'name':'chianne', 'title':'digital producer'}
        ];

        response.type('application/json');
        response.json(tweestArray);
    });

    app.get('/api/getTweets5/', function(request, response){

        var responseArray = [];

        responseArray.push({"name":"jeff", "title":"creative technologist"});
        responseArray.push({"name":"shirley", "title":"teacher"});

        console.log('Route getTweets5 works.');

        response.type('text/plain');
        response.send(responseArray);

        //TODO - CONTINUE HERE

    });

    app.get('/api/getTweets5/:search', function(request, response){

        var responseArray = [];

        responseArray.push({"name":"jeff", "title":"creative technologist"});
        responseArray.push({"name":"shirley", "title":"teacher"});

        console.log('Route getTweets5 works.');

        response.type('text/plain');
        response.send(responseArray);

        //TODO - CONTINUE HERE

    });





    // ===== RETURN TWEETS as
    app.get('/api/getTweets/:search', function(request, response){

        var dataGrabbed = searchTweets(request.params.search);
        console.log(dataGrabbed);

        //response.type('text/plain');
        response.json(dataGrabbed);

    });

    // ===== RETURN TWEETS as
    app.get('/api/getTweet5/:search', function(request, response){

        var dataGrabbed = request.params.search;
        console.log(dataGrabbed);

        //response.type('text/plain');
        response.json(dataGrabbed);

    });
}


// TWITTER FUNCTIONS
/**
 * DEBUG: Dump current environment API keys to the console.
 */
function debugCurrentKeys(){
    console.log('consumer key: ' + process.env.CONSUMER_KEY);
    console.log('consumer secret: ' + process.env.CONSUMER_SECRET);
    console.log('access token key: ' + process.env.ACCESS_TOKEN_KEY);
    console.log('access token secret: ' + process.env.ACCESS_TOKEN_SECRET);
}

/**
 * Search tweets
 * @param searchString Criteria to search (currently doesn't work with hashtag symbols).
 */
function searchTweets(searchString){
    console.log('searching for: ' + searchString + '...');

    client.get('search/tweets',{q:searchString, count:10, include_entities: true} ,function(error, tweets, response){

        if(error) {
            throw error;
        } else {
            twitterObject = JSON.parse(response.body);
            console.log(JSON.parse(response.body));
            //console.log(response);

            return twitterObject;
        }
    });
}