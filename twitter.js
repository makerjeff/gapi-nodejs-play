/**
 * Created by jefferson.wu on 2/17/16.
 * Updated 2016.FEB.29: dumping returned stuff to text file
 */
//ENVIRONMENT VARS / KEYS

    require('./dev_env.js');

// MODULES
var Twitter = require('twitter');
var fs = require('fs');

// OBJECTS
var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

// ===== MAIN LOOP SECTION =====

var count = 0;
var query = process.argv[2];
var responseObj = {};

////object.stream(<method:string>, <{params:object}>, <callback:function>
//client.stream('statuses/filter', {track: 'sxsw'}, function(stream){
//
//    stream.on('data', function(data){
//        //debug
//        console.log(data);
//        //kill the stream
//        stream.destroy();
//        //end node
//        //process.exit(0);
//
//    });
//
//    //error handling
//    stream.on('error', function(error){
//        console.log(Error(error));
//    });
//});

searchTweets(query);



// ===== HELPER FUNCTIONS =====

/**
 * Dump current environment API keys to the console.
 */
function debugCurrentKeys(){
    console.log('consumer key: ' + process.env.CONSUMER_KEY);
    console.log('consumer secret: ' + process.env.CONSUMER_SECRET);
    console.log('access token key: ' + process.env.ACCESS_TOKEN_KEY);
    console.log('access token secret: ' + process.env.ACCESS_TOKEN_SECRET);
}

function searchTweets(searchMe){
    console.log('searching for: ' + searchMe + '...');

    client.get('search/tweets',{q:searchMe, count:10, include_entities: true} ,function(error, tweets, response){
        if(error) {
            throw error;
        } else {
            console.log(JSON.parse(response.body));
            //console.log(response);
        }

        dumpTextToFile(response.body.toString());
    });
}

function dumpTextToFile(obj){
    fs.appendFile('server-log.txt', obj, function(error){
        if(error){
            return console.log(Error(error));
        }
    });
}
