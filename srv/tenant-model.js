const cds = require('@sap/cds');
const lib = require('./library');

console.log('before-exports');
module.exports = cds.service.impl(function () {

    this.before('READ', '*', (data) => {
        data.req.user.schema = lib.formatSchema(data.req.authInfo.getZoneId());
    });

    this.before('CREATE',  '*', (data) => {
        data.req.user.schema = lib.formatSchema(data.req.authInfo.getZoneId());
    });
   
    this.before('DELETE', '*', (data) => {
        data.req.user.schema = lib.formatSchema(data.req.authInfo.getZoneId());
    });

    this.before('UPDATE', '*', (data) => {
        data.req.user.schema = lib.formatSchema(data.req.authInfo.getZoneId());
    });
});