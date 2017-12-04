var request = require('request');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var unescape = require('unescape');


router.get('/', function(req, res, next) {
    res.render('Results', { title: 'Welcome to Mood Square' });
});

router.post('/',function(req, res, next) {
module.exports = function (username, cb) {

    var url = 'https://twitter.com/' + username;

    // oh yeah //extreme fragility//
    if (process.browser) {
        url = 'http://cors.io/?' + url
    }

    request(url, function (err, res, body) {
        if (err) {
            cb(err)
        } else {
            var rest = [];

            var doc = new dom({errorHandler: function() {}}).parseFromString(body);

            var tweets = xpath.select('//li[contains(@class, \'js-stream-item\')]', doc);

            tweets.forEach(function (n) {
                var tweet = xpath.select('./div[contains(@class, \'tweet\')]/div[contains(@class, \'content\')]', n)[0];
                if (!tweet) {
                    // bad tweet?
                    return
                }
                var header = xpath.select('./div[contains(@class, \'stream-item-header\')]', tweet)[0];
                var body = xpath.select('*/p[contains(@class, \'tweet-text\')]/text()', tweet)[0];
                var fullname = xpath.select('./a/strong[contains(@class, "fullname")]/text()', header)[0];
                if (body) body = nodeToText(body);
                var item = {
                    username: '@' + xpath.select('./a/span[contains(@class, \'username\')]/b/text()', header)[0].data,
                    body: body,
                    fullname: fullname ? fullname.data : '',
                    avatar: xpath.select('./a/img[contains(@class, "avatar")]/@src', header)[0].value,
                    url: 'https://twitter.com' + xpath.select('./small[contains(@class, "time")]/a[contains(@class, "tweet-timestamp")]/@href', header)[0].value,
                    timestamp: xpath.select('./small[contains(@class, "time")]/a[contains(@class, "tweet-timestamp")]/span/@data-time', header)[0].value
                };

                var date = new Date(1970, 0, 1);
                date.setSeconds(item.timestamp);
                item.timestamp = date.toISOString();

                rest.push({
                    username: item.username,
                    fullname: item.fullname,
                    retweet: item.username.toLowerCase() !== '@'+username.toLowerCase(),
                    url: item.url,
                    content: item.body,
                    date: date
                })
            });

            cb(null, rest)
        }
    })
};

function unescapeHarder (txt) {
    return unescape(txt)
        .replace('&nbsp;', ' ')
        .replace('…', '')
        .replace('\\n', ' ')
        .replace('http', ' http')
}

function nodeToText (node) {
    if (!node) {
        return ''
    }
    return unescapeHarder(node.nodeValue || '')
        + nodeToText(node.firstChild)
        + nodeToText(node.nextSibling)
};

var parseTweet = function(tweetText) {
    var hasher, reguri, regusername;
    reguri = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*))/g;
    regusername = /([@]+([A-Za-z0-9-_]+))/g;
    reghash = /[#]+([A-Za-z0-9-_]+)/g;
    tweetText = tweetText.replace(reguri, "<a href='$1' target='_blank'>$1</a>");
    tweetText = tweetText.replace(regusername, "<a href='http://twitter.com/$2' target='_blank'>$1</a>");
    tweetText = tweetText.replace(reghash, "<a href='http://twitter.com/search?q=%23$1' target='_blank'>#$1</a>");
    return tweetText;
};