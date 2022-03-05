const express = require('express');
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//route 
const CategoryRouter = require('./routes/CategoryRoute');
const ProductRouter = require('./routes/ProductRoute');
const BannerRouter = require('./routes/BannerRoute');
const UserRouter = require('./routes/UserRoute');

app.use('/', CategoryRouter);
app.use('/', ProductRouter);
app.use('/', UserRouter);
app.use('/', BannerRouter);

app.use(ErrorHandler);

module.exports = app; 