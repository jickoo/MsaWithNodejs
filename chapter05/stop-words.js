
var _ = require('lodash');
var express = require('express');

var removeStopWords = require('./remove-stop-words')({bannedWords: ["kitten", "puppy", "parrot"]});

var app = express();

app.get('/filter', function(req, res) {
    console.log('call filter');
    removeStopWords(req.query.text, function(error, response){
      res.send(response);
    });
});

app.listen(3000, function() {
    console.log("app started in port 3000");
});
