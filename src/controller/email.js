const { STATUS_CODE } = require("../helper/constant/status-code");
const STATUS_MESSAGE = require("../helper/constant/status-message");
const { sender, mailOption } = require("../helper/mail_helper");
const { sendResponse } = require("../helper/response-helper");

const onHandleEmailTrigger = (req, res) =>{
    sender.sendMail(mailOption, (error, info)=>{
        if (error) {
          console.log(error);
        } else {
            sendResponse(
                req,
                res,
                STATUS_CODE.SUCCESS,
                STATUS_MESSAGE.REGISTER_LINK,
                info.response
              );
          console.log('Email sent: ' + info.response);
        }
      })
}

module.exports = {onHandleEmailTrigger}