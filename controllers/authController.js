const bcrypt = require("bcrypt");
const user = require("../model/users")

exports.register = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new user({
        username: username,
        email: email,
        password: hash
    })
    try {
        const saveUser = await newUser.save()
        res.status(200).json({
            success: true,
            Message: "successfully register!",
            data: saveUser
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "fail, try again"
        })
    }
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password

    const findUser = await user.findOne({ email: email })
    if (findUser) {
        const checkPassword = bcrypt.compareSync(password, findUser.password)
        if (checkPassword) {
            return res.status(200).json({
                success: true,
                message: "login successful"
            })
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