const mongoose = require('mongoose');

const Model = mongoose.model;
const passportLocalMongoose = require('passport-local-mongoose');

const AccountSchema = new mongoose.Schema({
    username: String,
    password: String,
});

AccountSchema.plugin(passportLocalMongoose);

const Account = new Model('Account', AccountSchema);

module.exports = Account;
