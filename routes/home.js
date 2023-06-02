

// const express=require('express')
// const path=require('path')
// const Router=express.Router()
// //get  exact matching get use if i am using use all pathe home page display
// Router.get('/',(req,res,next)=>{
//     res.sendFile(path.join(__dirname , '../','views','homepage.html'))
// })

// module.exports=Router




const express = require('express');
const router = express.Router();
const { postCartPage, getCartPage, deleteCartItem } = require('../controllers/CartController');

const { getHomePage, getProductDetailsPage } = require('../controllers/HomeController');

router.get('/', getHomePage);
/////add product detail page id dyanamic id :producvt id
router.get('/product/details/:productId',getProductDetailsPage)
////go cartcontroller
router.post('/cart', postCartPage);
router.get('/cart', getCartPage);
router.post('/cart/delete-item', deleteCartItem);
//
module.exports = router;