var seneca = require("seneca")()
			.use("email")
			.use("sms")
			.use("post");
//seneca.listen({port: 1932, host: "10.0.0.7"});
seneca.listen({port: 1932, host: "127.0.0.1"});

// interact with the existing email service using "seneca"

var senecaEmail = require("seneca")().listen({host: "10.25.209.39", port: 1932});

// interact with the new email service using "senecaEmail"
