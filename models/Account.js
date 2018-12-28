const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const AccountSchema = new mongoose.Schema({
  username: String,
  password: String
});

AccountSchema.plugin(passportLocalMongoose);

const Account = new mongoose.model("Account", AccountSchema);

module.exports = Account;
