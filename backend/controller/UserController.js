const ErrorHandler = require('../helper/ErrorHandler');
const User = require('../models/UserModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../helper/jwtToken');


// Register user
exports.createUser = catchAsyncErrors(async(req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avator: {
            public_id: "https://test.com",
            url: "https://test.com"
        }
    })

    sendToken(user, 201, res);
})

// Login From
exports.loginUser = catchAsyncErrors(async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please enter your email & password", 400));
    };
    const user = await User.findOne({ email }.select(" +password "));
    if (!user) {
        return next(new ErrorHandler("User is not found with this email & password", 401));
    };

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("User is not found with this email & password", 401));
    };

    sendToken(user, 201, res);

});

// Log out user
exports.logoutUser = catchAsyncErrors(async(req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Log Out success",
    });
});