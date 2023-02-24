const { json } = require("express");
const express = require("express");
const env = require ("dotenv").config();
const connect = require("./config/database");
const router = require ("./router/userRoutes")



const port = process.env.PORT || 3030
const app = express();

app.use(json());
app.use("/user/auth", router);

connect();

app.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "testing app connection"
    })
})

app.listen(port, () => console.log(`serving on port ${port}`))