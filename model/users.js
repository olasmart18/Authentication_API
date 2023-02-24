const { Schema, model } = require("mongoose");

const userSchema = Schema({
    username: {
        type:String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String
})

const User = model("User", userSchema)

module.exports = User;