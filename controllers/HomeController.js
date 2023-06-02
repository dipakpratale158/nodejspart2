// const { products } = require('../utils/Products');

// exports.getHomePage = (req, res) => {

//     const viewsData = {
//       products,
//       pageTitle: 'Home Page - Products List'
//     };
//     res.render('homepage', viewsData);
//   });
// };

//if error getallproduct not a function
// const { getAllProducts } = require('../utils/Products');

// exports.getHomePage = (req, res) => {

//     const viewsData = {
//       products:getAllProduct(),
//       pageTitle: 'Home Page - Products List'
//     };
//     res.render('homepage', viewsData);
//   });
// };


// const { fetchAllProducts } = require('../utils/Products');

// exports.getHomePage = (req, res) => {

//     const viewsData = {
//       products:fetchAllProducts(),
//       pageTitle: 'Home Page - Products List'
//     };
//     res.render('homepage', viewsData);
//   });
// };

//i got error when getting data  product length
const Category = require('../models/CategoryModel');
const { fetchAllProducts, getProductById } = require('../models/Product');
const Product=require('../models/ProductModel');
const User = require('../models/UserModel');

//not take callback take promises beacase of mysql
// exports.getHomePage = (req, res) => {
//   fetchAllProducts((products) => {
//     const viewsData = {
//       /////
//       admin: false,
//       products,
//       pageTitle: 'Home Page - Products List'
//     };
//     res.render('product-list', viewsData);
//   });
// };


//
exports.getHomePage = (req, res) => {
  Product.findAll({include:[{model:Category}, {model:User}]}).then((products)=>{
    console.log(products)
    const viewsData = {
        admin: false,
        products,
        pageTitle: 'Home Page - Products List'
      };
      res.render('product-list', viewsData);
  }).catch((error) => {
    console.log(error);
  });
}
  //when i am reffreshing same page like add product sop get data in console 
  
  
  //remove fechall product 
//   fetchAllProducts()
//     .then(([products]) => {
//       // const viewsData = {
//       //   admin: false,
//       //   products,
//       //   pageTitle: 'Home Page - Products List'
//       // };
//       // res.render('product-list', viewsData);

// //above code past inside product.fuindall

//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// exports.getProductDetailsPage = (req, res) => {
//   const productId = req.params.productId;
//   getProductById(productId)
//     .then(([product]) => {
//       const viewsData = {
//         product: product[0],
//         pageTitle: product[0].title
//       };
//       res.render('ProductDetails', viewsData);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

exports.getProductDetailsPage = (req, res) => {
  const productId = req.params.productId;
   Product.findAll({where:{id:productId}}) .then((product) => {

  // Product.findByPk(productId) .then((product) => {
    const viewsData = {
      //no need to add 0 when using findpeak
      product: product[0],
      pageTitle: product[0].title
    };
    res.render('ProductDetails', viewsData);
  })


    .catch((error) => {
      console.log(error);
    });
};