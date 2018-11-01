var nodemailer = require('nodemailer');

var mandrillTransport = require('nodemailer-mandrill-transport');

var transport = nodemailer.createTransport(mandrillTransport({
    auth: {
        apiKey: '6eab3cbc877a68e6287b84b103a40018'
    }
}));

var plugin = function(options) {
    var seneca = this;

    /**
     * Sends an email using a template email.
     */
    seneca.add({area: "email", action: "send", template: "*"}, function(args, done) {
        console.log("sending");
        done(null, args);

        var message = {
            "subject": args.subject,
            "to": [{
                "email": args.to,
                "name": args.toName,
                "type": "to"
            }],
            "from_email": "info@micromerce.com",
            "from_name": "Micromerce",
            "global_merge_vars": args.vars,
        }
        //
        //transport.sendMail({
        //    from: 'christiron@naver.com',
        //    to: 'christiron@naver.com',
        //    subject: 'Hello',
        //    html: '<p>How are you?</p>'
        //}, function(err, info) {
        //    if (err) {
        //        console.error(err);
        //    } else {
        //        console.log(info);
        //        done(info, null);
        //    }
        //});


        //mandrillClient.messages.sendTemplate(
        //    {"template_name": args.template, "template_content": {}, "message": message},
        //function(result) {
        //    done(null, {status: result.status});
        //}, function(e) {
        //    done({code: e.name}, null);
        //});
    });
    
    /**
     * Sends an email including the content.
     */
    seneca.add({area: "email", action: "send", cc: "*"}, function(args, done) {
        console.log("sending with cc");
        done(console.log(args.subject));

        var message = {
            "html": args.content,
            "subject": args.subject,
            "to": [{
                "email": args.to,
                "name": args.toName,
                "type": "to"
            },{
                "email": args.cc,
                "name": args.ccName,
                "type": "cc"
            }],
            "from_email": "info@micromerce.com",
            "from_name": "Micromerce"
        };

        //transport.sendMail({
        //    from: 'christiron@naver.com',
        //    to: 'christiron@naver.com',
        //    subject: 'Hello',
        //    html: '<p>How are you?</p>'
        //}, function(err, info) {
        //    if (err) {
        //        console.log('error');
        //        console.error(err);
        //    } else {
        //        console.log(info);
        //        done(info, null);
        //    }
        //});
        //mandrillClient.messages.send({"message": message}, function(result) {
        //    done(null, {status: result.status});
        //}, function(e) {
        //    done({code: e.name}, null);
        //});
    });
};
module.exports = plugin;

var seneca = require("seneca")();
seneca.use(plugin);
seneca.act({area: "email", action: "send", cc: "christiron@naver.com", subject: "The Subject", to: "test@test.com", toName: "Test Testingtong"}, function(err, result){
    console.log(err);
    console.log(result);
});
