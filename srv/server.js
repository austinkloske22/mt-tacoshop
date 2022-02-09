const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cds = require('@sap/cds');
const proxy = require("@sap/cds-odata-v2-adapter-proxy");

const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const xsenv = require('@sap/xsenv');

xsenv.loadEnv();
const services = xsenv.getServices({
    uaa: { tag: 'xsuaa' },
    registry: { tag: 'SaaS' },
    dest: { tag: 'destination' }
});

const xssec = require('@sap/xssec');
const passport = require('passport');

cds.on('bootstrap', (app) => {

    app.use(proxy());
    
    app.use(bodyParser.json());
    const lib = require('./library');

    passport.use('JWT', new xssec.JWTStrategy(services.uaa));
    app.use(passport.initialize());
    app.use(passport.authenticate('JWT', {
        session: false
    }));

    //cds.connect();
    //cds.serve().in(app);

    //********************************************************************************** */
    // Default CAP server.js 
    //********************************************************************************** */
    /*
    // mount static resources and logger middleware
    if (o.static)    app.use (express.static (o.static))  //> defaults to ./app
    if (o.favicon)   app.use ('/favicon.ico', o.favicon)  //> if none in ./app
    if (o.index)     app.get ('/',o.index)                //> if none in ./app
    if (o.correlate) app.use (o.correlate)                //> request correlation
    if (o.logger)    app.use (o.logger)                   //> basic request logging
    
    // load specified models or all in project
    const csn = await cds.load (o.from||'*')
    cds.model = o.from = cds.linked (cds.compile.for.odata(csn))
    
     // connect to essential framework services if required
    // note: cds.deploy() is not a public API
    const _init = o.in_memory && (db => cds.deploy(csn).to(db,o))
    if (cds.requires.db) cds.db = await cds.connect.to ('db') .then (_init)
    if (cds.requires.messaging) await cds.connect.to ('messaging')
    if (cds.requires.multitenancy) await cds.mtx.in (app)
    
    // serve all services declared in models
    await cds.serve (o.service,o).in (app)
    cds.emit ('served', cds.services)               //> hook for listeners
    //********************************************************************************** */

    // subscribe/onboard a subscriber tenant
    app.put('/callback/v1.0/tenants/*', function (req, res) {
        let tenantHost = req.body.subscribedSubdomain + '-' + appEnv.app.space_name.toLowerCase().replace(/_/g, '-') + '-' + services.registry.appName.toLowerCase().replace(/_/g, '-');
        let tenantURL = 'https:\/\/' + tenantHost + /\.(.*)/gm.exec(appEnv.app.application_uris[0])[0];
        console.log('Subscribe: ', req.body.subscribedSubdomain, req.body.subscribedTenantId, tenantHost, tenantURL);
        lib.createRoute(tenantHost, services.registry.appName).then(
            function (result) {
                res.status(200).send(tenantURL);
            },
            function (err) {
                console.log(err.stack);
                res.status(500).send(err.message);
            });
    });

    // unsubscribe/offboard a subscriber tenant
    app.delete('/callback/v1.0/tenants/*', function (req, res) {
        let tenantHost = req.body.subscribedSubdomain + '-' + appEnv.app.space_name.toLowerCase().replace(/_/g, '-') + '-' + services.registry.appName.toLowerCase().replace(/_/g, '-');
        console.log('Unsubscribe: ', req.body.subscribedSubdomain, req.body.subscribedTenantId, tenantHost);
        lib.deleteRoute(tenantHost, services.registry.appName).then(
            function (result) {
                res.status(200).send('');
            },
            function (err) {
                console.log(err.stack);
                res.status(500).send(err.message);
            });
    });

    // get reuse service dependencies
    app.get('/callback/v1.0/dependencies', function (req, res) {
        let tenantId = req.params.tenantId;
        let dependencies = [{
            'xsappname': services.dest.xsappname
        }];
        console.log('Dependencies: ', tenantId, dependencies);
        res.status(200).json(dependencies);
    });

    // app user info
    app.get('/srv/info', function (req, res) {
        if (req.authInfo.checkScope('$XSAPPNAME.User')) {
            let info = {
                'userInfo': req.user,
                'subdomain': req.authInfo.getSubdomain(),
                'tenantId': req.authInfo.getZoneId()
            };
            res.status(200).json(info);
        } else {
            res.status(403).send('Forbidden');
        }
    });

    // app subscriptions
    app.get('/srv/subscriptions', function (req, res) {
        if (req.authInfo.checkScope('$XSAPPNAME.Administrator')) {
            lib.getSubscriptions(services.registry).then(
                function (result) {
                    res.status(200).json(result);
                },
                function (err) {
                    console.log(err.stack);
                    res.status(500).send(err.message);
                });
        } else {
            res.status(403).send('Forbidden');
        }
    });


    // destination reuse service
    app.get('/srv/destinations', function (req, res) {
        if (req.authInfo.checkScope('$XSAPPNAME.User')) {
            lib.getDestination(services.dest, req.authInfo.getSubdomain(), req.query.destination).then(
                function (result) {
                    // result contains the destination information for use in REST calls
                    res.status(200).json(result);
                },
                function (err) {
                    console.log(err.stack);
                    res.status(500).send(err.message);
                });
        } else {
            res.status(403).send('Forbidden');
        }
    });
});
/*
const port = process.env.PORT || 5001;
app.listen(port, function () {
    console.info('Listening on http://localhost:' + port);
});
*/

cds.on('served', (app) => {
    // add more middleware after all CDS services
});

module.exports = cds.server //> delegate to default server.js
