// TODO: fix this hack of keeping application setup partially dependent on a file that cannot exist in remote repositories...the same code needs to run in dev and prod using server variables and conditional logic in app.js

let secret = {};

if (process.env.NODE_ENV !== 'production') secret = require('./secret');

const privateConfig = () => {
    const developmentURI = (local) => {
        if (local) {
            // local mongoDB server
            return secret.localMongoURI;
        }
        // projectbigballs mlab
        return secret.devMongoURI;
    };

    const productionURI = () => process.env.MONGO_URI;

    const sessionSecret = (development) => {
        if (development) {
            return secret.sessionKey;
        }

        return process.env.SESSION_SECRET;
    };

    return {
        developmentURI,
        productionURI,
        sessionSecret,
    };
};

const determineMongoURI = () => {
    switch (process.env.NODE_ENV) {
        case 'development.local':
            return privateConfig().developmentURI(true);
        case 'development.remote':
            return privateConfig().developmentURI(false);
        case 'production':
            return privateConfig().productionURI();
        default:
            return privateConfig().developmentURI(true);
    }
};

const determineSessionSecret = () => {
    switch (process.env.NODE_ENV) {
        case 'development.local':
            return privateConfig().sessionSecret(true);
        case 'development.remote':
            return privateConfig().sessionSecret(true);
        case 'production':
            return process.env.SESSION_SECRET;
        default:
            return privateConfig().sessionSecret(true);
    }
};

const config = {
    determineMongoURI,
    determineSessionSecret,
};

module.exports = config;
