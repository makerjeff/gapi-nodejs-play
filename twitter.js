/**
 * Created by jefferson.wu on 2/17/16.
 */
    //ENVIRONMENT VARS / KEYS

    require('./dev_env.js');

    // MODULES
var Twitter = require('twitter');

// OBJECTS
var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

input('what is this?', whatIsThisVar);


// HELPER FUNCTIONS

/**
 * Dump current environment API keys to the console.
 */
function debugCurrentKeys(){
    console.log('consumer key: ' + process.env.CONSUMER_KEY);
    console.log('consumer secret: ' + process.env.CONSUMER_SECRET);
    console.log('access token key: ' + process.env.ACCESS_TOKEN_KEY);
    console.log('access token secret: ' + process.env.ACCESS_TOKEN_SECRET);
}