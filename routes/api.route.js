const router = require('express').Router();
const controller = require('./../controllers/controller')

//to add products 
router.post('/create_products', controller.addProducts);

//to add purchased products into database
router.post('/create_purchases/:productId', controller.addPurchase);
//to get all product datails
router.get('/get_all_product_details' , controller.getProductDetail)

module.exports = router;
