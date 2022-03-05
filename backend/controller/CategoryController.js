const ErrorHandler = require('../helper/ErrorHandler');
const Category = require('../models/CategoryModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const slugify = require('slugify');
const Features = require('../helper/Features');



// Add Category

exports.addCategory = catchAsyncErrors(async(req, res, next) => {
    const categoryObj = await Category.create({
        name: req.body.name,
        slug: slugify(req.body.name)
    });

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error)
            return res.status(400).json({ error });
        if (category) {
            return res.status(201).json({ category });
        }
    })
}) 


// Get All Categories
exports.getAllCategories = catchAsyncErrors(async(req, res)=>{
    const resultPerPage = 8;
    const categoryCount  = await Category.countDocuments();
    const feature = new Features(Category.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const categories = await feature.query;
    res.status(200).json({
        success: true,
        categories
    })
})


// Update Category

exports.updateCategory = catchAsyncErrors(async(req, res) => {
    let categoryObj = await Category.findById(req.params.id);

    if(!categoryObj){
        return res.status(500).json({
            success: false,
            message: "Category is not found with this id"
        })
    }
    categoryObj = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useUnified: false
    });
    res.status(200).json({
        success: true,
        categoryObj
    })
})