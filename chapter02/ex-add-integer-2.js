const seneca = require( 'seneca' )()

seneca.add({role: 'math', cmd: 'sum'}, (msg, respond) => {
  let sum = msg.left + msg.right
  respond(null, {answer: sum})
});

seneca.add({role: 'math', cmd: 'sum', integer: true}, (msg, respond) => {
  this.act({role: 'math', cmd: 'sum', left: Math.floor(msg.left), right: Math.floor(msg.right)},respond);
})

seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5}, (err, result) => {console.log(result)});
seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true}, (err, result) => {console.log(result)});
