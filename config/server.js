const serverConfig = () => {
    const determinePort = () => {
        switch (process.env.NODE_ENV) {
            case 'development.local' || 'development.remote':
                return 3000;
            case 'production':
                return process.env.PORT;
            default:
                return 3000;
        }
    };

    const determineHost = () => '0.0.0.0';

    return {
        determinePort,
        determineHost,
    };
};

module.exports = serverConfig();
