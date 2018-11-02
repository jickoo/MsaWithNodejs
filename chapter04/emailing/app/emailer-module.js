module.exports = function emailer(options) {

    this.add('role:api,cmd:send', function (msg, respond) {

        respond(null,{result:'"sending mail"',message:msg});
    });

    this.add('role:api,cmd:sendQuery', function (msg, respond) {
        const query = msg.request$.query;
        const message = query.message;
        respond(null,{result:'"sending mail"',message:message});
    });


    this.add('init:emailer', function (msg, respond) {
        this.act('role:web', {
            routes: {
                prefix: '/emailer',
                pin: 'role:api,cmd:*',
                map:{
                    sendQuery: {GET: true},
                    send: {GET: true}
                }
            }
        }, respond)
    })
};
