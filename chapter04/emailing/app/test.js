var mandrill = require("mandrill-api/mandrill");
var mandrillClient = new mandrill.Mandrill("<MY-API>");

mandrillClient.users.info({}, function(result){
    console.log(result);
}, function(e){
    console.log(e);
});
