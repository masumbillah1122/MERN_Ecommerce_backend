const ErrorHandler = require('../helper/ErrorHandler');
const User = require('../models/UserModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../helper/jwtToken');

class UserController {
    async createUser(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const user = await User.create({
                name,
                email,
                password,
                avator: {
                    public_id: "https://test.com",
                    url: "https://test.com"
                }
            });
        } catch (err) {
            return res
                .status(500)
                .send(failure({
                    success: false,
                    msg: "Internal Server Error"
                }));
        }
    }
}