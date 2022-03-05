const express = require('express');
const { createBanner, 
    getAllBanners, 
    updateBanner, 
    deleteBanner,
    getSingleBanner
} = require('../controller/BannerController');

const router = express.Router();

router.route('/banners').get(getAllBanners)
router.route('/banner/new').post(createBanner);
router.route('/banner/:id').put(updateBanner);
router.route('/banner/:id').delete(deleteBanner);
router.route('/banner/:id').get(getSingleBanner)


module.exports = router