var express = require('express');
var router = express.Router();
var request = require('request');

var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Tweet Here' });
});

/* POST home page.*/


router.post('/',function(req, res, next) {
    var tweet = req.body.searchbox;

    var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

    var tone_analyzer = new ToneAnalyzerV3({
        username: 'e97b0ab8-8b41-4a3c-b436-c56f7151df43',
        password: 'mkQYQSHcbDb3',
        version_date: '2016-05-19'
    });

    tone_analyzer.tone({ text: tweet },
        function(err, tone) {
            if (err)
                console.log(err);
            //else
                //console.log(tone)

            var emotions = {Anger:0, Disgust:0, Fear:0, Joy:0, Sadness:0, Confident:0, Tentative:0, Openness:0, Conscientiousness:0, Extraversion:0};
            var k = 0;
            var tone_nm = ""
            var emot_k = ""
            for (var i = 0; i < 3; i++){
                for (var j = 0; j < tone.document_tone.tone_categories[i].tones.length; j++){
                    tone_nm = tone.document_tone.tone_categories[i].tones[j].tone_name;
                    emot_k = Object.keys(emotions)[k];
                    if (emot_k === tone_nm) {
                        emotions[emot_k] = tone.document_tone.tone_categories[i].tones[j].score;
                        k++;
                    }
                }
            }
            //console.log(emotions)
            var imp_emotions = [];
            for (var l = 0; l < Object.keys(emotions).length; l++){
                if (emotions[Object.keys(emotions)[l]] >= 0.5){
                    imp_emotions.push(Object.keys(emotions)[l]);
                }
            }
            //console.log(imp_emotions)

            if (Object.keys(imp_emotions).length == 0){
                for (var k = 0; k < Object.keys(emotions).length; k++){
                    if (emotions[Object.keys(emotions)[k]] >= 0.3){
                        imp_emotions.push(Object.keys(emotions)[k]);
                    }
                }
                //console.log(imp_emotions);
            }




            if (Object.keys(imp_emotions).length == 0){
                var high_emot_key = "Anger";
                var high_emot_val = emotions.Anger;
                //console.log(high_emot_key, high_emot_val)
                for (var k = 1; k < Object.keys(emotions).length; k++){
                    if (emotions[Object.keys(emotions)[k]] > high_emot_val){
                        high_emot_key = Object.keys(emotions)[k];
                        high_emot_val = emotions[Object.keys(emotions)[k]];
                    }
                }
                imp_emotions.push(high_emot_key);
                //console.log(imp_emotions);
            }



            var cuisines_to_emotions = {Anger: ["Drinks Only", "Seafood", "Italian"], Disgust: ["Drinks Only"],
                Fear: ["Drinks Only"], Joy: ["Sushi", "Healthy Food"], Sadness: ["Drinks Only"],Confident:[],
                Tenative:["American","Burger","Cafe","Pizza","Steak"],Openness:["Arabian","Asian","Cuban",
                    "Czech","Greek","Indian","Japanese","Drinks Only","Sushi","Spanish","Mediterranean","Old Bohemian"],
                Extraversion:["Street Food"],Concientiousness:["Healthy Food"]};

            var allcuisines = [];
            for (var m = 0; m < imp_emotions.length; m++){
                for (var n = 0; n < Object.keys(cuisines_to_emotions).length; n++){
                    if (imp_emotions[m] == Object.keys(cuisines_to_emotions)[n]){
                        var cuisines_for_emotion = cuisines_to_emotions[Object.keys(cuisines_to_emotions)[n]]
                        for ( var p = 0; p < cuisines_for_emotion.length; p++){
                            allcuisines.push(cuisines_for_emotion[p])
                        }
                    }
                }
            }

            //console.log(allcuisines);

            var cuisines = [];
            cuisines = allcuisines.filter(function(elem, index, self){
                return index === self.indexOf(elem);
            })

            console.log(cuisines)


    var z_cuisines = {
      url: 'https://developers.zomato.com/api/v2.1/cuisines?city_id=289',
      headers: {
        'user-key' : '586018cf366b42e3e1e79aff01a6e1a8',
      },
        method: 'GET'
    };

    request(z_cuisines, function(error, response, body){
        if (error) throw new Error(error);
        //console.log(body)
        var jsonCuisines = JSON.parse(body);
        var cuisine_ids = [];
        //console.log(cuisines);
        for (var s = 0; s < cuisines.length; s++ ) {
            for (var t = 0; t < 110; t++) {
                var z_cuisine = jsonCuisines.cuisines[t].cuisine.cuisine_name;
                //console.log(z_cuisine)
                //console.log(cuisines[s])
                if (z_cuisine == cuisines[s]){
                    //console.log(jsonCuisines.cuisines[t].cuisine.cuisine_name)
                    cuisine_ids.push(jsonCuisines.cuisines[t].cuisine.cuisine_id);
                    //console.log(cuisine_ids)
                    break;

                }
            }
        }
        console.log(cuisine_ids);
        cuisine_s = '';
        for (var i = 0; i < cuisine_ids.length-1; i++){
            cuisine_s += cuisine_ids[i] + '%2C';
        }
        cuisine_s += cuisine_ids[cuisine_ids.length - 1];
        console.log(cuisine_s)

        var reslist = [];
        console.log("https://developers.zomato.com/api/v2.1/search?entity_id=289&entity_type=city&count=100&cuisines="
            + String(cuisine_s))
         var options = {
             url: 'https://developers.zomato.com/api/v2.1/search?entity_id=289&entity_type=city&count=100&cuisines='
             + String(cuisine_s),
             headers: {
                 'user-key': '2a6c5c905e4f10836e05be8dfa827278',

             },
             method: 'GET'
         };

    request(options, function (error, response, body) {

        if (error) throw new Error(error);
        console.log(body);
        var jsonData = JSON.parse(body);
        //var jsonData1 = JSON.parse(jsonData.restaurants);
        //var length = Object.keys(jsonData).length;
        var s = '';
        var reslist = [];
        for (var i = 0; i < jsonData.restaurants.length; i++) {
            //console.log(jsonData.restaurants[i].restaurant.name);
            reslist.push(jsonData.restaurants[i].restaurant.name);
            s+= jsonData.restaurants[i].restaurant.name + '<br>'
        };
        console.log(reslist);
        var rest = reslist[Math.floor(Math.random()*reslist.length)];
        console.log(rest);

        res.send(rest);
    });
    });
    });
});


module.exports = router;