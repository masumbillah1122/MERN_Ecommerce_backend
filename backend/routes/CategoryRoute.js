const express = require('express');
const {
    addCategory, 
    updateCategory,
    getAllCategories
} = require('../controller/CategoryController');

const router = express.Router();

router.route('/categories/new').get(addCategory);
router.route('/categories/:id').put(updateCategory);
router.route('/categories').get(getAllCategories)

module.exports = router; 