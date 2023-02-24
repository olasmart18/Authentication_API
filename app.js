const express = require("express");
const env = require ("dotenv").config();



const port = process.env.PORT || 3030
const app = express()

app.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "testing app connection"
    })
})

app.listen(port, () => console.log(`serving on port ${port}`))