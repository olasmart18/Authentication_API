require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session")
const {connect, store} = require("./config/database");
const router = require("./router/userRoutes");
const pageRoute = require ("./router/mypage")


const port = process.env.PORT || 3030
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static("webpage"))

app.use(session({
secret: process.env.MY_SECRET,
resave:false,
saveUninitialized: false,
cookie: {
    secure: false,
    httpOnly: true,
    maxAge:1*24*60*60*1000
},
store: store
}));
app.use(cookieParser());

app.use("/user/auth", router);
app.use("/", pageRoute)

connect();


app.listen(port, () => console.log(`serving on port ${port}`))