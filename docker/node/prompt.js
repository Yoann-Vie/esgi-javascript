'use strict';

// node

module.exports = {

    questions: [
        {
            message: "Container name",
            name: "container_name",
            default: "node",
        },
        {
            message: "Application directory",
            name: "application_dir",
            default: "..",
        },
        {
            message: "Node environment",
            name: "env",
            default: "dev",
        },
        {
            message: "Application port",
            name: "port",
            default: "8081",
        },
    ],

};
