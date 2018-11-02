module.exports = function api(options) {

    var valid_ops = {sum: 'sum', product: 'product'}

    this.add('role:api,cmd:index', function (msg, respond) {
        respond(null,{message:'"Hello, World!"'});
    })


    this.add('init:api', function (msg, respond) {
        console.log("!!!!!!!! init");
        this.act('role:web', {
            routes: {
                prefix: '/my-api',
                pin: 'role:api,cmd:*',
                map:{
                    index: {GET: true}
                }
            }
        }, respond)
    })
};