

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
    .listen(3002)

var seneca = require('seneca')()
    .use(SenecaWeb, senecaWebConfig)
    .use('order-module')
    .use('entity')
    .use('mongo-store', {
        uri: 'mongodb://127.0.0.1:27017/seneca'
    })
    .client( { type:'tcp', pin:'role:web' } );
