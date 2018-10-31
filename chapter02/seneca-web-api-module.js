module.exports = function api(options) {

    var valid_ops = {sum: 'sum', product: 'product'}

    this.add('role:api,cmd:bazinga', function (msg, respond) {
        respond(null,{bar:"Bazinga!"});
    })


    this.add('init:api', function (msg, respond) {
        this.act('role:web', {
            routes: {
                prefix: '/my-api',
                pin: 'role:api,cmd:*',
                map:{
                    bazinga: {GET: true}
                }
            }
        }, respond)
    })
};