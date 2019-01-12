const privateConfig = () => {
    const developmentURI = (local) => {
        const devDBUsername = 'hypertrope_application';
        const devDBPassword =
            'IIZHmoNiNXzqc4hmkHDlZk7UkZ4cQyrbOKQOx18+SxlmuJ8p';

        if (local) {
            // local mongoDB server
            return 'mongodb://127.0.0.1:27017/hypertrope_dev';
        }
        // projectbigballs mlab
        return `mongodb://${devDBUsername}:${devDBPassword}@ds243344.mlab.com:43344/projectbigballs`;
    };

    const productionURI = () => {
        const dbUser = 'hypertrope_application_prod';
        const dbPassword = 'ZASB94qVZsQ+s1MD7fVhaC7jOwXdx4qDdAy2oQQcYo4F5oj3';

        // hypertrope mlab
        return `mongodb://${dbUser}:${dbPassword}@ds225382.mlab.com:25382/hypertrope`;
    };

    const sessionSecret = (development) => {
        if (development) {
            return '/BuS8GY711YpLU7+jzx8RVpWqj1F/s+3';
        }

        return process.env.SESSION_SECRET;
    };

    // nodemailer
    const gmailPass = () => 'BeamToastEasyWash8612!';

    return {
        developmentURI,
        productionURI,
        sessionSecret,
        gmailPass,
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
