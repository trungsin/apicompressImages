'use strict';
module.exports = function(app) {
  let productsCtrl = require('./controllers/ProductsController');
  let optimzeCtrl = require('./controllers/OptimzeController');

  // todoList Routes
  app.route('/products')
    .get(productsCtrl.get)
    .post(productsCtrl.store);

  app.route('/products/:productId')
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);
  app.route('/optimze/:input')
    .get(optimzeCtrl.opt);
};
