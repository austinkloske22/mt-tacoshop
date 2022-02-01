const cds = require('@sap/cds');

console.log('before-exports');
module.exports = cds.service.impl(function () {

    this.before('READ', '*', (data) => {
        data.req.user.schema = 'public';
    });

    this.before('CREATE',  '*', (data) => {
        data.req.user.schema = 'public';
    });
   
    this.before('DELETE', '*', (data) => {
        data.req.user.schema = 'public';
    });

    this.before('UPDATE', '*', (data) => {
        data.req.user.schema = 'public';
    });
});