// API Server Key: AIzaSyCoQIPeDbqh72lEMuOH2yk663xzw-LYJWw
var express = require('express');
var app = express();
var http = require('http');
var concat = require("concat-stream");

app.use(express.static(__dirname+'/public')); 

app.get("/api", function(req, res){
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
        			date: "2015-11-25"
      			},
      			{
        			origin: "LAX",
        			destination: "BOS",
        			date: "2015-11-30"
      			}	
    		]
  		}
	}

	http.post("https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCoQIPeDbqh72lEMuOH2yk663xzw-LYJWw", 
		function (response){
			console.log(response);
			response.pipe(concat(function (data){
				console.log(data.toString());
				res.json(JSON.parse(data));
			}))
			
		})
})
app.listen(3000);

app.get("*", function(req, res) {
	res.sendfile('./public/index.html'); //load single view file
});