'use strict';
module.exports = function(app) {
  let productsCtrl = require('./controllers/ProductsController');
  let imagesCtrl = require('./controllers/ImagesController');
  let optimzeCtrl = require('./controllers/OptimzeController');

  // todoList Routes
  app.route('/products')
    .get(productsCtrl.get)
    .post(productsCtrl.store);

  app.route('/products/:productId')
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);

  app.route('/images')
    .get(imagesCtrl.get)
    .post(imagesCtrl.store);

  app.route('/images/:imageID')
    .get(imagesCtrl.detail)
    .put(imagesCtrl.update)
    .delete(imagesCtrl.delete);

  app.route('/optimze')
    .get(optimzeCtrl.opt);
  app.route('/optimze_tini')
    .get(optimzeCtrl.opttini);
  app.route('/optimzes')
    .get(optimzeCtrl.opts);
};
