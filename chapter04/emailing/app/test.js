var mandrill = require("mandrill-api/mandrill");
var mandrillClient = new mandrill.Mandrill("6eab3cbc877a68e6287b84b103a40018-us19");

mandrillClient.users.info({}, function(result){
    console.log(result);
}, function(e){
    console.log(e);
});
