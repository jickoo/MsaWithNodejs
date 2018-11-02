var plugin = function (options) {
    var seneca = this;

    seneca.add({area: "product", action: "hello"}, function (args, done) {
        console.log('hello');
        done();
    });

    /**
     * Fetch the list of all the products.
     */
    seneca.add({area: "product", action: "fetch"}, function (args, done) {
        var products = this.make("products");
        products.list$({}, done);
    });

    /**
     * Fetch the list of products by category.
     */
    seneca.add({area: "product", action: "fetch", criteria: "byCategory"}, function (args, done) {
        var products = this.make("products");
        products.list$({category: args.category}, done);
    });

    /**
     * Fetch a product by id.
     */
    seneca.add({area: "product", action: "fetch", criteria: "byId"}, function (args, done) {
        var product = this.make("products");
        product.load$(args.id, done);
    });

    /**
     * Adds a product.
     */
    seneca.add({area: "product", action: "add"}, function (args, done) {
        var products = this.make("products");
        products.category = args.category;
        products.name = args.name;
        products.description = args.description;
        products.category = args.category;
        products.price = args.price
        products.save$(function (err, product) {
            done(err, products.data$(false));
        });
    });

    /**
     * Removes a product by id.
     */
    seneca.add({area: "product", action: "remove"}, function (args, done) {
        var product = this.make("products");
        product.remove$(args.id, function (err) {
            done(err, null);
        });
    });

    /**
     * Edits a product fetching it by id first.
     */
    seneca.add({area: "product", action: "edit"}, function (args, done) {
        seneca.act({area: "product", action: "fetch", criteria: "byId", id: args.id}, function (err, result) {
            result.data$(
                {
                    name: args.name,
                    category: args.category,
                    description: args.description,
                    price: args.price
                }
            );
            result.save$(function (err, product) {
                done(err, product.data$(false));
            });
        });
    });

    this.add('init:product', function(msg, respond) {
        seneca.act('role:web', {
            routes: {
                use: {
                    prefix: '/products',
                    pin: 'area:product,action:*',
                    map: {
                        hello: {GET: true},
                        fetch: {GET: true},
                        edit: {GET: false, POST: true},
                        delete: {GET: false, DELETE: true}
                    }
                }
            }
        }, respond)
    })
};
module.exports = plugin;


var seneca = require("seneca")();
const SenecaWeb = require('seneca-web');
const Express = require('express');

var seneca = require('seneca')();
seneca.use('entity');
seneca.use('mongo-store', {
    uri: 'mongodb://127.0.0.1:27017/seneca'
});


seneca.use(SenecaWeb, {
    context: Express(),
    adapter: require('seneca-web-adapter-express')
});
seneca.use(plugin);
seneca.client( { type:'tcp', pin:'role:web' } )
seneca.ready(function (err) {
    //
    //seneca.act('role:web',{use:{
    //  prefix: '/products',
    //  pin: "area:'product',action:'*'",
    //  map:{
    //    fetch: {GET:true},
    //    edit: {GET:false,POST:true},
    //    delete: {GET: false, DELETE: true}
    //  }
    //}});
    const app = seneca.export('web/context')();
    app.listen(3000)

});


// http://localhost:3000/products/edit
//                         name: args.name,
//category: args.category,
//    description: args.description,
//    price: args.price
