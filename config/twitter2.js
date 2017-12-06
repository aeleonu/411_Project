//const mongoose = require('mongoose')
//const User = require('../models/UserWithCrypto')

//if (!mongoose.connection.db){
//    mongoose.connect('mongodb://127.0.0.1/cs411')
//}

//people.find({_id: req.param('_id')}, function (err, results) {
//    res.json(results);
//});
//console.log(results)

//key = a["username"]
//console.log(a)
//'name':{"$exists":true}},{'name':1})


const Twitter = {
    CONSUMER_KEY: '9ZvgVZ4Ashf1GryWilyxxoL8M',
    CONSUMER_SECRET: 'xXuTaltArYcWmSht3CBew47ep2ZGQ3ra0NCGnFOeTKIQzMjM7x',
    OWNER_ID: '2752493710',
    CALLBACK_URL: 'http://127.0.0.1:3000/auth/callback',
    REQ_TOKEN_URL: 'https://api.twitter.com/oauth/request_token',
    AUTHORIZE_URL: 'https://api.twitter.com/oauth/authorize',
    ACCESS_TOKEN_URL: 'https://api.twitter.com/oauth/access_token',
    access_token_key: 	'2752493710-PvjfDDXRGbWbVABlCXd6Waxa0n1dIh8JAfVvzMn',
    access_token_secret: 'Mlty0erFYK2pTv4Rg5Lgo3VpFeMUMkqaKLnJIpFl3WohO',
    key: '938282281340424192'
}

module.exports = Twitter