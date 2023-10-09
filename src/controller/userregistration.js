
const { response } = require('express');
const { STATUS_CODE } = require('../helper/constant/status-code')
const STATUS_MESSAGE = require('../helper/constant/status-message');
const { jwtSign, jwtVerify } = require('../helper/jwt-helper');
const { sendResponse, sendErrorResponse } = require('../helper/response-helper')
const db = require('../models/index')
const bcrypt = require("bcryptjs");
const schema = require('../helper/validation');

const registration = async(req, res) => {
try{    
    user = req.body;
    const {error} = schema.registration.validate(user)
    if(!error){
        console.log("error123", error);
        sendErrorResponse(req, res, 401, error);
        return 
    }
    const salt = bcrypt.genSaltSync(10);
    const password = await bcrypt.hash(user.password, salt);
    user.password = password
    db.Users.create(user).then(data => {
        sendResponse(req,res,STATUS_CODE.SUCCESS,STATUS_MESSAGE.REGISTER_LINK,data);
    })
    .catch(err=>{
        console.log("err123", err);
        sendErrorResponse(req, res, 209, err )
    })
}
    catch(err){
        console.log("err123", err);
        sendErrorResponse(req, res, 209, err )
    }

}

const login = async(req, res) => {
    console.log("trigger");
    const { error } = await schema.login.validate(req.body);
    const {user_name, password} = req.body;
    if(error){
        //For Handling Empty Validation
        sendErrorResponse(req, res, 401, error)
        return 
    }
    const userdetails = await db.Users.findOne({where:{user_name}})
    const passwordMatch = await bcrypt.compare(password, userdetails.password);
    if(userdetails?.user_name !== user_name){
        sendErrorResponse(req, res, 401, "user Doesn't Exist")
    } else if(!passwordMatch){
        sendErrorResponse(req, res, 401, "Password was incorrect")
    } else {
        const token = jwtSign({user_name, password});
        userdetails.dataValues.auth_token = token;
        console.log("token123",token, userdetails);
        // sendResponse(req, response, STATUS_CODE.SUCCESS, STATUS_MESSAGE.LOGGED_IN, userdetails )
        res.status(STATUS_CODE.SUCCESS).send({
            statusCode:STATUS_CODE.SUCCESS,
            status: true,
            message: STATUS_MESSAGE.LOGGED_IN,
            data: userdetails,
        })
    }
}

const getCricketers = async(req, res) => {
    const data = await db.Cricketers.findAll({})
    console.log('data123', data);
    sendResponse(req, res, STATUS_CODE.SUCCESS, STATUS_MESSAGE.SUCCESS, data)
}

const authCheck = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    console.log("token!!", token);
    if(!token){
        sendErrorResponse(req, res, STATUS_CODE.UNAUTHORIZED, "Token doesn't exist");
        return
    }
    jwtVerify(req, res, token, next)
}

module.exports = { registration, login, getCricketers, authCheck }