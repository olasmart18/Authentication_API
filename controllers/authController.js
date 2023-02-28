const bcrypt = require("bcrypt");
const cookie = require("cookie-parser")
const path = require("path")
const user = require("../model/users")

exports.myWebPage = async (req, res) => {
    res.sendFile(path.join(__dirname, '../webpage', 'web.html'))
    // return res.status(200).json({
    //     success: true,
    //     message: "login successful, & welcome to my webpage"
    // })
}

exports.register = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    const exist = await user.findOne({ email: email })
    if (exist) {
        return res.status(401).json({
            success: false,
            message: "user already exist"
        })
    }
    const newUser = new user({
        username: username,
        email: email,
        password: hash
    })
    try {
        await newUser.save()
        res.redirect("/login")

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "fail, try again"
        })
    }
}

exports.myLoginPage = async (req, res) => {
    res.sendFile(path.join(__dirname, '../webpage', 'login.html'))
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password

    const findUser = await user.findOne({ email: email })
    if (findUser) {
        const checkPassword = bcrypt.compareSync(password, findUser.password)
        if (checkPassword) {
            req.session.isAuth = true;
            req.session.user = findUser._id;
            req.session.role = "admin";
            return res.redirect("/mypage")
        } else {
            return res.status(401).json({
                success: false,
                message: "incorrect email or password"
            })
        }
    }
    res.status(404).json({
        success: false,
        message: "cannot find user"
    })
}

exports.logout = async (req, res) => {
    req.session.destroy((err)=> {
        if (err) {
            console.log(err);
        } else {
            res.clearCookie('connect.sid')
            res.redirect("/login")
        }
    })

}