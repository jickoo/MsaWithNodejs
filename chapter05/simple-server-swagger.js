const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/hello', function(req, res) {
    console.log('call hello');
    let name = '';
    if (req.name) {
        name = req.name;
    }
    res.send('"Hello, ' + name);
});

app.get('/fine', function(req, res) {
    console.log('call fine');
    res.send('Thank you');
});


app.use('/v1/swagger.json', function(req, res) {
    //res.json(require('./swagger.json'));
    res.json({v1:'json'});
});

//app.use('/swagger-ui', express.static(path.join(__dirname, './node_modules/swagger-ui/dist')));
app.use('/swagger-ui', express.static(path.join(__dirname, './node_modules/swagger-ui-dist')));

app.listen(3000, function() {
    console.log("app started in port 3000");
});

