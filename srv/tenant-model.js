const cds = require('@sap/cds');
const lib = require('./library');

console.log('before-exports');
module.exports = cds.service.impl(function () {

    this.before('READ', '*', async (data) => {
        data.req.user.schema = lib.formatSchema(data.req.authInfo.getZoneId());
    });

    this.before('CREATE',  '*', async (data) => {
        data.req.user.schema = lib.formatSchema(data.req.authInfo.getZoneId());
    });
   
    this.before('DELETE', '*', async (data) => {
        data.req.user.schema = lib.formatSchema(data.req.authInfo.getZoneId());
    });

    this.before('UPDATE', '*', async (data) => {
        data.req.user.schema = lib.formatSchema(data.req.authInfo.getZoneId());
    });
});