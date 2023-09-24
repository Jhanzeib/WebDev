/* Imports */
const user = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

/* SignUp */
const signup = async (req, res, next) => {
    if (req.body.password && req.body.password.length < 8){
        res.setHeader('errorCode', '1');
        res.setHeader('errorMessage', 'Invalid Password Length');
        res.status(200).send();
        return
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)
    await user.create(req.body).then(                
        (obj) => {
            const token = jwt.sign({user: obj}, process.env.SECRET)
            res.setHeader('user', JSON.stringify(obj));
            res.setHeader('token', token);
            res.status(200).send();
        }
    ).catch(
        (error) => {
            next(error)
        }
    )
}

/* Login */
const  login = async (req, res, next) => {
    if (!req.body.password || !req.body.email){
        res.setHeader('errorCode', '4');
        res.setHeader('errorMessage', 'Missing values');
        res.status(200).send();
        return
    }
    await user.findOne( { email: req.body.email } ).then(
        async (obj) => {
            if(obj && await bcrypt.compare(req.body.password, obj.password)){
                const token = jwt.sign({user: obj}, process.env.SECRET)
                res.setHeader('user', JSON.stringify(obj));
                res.setHeader('token', token);
                res.status(200).send();
            }
            else{
                res.setHeader('errorCode', '5');
                res.setHeader('errorMessage', 'Invalid Credentials');
                res.status(200).send();
            }
        }
    ).catch(
        (error) => {
            next(error)
        }
    )
}

/* Export */
module.exports = { signup, login}