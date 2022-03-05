const ErrorHandler = require('../helper/ErrorHandler');
const Product = require('../models/ProductModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Features = require('../helper/Features');

//create product
exports.createProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

//Get All Products
exports.getAllProducts = catchAsyncErrors(async(req, res) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    const feature = new Features(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = await feature.query;
    res.status(200).json({
        success: true,
        products
    })
});

//Update Product --Admin
exports.updateProduct = catchAsyncErrors(async(req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product is not found with this id"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useUnified: false
    });
    res.status(200).json({
        success: true,
        product
    })
}); 

//Delete product --Admin
exports.deleteProduct = catchAsyncErrors(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product is not found with this id"
        })
    }
    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
});

//Single Product Details
exports.getSingleProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
    }
    res.status(200).json({
        success: true,
        product,
    })
});