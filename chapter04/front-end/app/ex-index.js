
var senecaProductManager = require("seneca")().client({
    type:'tcp'
    , host:'localhost'
    , port:3000
    , timeout: 10000
    //, pin: 'role:web'
});

var senecaEmailer = require("seneca")().client({
    host: "localhost",
    port: 3001
});

var senecaOrderProcessor = require("seneca")().client({
    host: "localhost",
    port: 3002

});

function api(options) {
    var seneca = this;
    
    /**
     * Gets the full list of products.
     */
    seneca.add('area:ui,action:products', function(args, done) {
        console.log(senecaProductManager);
        senecaProductManager.act('area:product,action:fetch', function(err, result) {
            console.log('products/fetch');
            done(err, result);
        });
    });
    
    /**
     * Get a product by id.
     */
    seneca.add('area:ui,action:productbyid', function(args, done) {
        senecaProductManager.act({area: "product", action: "fetch", criteria: "byId", id: args.id}, function(err, result) {
            done(err, result);
        });
    });
    
    /**
     * Creates an order to buy a single prodct.
     */
    seneca.add('area:ui,action:createorder', function(args, done) {
        senecaProductManager.act({area: "product", action: "fetch", criteria: "byId", id: args.id}, function(err, product) {
            if(err) done(err, null);
            senecaOrderProcessor.act({area: "orders", action: "create", products: [product], email: args.email, name: args.name}, function(err, order) {
                done(err, order);
            });
        });
    });

    seneca.add("init:api", function(msg, respond){
        seneca.act('role:web',{
            routes: {
                prefix: '/api',
                pin:    'area:ui,action:*',
                map: {
                  products:    {GET:true}    ,
                  productbyid: {GET:true, suffix:'/:id'},
                  createorder: {POST:true}
                }
        }}, respond)
    });
}
module.exports = api;

const SenecaWeb = require('seneca-web')
const Express = require('express')
const Router = Express.Router
const context = new Router()

const senecaWebConfig = {
    context: context,
    adapter: require('seneca-web-adapter-express'),
    options: { parseBody: false } // so we can use body-parser
}

const app = Express()
    .use( require('body-parser').json() )
    .use( context )
    .listen(4000)

var seneca = require('seneca')()
    .use(SenecaWeb, senecaWebConfig)
    .use(api)
    .client( { type:'tcp', pin:'role:web' } );
