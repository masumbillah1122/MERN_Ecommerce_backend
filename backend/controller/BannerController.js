const ErrorHandler = require('../helper/ErrorHandler');
const Banner = require('../models/BannerModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Features = require('../helper/Features');


// Add Banner
exports.createBanner = catchAsyncErrors(async(req, res, next) => {
    const banner = await Banner.create(req.body);
    res.status(201).json({
        success: true,
        result
    })
});


// Get All Banners
exports.getAllBanners = catchAsyncErrors(async(req, res, next) => {
    const resultPerPage = 8;
    const bannerCount = await Banner.countDocuments();
    const feature = new Features(Banner.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const banners = await feature.query;
    res.status(200).json({
        success: true,
        banners
    })
})


// Update Banner 
exports.updateBanner = catchAsyncErrors(async(req, res, next) => {
    let banner = await Banner.findById(req.params.id);
    if (!banner) {
        return res.status(500).json({
            success: false,
            message: "Banner is not found with this id"
        })
    }
    banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useUnified: false
    });
    res.status(200).json({
        success: true,
        banner
    })
});

// Delete Banner 
exports.deleteBanner = catchAsyncErrors(async(req, res, next) => {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
        return res.status(500).json({
            success: false,
            message: "Banner is not found with this id"
        })
    }
    await banner.remove();

    res.status(200).json({
        success: true,
        message: "Banner Deleted Successfully"
    })
})

// Single Banner Details
exports.getSingleBanner = catchAsyncErrors(async(req, res, next) => {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
        return next(new ErrorHandler("Banner is not found with this id", 404));
    }
    res.status(200).json({
        success: true,
        banner
    })
});