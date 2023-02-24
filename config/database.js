const mongoose = require("mongoose");

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
module.exports = connect;