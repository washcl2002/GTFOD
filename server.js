// API Server Key: AIzaSyCoQIPeDbqh72lEMuOH2yk663xzw-LYJWw
var express = require('express');
var app = express();
var http = require('http');
var concat = require("concat-stream");
var request = require('request');
var bodyParser = require('body-parser');

app.use(express.static(__dirname+'/public'));
// app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/api", function(req, res){
  console.log("Hello");
  req = {
      request: {
        passengers: {
            adultCount: 1
        },
        slice: [
          {
              origin: "BOS",
              destination: "LAX",
              date: "2015-12-20"
            },
            {
              origin: "LAX",
              destination: "BOS",
              date: "2015-12-23"
            } 
        ]
      }
  }

  request.post({
    url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCoQIPeDbqh72lEMuOH2yk663xzw-LYJWw",
    body: req,
    json: true,
    }, function (error, response, body){
      // console.log(response.statusCode);
      // console.log(body);
      res.json(body);
    });
  
  // http.post("https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCoQIPeDbqh72lEMuOH2yk663xzw-LYJWw", 
  //  function (response){
  //    console.log(response);
  //    response.pipe(concat(function (data){
  //      console.log(data.toString());
  //      res.json(JSON.parse(data));
  //    }))     
  //  })

});

  // var options = {
  //   hostname: "www.googleapis.com",
  //   port: 3000,
  //   path: "/qpxExpress/v1/trips/search?key=AIzaSyCoQIPeDbqh72lEMuOH2yk663xzw-LYJWw",
  //   method: "POST"
  // };
  // console.log("here?");

  // var reqq = http.request(options, function(res){
  //   console.log("getting here?");
  //   console.log(res.statusCode);
  //   console.log(JSON.stringify(res.headers));
  //   res.on("data", function(chunk){
  //     console.log(chunk);
  //   });
  //   res.on("end", function(){
  //     console.log("allllllll dooooooonnnnnee");
  //   });
  // });

  // reqq.end();

app.listen(3000);

app.get("*", function(req, res) {
  res.sendfile('./public/index.html'); //load single view file
});