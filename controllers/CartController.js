// const { addProductToCart, getCartDetailsFromFile, deleteProductFromCart } = require('../models/Cart');
// const { getProductById, fetchAllProducts } = require('../models/Product');

// exports.postCartPage = (req, res) => {
//   console.log(req.body)
//   const productId = req.body.productId;
//   getProductById(productId, (product) => {
//     //////
//     addProductToCart(productId, product.price);
//     res.redirect('/');
//   });
// };

// // exports.getCartPage = (req, res) => {
// //   getCartDetailsFromFile((cart) => {
// //     const cartProducts = cart.products;
// //     fetchAllProducts((products) => {
// //       const productsData = [];
// //       let totalPrice = 0;
// //       for (let cartItem of cartProducts) {
// //         let singleProduct = products.find((prod) => prod.id.toString() === cartItem.id.toString());
// //         cartProductPrice = +cartItem.quantity * +singleProduct.price;
// //         totalPrice += cartProductPrice;
// //         productsData.push({ ...singleProduct, quantity: cartItem.quantity, cartPrice: cartProductPrice });
// //       }

// //       const viewsData = {
// //         pageTitle: 'Cart Details',
// //         cartProducts: productsData,
// //         totalPrice
// //       };

// //       res.render('cartDetails', viewsData);

// //     });
// //   });
// // };





// exports.getCartPage = (req, res) => {
//   getCartDetailsFromFile((cart) => {
//     const cartProducts = cart.products;
//     fetchAllProducts()
//       .then(([products]) => {
//         const productsData = [];
//         let totalPrice = 0;
//         for (let cartItem of cartProducts) {
//           let singleProduct = products.find((prod) => prod.id.toString() === cartItem.id.toString());
//           cartProductPrice = +cartItem.quantity * +singleProduct.price;
//           totalPrice += cartProductPrice;
//           productsData.push({ ...singleProduct, quantity: cartItem.quantity, cartPrice: cartProductPrice });
//         }

//         const viewsData = {
//           pageTitle: 'Cart Details',
//           cartProducts: productsData,
//           totalPrice
//         };

//         res.render('cartDetails', viewsData);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
// };


// //
// //form submition so req.param not
// exports.deleteCartItem = (req, res) => {
//   const productId = req.body.productId;
//   deleteProductFromCart(productId, () => {
//     res.redirect('/cart');
//   });
// };

const { addProductToCart, getCartDetailsFromFile, deleteProductFromCart } = require('../models/Cart');
const { getProductById, fetchAllProducts } = require('../models/Product');
const Product = require('../models/ProductModel');

exports.postCartPage = (req, res) => {
  const productId = req.body.productId;
  let newQuantity = 1;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      if (!cart) {
        return req.user.createCart();
      }
      return cart;
    })
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      if (products.length) {
        newQuantity = products[0].cartItem.quantity + 1;
        return products[0];
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((error) => {
      console.log(error);
    });
};

// exports.getCartPage = (req, res) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts();
//     })
//     .then((cartProducts) => {
//       let totalPrice = 0;

//       for (let product of cartProducts) {
//         totalPrice += +product.cartItem.quantity * +product.price;
//       }

//       const viewsData = {
//         pageTitle: 'Cart Details',
//         cartProducts,
//         totalPrice
//       };

//       res.render('cartDetails', viewsData);
//     });
// };



exports.getCartPage = (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      if (cart) {
        return cart.getProducts();
      }
      return null;
    })
    .then((cartProducts) => {
      let totalPrice = 0;
      if (cartProducts) {
        for (let product of cartProducts) {
          totalPrice += +product.cartItem.quantity * +product.price;
        }
      }

      const viewsData = {
        pageTitle: 'Cart Details',
        cartProducts,
        totalPrice
      };

      res.render('cartDetails', viewsData);
    });
};

// exports.deleteCartItem = (req, res) => {
//   const productId = req.body.productId;
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return Product.findByPk(productId);
//     })
//     .then((product) => {
//       return fetchedCart.removeProduct(product);
//     })
//     .then(() => {
//       res.redirect('/cart');
//     })
//     .catch((error) => {
//       console.log(error);
  
//   });
// };

//2nd method
exports.deleteCartItem = (req, res) => {
  const productId = req.body.productId;
  // let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      // fetchedCart = cart;
      return cart.getProducts({where:{id:productId}});
    })
    .then((products) => {
      return products[0].cartItem.destroy()
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((error) => {
      console.log(error);
  
  });
};