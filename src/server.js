/*jslint node: true this:true es6:true */
/*global this*/

"use strict";
const Hapi = require("hapi");
const config = require("./config");
const routes = [
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public',
                index: ['index.html']
            }
        }
    },
    {
        method: "GET",
        path: "/favicon.ico",
        handler: {
            file: "public/images/favicon.ico"
        }
    }
];


const server = new Hapi.Server({
    port: config.server.port
});

const start = async function () {
    try {
        await server.register(require("inert"));
        server.route(routes);

        server.events.on('response', function (request) {
            console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
        });

        await server.start();
    } catch (err) {
        console.error(err);
        process.exit();
    }

    console.log(`The Fractal-Trees app is now running on port ${server.info.port}`);
};

start();
