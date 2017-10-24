var express = require('express');
var router = express.Router();
var request = require('request');

var app = express();
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
});

module.exports = router;
