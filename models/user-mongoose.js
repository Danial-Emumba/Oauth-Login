const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const providerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["direct", "google", "okta"],
    required: true,
  },
  providerId: {
    type: String,
    unique: true,
    sparse: true,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function () {
      return this.provider === "direct";
    },
  },

  providers: [providerSchema],
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

module.exports = User;
