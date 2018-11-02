var senecaEmailer = require("seneca")().client({host: "127.0.0.1", port: 3001});

module.exports = function order(options) {
    var seneca = this;

    seneca.add('area: orders,action: fetch', function(args, done) {
        var orders = this.make("orders");
        orders.list$({id: args.id}, done);
    });

    seneca.add('area:orders,action:delete', function(args, done) {
        var orders = this.make("orders");
        orders.remove$({id: args.id}, function(err) {
            done(err, null);
        });
    });

    seneca.add('area:orders,action:create', function(args, done) {
        var products = args.products;
        var total = 0.0;
        products.forEach(function(product){
            total += product.price;
        });
        var orders = this.make("orders");
        orders.total = total;
        orders.customer_email = args.email;
        orders.customer_name = args.name;
        orders.save$(function(err, order) {
            var pattern = {
                area: "email",
                action: "send",
                template: "new_order",
                to: args.email,
                toName: args.name,
                vars: {
                    // variable
                }
            }
            senecaEmailer.act(pattern, done);
        });
    });

    seneca.add('init:order', (msg, respond) => {
        seneca.act('role:web', {
            routes: {
                prefix: '/order',
                pin: 'area:orders,action:*',
                map: {
                    fetch: {GET:true},
                    delete: {POST: true},
                    create: {GET:true, POST:true}
                }
            }
        }, respond);
    });
}
