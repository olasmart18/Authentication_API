const { Schema, model } = require("mongoose");

const userSchema = Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const User = model("User", userSchema)

module.exports = User;