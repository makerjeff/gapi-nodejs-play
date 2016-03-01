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

    app.get('/api/getTweets/', function(request, response){

        var responseArray = [];

        responseArray.push({"name":"jeff", "title":"creative technologist"});
        responseArray.push({"name":"shirley", "title":"teacher"});

        console.log('Route getTweets5 works.');

        response.type('text/plain');
        response.send(responseArray);

    });



    // ===== RETURN TWEETS as
    app.get('/api/getTweets/:search', function(request, response){

        var dataGrabbed = searchTweets(request.params.search);
        //the data gets grabbed just fine...
        console.log(dataGrabbed);

        //let's try converting...
        var responseString = JSON.stringify(dataGrabbed);

        //but the response doesn't come through... why?
        response.type('text/plain');
        response.send(responseString);

    });

    // =========== TESTER ============
    app.get('/api/debug3/', function(request, response){

        var data = {"statuses":[{"metadata":{"iso_language_code":"en","result_type":"recent"},"created_at":"Tue Feb" +
        " 23 00:12:22 +0000 2016","id":701922511865270273,"id_str":"701922511865270273","text":"Another post, this" +
        " time with URLs and other a photo. https:\/\/t.co\/FXA5GQn0V1.  #somethingsomethingwoneighty https:\/\/t.co\/pLr3DIPQev","source":"\u003ca href=\"http:\/\/twitter.com\/download\/android\" rel=\"nofollow\"\u003eTwitter for Android\u003c\/a\u003e","truncated":false,"in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":null,"in_reply_to_user_id_str":null,"in_reply_to_screen_name":null,"user":{"id":2984566482,"id_str":"2984566482","name":"Jeff Wu","screen_name":"MakerJeffWu","location":"Los Angeles","description":"I'm a creative technologist with roots in film, 3d design, and visual effects.","url":"https:\/\/t.co\/qGPEW5i1rq","entities":{"url":{"urls":[{"url":"https:\/\/t.co\/qGPEW5i1rq","expanded_url":"http:\/\/jeffersonwu.com","display_url":"jeffersonwu.com","indices":[0,23]}]},"description":{"urls":[]}},"protected":false,"followers_count":1,"friends_count":10,"listed_count":0,"created_at":"Thu Jan 15 21:38:56 +0000 2015","favourites_count":0,"utc_offset":-28800,"time_zone":"Pacific Time (US & Canada)","geo_enabled":true,"verified":false,"statuses_count":12,"lang":"en","contributors_enabled":false,"is_translator":false,"is_translation_enabled":false,"profile_background_color":"C0DEED","profile_background_image_url":"http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png","profile_background_image_url_https":"https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png","profile_background_tile":false,"profile_image_url":"http:\/\/abs.twimg.com\/sticky\/default_profile_images\/default_profile_2_normal.png","profile_image_url_https":"https:\/\/abs.twimg.com\/sticky\/default_profile_images\/default_profile_2_normal.png","profile_link_color":"0084B4","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"has_extended_profile":false,"default_profile":true,"default_profile_image":true,"following":false,"follow_request_sent":false,"notifications":false},"geo":{"type":"Point","coordinates":[34.0089579,-118.4918249]},"coordinates":{"type":"Point","coordinates":[-118.4918249,34.0089579]},"place":{"id":"07d9db3ac3484000","url":"https:\/\/api.twitter.com\/1.1\/geo\/id\/07d9db3ac3484000.json","place_type":"poi","name":"180LA","full_name":"180LA","country_code":"US","country":"United States","contained_within":[],"bounding_box":{"type":"Polygon","coordinates":[[[-118.49194765090942,34.009020541962336],[-118.49194765090942,34.009020541962336],[-118.49194765090942,34.009020541962336],[-118.49194765090942,34.009020541962336]]]},"attributes":{}},"contributors":null,"is_quote_status":false,"retweet_count":0,"favorite_count":0,"entities":{"hashtags":[{"text":"somethingsomethingwoneighty","indices":[79,107]}],"symbols":[],"user_mentions":[],"urls":[{"url":"https:\/\/t.co\/FXA5GQn0V1","expanded_url":"http:\/\/www.180la.com","display_url":"180la.com","indices":[53,76]}],"media":[{"id":701922497478860801,"id_str":"701922497478860801","indices":[108,131],"media_url":"http:\/\/pbs.twimg.com\/media\/Cb26yuIVIAExVhh.jpg","media_url_https":"https:\/\/pbs.twimg.com\/media\/Cb26yuIVIAExVhh.jpg","url":"https:\/\/t.co\/pLr3DIPQev","display_url":"pic.twitter.com\/pLr3DIPQev","expanded_url":"http:\/\/twitter.com\/MakerJeffWu\/status\/701922511865270273\/photo\/1","type":"photo","sizes":{"medium":{"w":1200,"h":675,"resize":"fit"},"small":{"w":680,"h":383,"resize":"fit"},"large":{"w":1600,"h":900,"resize":"fit"},"thumb":{"w":150,"h":150,"resize":"crop"}}}]},"favorited":false,"retweeted":false,"possibly_sensitive":false,"lang":"en"}],"search_metadata":{"completed_in":0.018,"max_id":701922511865270273,"max_id_str":"701922511865270273","query":"somethingsomethingwoneighty","refresh_url":"?since_id=701922511865270273&q=somethingsomethingwoneighty&include_entities=1","count":10,"since_id":0,"since_id_str":"0"}};

        response.type('text/plain');
        response.send(JSON.stringify(data));
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