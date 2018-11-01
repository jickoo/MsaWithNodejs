var seneca = require('seneca')();
//seneca.use("basic");
seneca.use("entity");

seneca.use('mongo-store', {
    name: 'seneca',
    host: '127.0.0.1',
    port: 27017,
    options: {}
})


seneca.ready(function () {
    var apple = seneca.make$('fruit')
    apple.name = 'Pink Lady'
    apple.price = 0.99
    apple.save$(function (err, apple) {
        console.log("apple.id = " + apple.id)
    })
})

