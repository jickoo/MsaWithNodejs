module.exports = function product(options) {


    /**
     * Fetch the list of all the products.
     */
    this.add({area: "product", action: "fetch"}, function (args, done) {
        var products = this.make("products");
        products.list$({}, done);
    });

    /**
     * Fetch the list of products by category.
     */
    this.add({area: "product", action: "fetch", criteria: "byCategory"}, function (args, done) {
        var products = this.make("products");
        products.list$({category: args.category}, done);
    });

    /**
     * Fetch a product by id.
     */
    this.add({area: "product", action: "fetchById"}, function (args, done) {
        var product = this.make("products");
        const query = args.request$.query;

        product.load$(query.id, done);
    });

    /**
     * Adds a product.
     */
    this.add({area: "product", action: "add"}, function (args, done) {
        //console.log(args);
        const query = args.request$.query;
        console.log(query);

        var products = this.make("products");
        products.category = query.category;
        products.name = query.name;
        products.description = query.description;
        products.category = query.category;
        products.price = query.price
        products.save$(function (err, product) {
            done(err, products.data$(false));
        });
    });

    /**
     * Removes a product by id.
     */
    this.add({area: "product", action: "remove"}, function (args, done) {
        var product = this.make("products");
        product.remove$(args.id, function (err) {
            done(err, null);
        });
    });

    /**
     * Edits a product fetching it by id first.
     */
    this.add({area: "product", action: "edit"}, function (args, done) {
        this.act({area: "product", action: "fetch", criteria: "byId", id: args.id}, function (err, result) {
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

    this.add('area:product,action:hello', function (args, done) {
        console.log('hello');
        done();
    });

    this.add('init:product', function(msg, respond) {
        this.act('role:web', {
            routes: {
                prefix: '/products',
                pin: 'area:product,action:*',
                map: {
                    hello: {GET: true},
                    fetch: {GET: true},
                    fetchById: {GET: true},
                    edit: {GET: false, POST: true},
                    delete: {GET: false, DELETE: true},
                    add: {POST: true}
                }
            }
        }, respond)
    })
};