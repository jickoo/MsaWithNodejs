var seneca = require('seneca')().use('entity').use('employees-storage');

var employee =  {
    name: "David",
    surname: "Gonzalez",
    position: "Software Developer"
};

let retId;

function add_employee() {
    seneca.act({role: 'employee', cmd: 'add', data: employee}, function (err, msg) {
        console.log(msg);
        retId = msg.id;
    });
}

add_employee();

(() => {
    setTimeout(function () {
        seneca.act({role: 'employee', cmd: 'get', data: retId}, function (err, msg) {
            console.log(msg);
        });

        console.log('find!!!!');
    }, 1000);

})();