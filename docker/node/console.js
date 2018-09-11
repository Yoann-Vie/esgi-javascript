'use strict';

// node

module.exports = {

    questions: [
        {
            message: "Application directory. Relative to the current directory.",
            name: "application_dir",
            default: "./",
            validator: (value)=>{
                if(!Skyflow.Directory.exists(value)){
                    return 'Directory not found.'
                }
                return true
            }
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
            validator: (value)=>{
                if(Skyflow.isPortReachable(value)){
                    return 'This port is not available.'
                }
                Skyflow.addDockerPort(value);
                return true
            }
        },
    ],

};
