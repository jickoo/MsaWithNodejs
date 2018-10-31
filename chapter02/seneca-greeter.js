const seneca = require('seneca')();

seneca.add({component: 'greeter'}, (msg, respond) => {
    respond(null, {message: 'Hello ' + msg.name});
});

seneca.act({component: 'greeter', name: 'David'}, (error, response) => {
    if (error) {
        return console.log(error);
    } else {
        console.log(response.message);
    }
});