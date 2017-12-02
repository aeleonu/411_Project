var express = require('express');
var router = express.Router();
var request = require('request');

var app = express();

/* GET login page. */

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Moodsquare' });
});

router.post('/',function(req, res, next) {

    /* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Cuisine Search' });
});


    /* POST home page.*/
router.post('/',function(req, res, next) {
    var searchCuisines = req.body.searchbox;
    var options = {
      url:'https://developers.zomato.com/api/v2.1/search?entity_id=289&entity_type=city&q='+String(searchCuisines),
        headers: {
          'user-key' : '2a6c5c905e4f10836e05be8dfa827278',
        },
        method:'GET'
    };

    request(options, function (error, response, body) {

      if (error) throw new Error(error);
      //console.log(body);
      var jsonData = JSON.parse(body);
      //var jsonData1 = JSON.parse(jsonData.restaurants);
      //var length = Object.keys(jsonData).length;
      console.log(jsonData.results_found);
      var s = "";
      for (var i = 0; i<20;i++){
        var resName = jsonData.restaurants[i].restaurant.name;
        var resLocal = jsonData.restaurants[i].restaurant.location.address;
        var resCuisin = jsonData.restaurants[i].restaurant.cuisines;
        s += resName + ": ";
        s += resLocal + "<br>";
        s += "cuisines :" + resCuisin + "<br>";
      }
      //console.log(s);
      res.send(s);
      //console.log(jsonData);
    });




    var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

    var tone_analyzer = new ToneAnalyzerV3({
        username: 'e97b0ab8-8b41-4a3c-b436-c56f7151df43',
        password: 'mkQYQSHcbDb3',
        version_date: '2016-05-19'
    });

    tone_analyzer.tone({ text: ' A scarf rears a person before an approaching workload. Inside the corridor strains a vote. Why won\'t a heresy try under the adjusted season? Our poster hurries the spiritual past the cooking era. The substitute rescue waits for an ideal. A dumb supernatural crushes the shoulder without a miraculous detector. ' },
        function(err, tone) {
            if (err)
                console.log(err);
            else
                console.log(JSON.stringify(tone, null, 2));
        });

});


    module.exports = router;

