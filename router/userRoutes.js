const express = require ("express")
const {register, login,} = require("../controllers/authController")
const isAuth = require("../verify/is-Auth")

const router = express.Router();

router.post("/register", register)
router.post("/login", login)


module.exports = router;