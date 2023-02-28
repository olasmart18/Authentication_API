const express = require("express")
const { myWebPage,
    myLoginPage,
    logout
} = require("../controllers/authController")
const isAuth = require("../verify/is-Auth")
const router = express.Router()

router.get("/mypage", isAuth, myWebPage)
router.get("/login", myLoginPage)
router.post("/logout", logout)

module.exports = router