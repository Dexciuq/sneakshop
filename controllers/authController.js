const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require("../config/keys");
const passport = require('../middleware/passport');
const errorHandler = require('../util/errorHandler');

module.exports.login = async function(req, res){
    const candidate = await User.findOne({email:  req.body.email});

    if (candidate){
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult){
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 3600})
            res.render('message.ejs',{
                status: 200,
                message: `Welcome to SNEAKSHOP, dear!!`
            })

        }
        else{
            res.render('message.ejs',{
                status: 404,
                message: "Password/Email is wrong. Try again or register"
            })
        }
    }
    else {
        res.render('message.ejs',{
            status: 404,
            message: "User not found. Try again"
        })
    }
}

module.exports.register = async function(req, res){
    const candidate = await User.findOne({email:  req.body.email});
    if (candidate){
        res.render('message.ejs',{
            status: 409,
            message: `This email already registered, please login`
        })
    }
    else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            console.log(req.body);
            await user.save();
            res.render('message.ejs',{
                status: 201,
                message: `Your account successfully registered.
                Fullname: ${req.body.firstName} ${req.body.lastName}
                Email: ${req.body.email},`
            })
        } catch (err){
            errorHandler(res, err);
        }
    }
}

module.exports.logout = function(req, res){
    req.session = false;
    res.redirect("/");
}