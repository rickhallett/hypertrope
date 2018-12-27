// projectbigballs mlab
const dev_db_user = 'app';
const dev_db_password = 'Splt9rMGFBuKgzQ8m3TIUrhrLvfqzEM1';
const dev_mongoURI = `mongodb://${dev_db_user}:${dev_db_password}@ds243344.mlab.com:43344/projectbigballs`;

// hypertrope mlab
const db_user = 'admin';
const db_password = 'wUBFDuWdNNMXzfBdWti0CdvesU5Ge+9';
const mongoURI = `mongodb://${db_user}:${db_password}@ds225382.mlab.com:25382/hypertrope`;

const sessionSecret = '/BuS8GY711YpLU7+jzx8RVpWqj1F/s+3';

module.exports = {
    dev_mongoURI,
    mongoURI,
    sessionSecret
};