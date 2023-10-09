const { STATUS_CODE } = require("./constant/status-code");
const STATUS_MESSAGE = require("./constant/status-message");

const sendResponse = (req, res, code, message, data) => {
  try {
    let statusCode = code || STATUS_CODE.SUCCESS;
    message = message || STATUS_MESSAGE.SUCCESS;
    data = data || {};
    console.log("response", res);
    return res.status(statusCode).send({
      statusCode,
      status: true,
      message,
      data,
    });
  } catch (error) {
    throw error;
  }
};

const sendErrorResponse = async (req, res, code, error) => {
  try {
    const statusCode = code || STATUS_CODE.BAD_REQUEST;
    // const message = (error && error.message) ? error.message : STATUS_MSG.INTERNAL_SERVER_ERROR;
    const message =
      error && error.message
        ? error.message.replace(/[^a-zA-Z ]/g, "")
        : STATUS_MESSAGE.INTERNAL_SERVER_ERROR;
    return res.status(200).send({
      status: false,
      statusCode,
      error,
      message,
    });
  } catch (error) {
    throw error;
  }
};

const sendUnauthorizedErrorResponse = async (req, res) => {
  try {
    let statusCode = STATUS_CODE.UNAUTHORIZED;
    let message = STATUS_MSG.UNAUTHORIZED;
    return res.status(STATUS_CODE.UNAUTHORIZED).send({
      status: false,
      statusCode,
      message,
      error: { message },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendUnauthorizedErrorResponse,
  sendErrorResponse,
  sendResponse,
};
