module.exports = function(options) {
    this.add({role: 'employee', cmd: 'add'}, function(msg, respond){
        console.log('setter');
        this.make('employee').data$(msg.data).save$(respond);
    });
    
    this.add({role: 'employee', cmd: 'get'}, function(msg, respond) {
        console.log('getter');
        this.make('employee').load$(msg.data, respond);
    });
}
