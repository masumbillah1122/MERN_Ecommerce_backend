const ErrorHandler = require("../helper/ErrorHandler");


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Interval server error"


    //wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resources not found with this id ..Invalid ${err.path}`;
        err = new ErrorHandler(message, 404);
    }



    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};