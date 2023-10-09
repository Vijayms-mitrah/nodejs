
const jwt = require('jsonwebtoken');
const { sendErrorResponse } = require('./response-helper');
const { STATUS_CODE } = require('./constant/status-code');
const STATUS_MESSAGE = require('./constant/status-message');
require("dotenv").config()

const jwtSign = (data) => {
    try {
        const token = jwt.sign(data, process.env.ACCESS_TOKEN, {expiresIn:process.env.JWT_EXPIRES_IN } )
        return token
    } catch (error) {
        throw error;
    }
};

const jwtVerify = (req, res, token, next) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN, (err, user)=>{
        if(err){
            console.log("teetete", user, token, "err", err.message);
            return sendErrorResponse(req, res, STATUS_CODE.UNAUTHORIZED, err)
        }
        req.user = user;
        next()
    })
}

module.exports = {jwtVerify, jwtSign}