const { Router } = require('express')
const user = require('./user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const router = Router()

var setHeader = function (req, res, next){
    res.setHeader('errorCode', '0');
    res.setHeader('errorMessage', '');
    return next();
}

var isAuthenticated = function (req, res, next) {
    const token = req.headers.token

    if(token){
        let usr;
        jwt.verify(token, process.env.SECRET, (err, user) => {
            usr = user
        })
        if(usr){ return next() }
    }

    res.setHeader('errorCode', '6');
    res.setHeader('errorMessage', 'Unauthorized');
    res.status(200).send();
}

const errorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        let message;
        Object.keys(error.errors).forEach((key) => {
            message = error.errors[key].message;
            return
        });
        res.setHeader('errorCode', '3');
        res.setHeader('errorMessage', message);
    }
    else{
        switch(error.code) {
            case 11000:
                res.setHeader('errorCode', '2');
                res.setHeader('errorMessage', "Already Exists");
                break;
            default:
                res.setHeader('errorCode', '100');
                res.setHeader('errorMessage', "Unidentified");
        }
    }
    res.status(200).send();
}

/* User Routes */
router.use('/user', setHeader, user)

/* Checking Authentication */
router.post('/page', setHeader, isAuthenticated, (req, res)=>{
    res.status(200).send({ "msg": "Acc Granted" });
    return
})

/* Error Handling */
router.use(errorHandler);

/* Export */
module.exports = router