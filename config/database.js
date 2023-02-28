const mongoose = require("mongoose");
const session = require("express-session")
const mongoDBSession = require("connect-mongodb-session")(session)


mongoose.set("strictQuery", true)

const db =  "AuthDB";

const connect = async (err) => {
    try {
   await mongoose.connect(process.env.MONGO_URI + db);
   console.log("connected to  db");
} catch (error) {
    console.log("cannot connect db, try again");
}
}

const store = new mongoDBSession({
    uri: process.env.MONGO_URI+db,
    collection: "sessions"
})

module.exports = {connect, store}