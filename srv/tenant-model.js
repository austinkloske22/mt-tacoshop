const cds = require('@sap/cds');
const lib = require('./library');

console.log('before-exports');
module.exports = cds.service.impl(function () {

    this.before('READ', '*', (data) => {
        if (data.req.authInfo) {
            data.req.user.schema = lib.formatSchema(data.req.authInfo.getZoneId());
        }
    });

    this.before('CREATE',  '*', (data) => {
        if (data.req.authInfo) {
            data.req.user.schema = lib.formatSchema(data.req.authInfo.getZoneId());
        }
    });
   
    this.before('DELETE', '*', (data) => {
        if (data.req.authInfo) {
            data.req.user.schema = lib.formatSchema(data.req.authInfo.getZoneId());
        }
    });

    this.before('UPDATE', '*', (data) => {
        if (data.req.authInfo) {
            data.req.user.schema = lib.formatSchema(data.req.authInfo.getZoneId());
        }
    });
});