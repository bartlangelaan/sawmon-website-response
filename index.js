'use strict';

const debug = require('debug')('sawmon:website-responsecode');

module.exports.dependencies = ['sawmon-website-request'];

module.exports.websites = {

    schema: {
        status: Number,
        responseTime: Number
    },

    display: [
        {
            name: 'Response code',
            value: website => (website.status ? `${website.status}` : null)
        },
        {
            name: 'Response time',
            value: website => (website.responseTime ? `${website.responseTime}s` : null)
        }
    ],

    ping: passTrough => {

        if (!passTrough.request || !passTrough.request.statusCode) {

            debug('No statusCode found in passTrough.request');
            debug(passTrough.request);

            return Promise.resolve();

        }
        passTrough.instance.status = passTrough.request.statusCode;
        passTrough.instance.responseTime = passTrough.request.elapsedTime ? (passTrough.request.elapsedTime / 1000) : null;

        return passTrough.instance.save();

    }
};
