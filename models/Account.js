const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = new mongoose.Schema({
    name: String,
    passport: String
});

accountSchema.plugin(passportLocalMongoose);

const Account = new mongoose.model('Account', accountSchema);

module.exports = Account;