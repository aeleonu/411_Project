/*
 Configuration information for Twitter API authorization. DO NOT push this to github
 Note: rename this file to twitter.js to match the require AND move to /config folder
 */

const Twitter = {
    CONSUMER_KEY: '9ZvgVZ4Ashf1GryWilyxxoL8M',
    CONSUMER_SECRET: 'xXuTaltArYcWmSht3CBew47ep2ZGQ3ra0NCGnFOeTKIQzMjM7x',
    OWNER_ID: '2752493710',
    CALLBACK_URL: 'http://127.0.0.1:3000/auth/callback',
    REQ_TOKEN_URL: 'https://api.twitter.com/oauth/request_token',
    AUTHORIZE_URL: 'https://api.twitter.com/oauth/authorize',
    ACCESS_TOKEN_URL: 'https://api.twitter.com/oauth/access_token'
}

module.exports = Twitter