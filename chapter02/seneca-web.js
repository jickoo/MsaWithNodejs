// http://senecajs.org/getting-started/

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
    .listen(3000)

const seneca = require('seneca')()
    .use(SenecaWeb, senecaWebConfig )
    .use('seneca-web-api-module')
    .client( { type:'tcp', pin:'role:web' } )