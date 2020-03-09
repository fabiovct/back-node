const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const UserController = require('./controllers/UsersController');
const ProductsCoontroller = require('./controllers/ProductsController');
const db_connection = require('./db_connection');
var bodyParser = require('body-parser');
var session = require('express-session');

const routes = express.Router();

/*app = express();
routes.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
routes.use(bodyParser.urlencoded({extended : true}));
routes.use(bodyParser.json());

routes.use(express.static(__dirname + '/'));*/


routes.post('/auth', UserController.loginAuth);
routes.get('/logout', UserController.logout);

routes.get('/', UserController.selectUsers);
//products
routes.get('/product', ProductsCoontroller.listProducts);
routes.post('/product/create', ProductsCoontroller.createProduct);
routes.get('/id/:id', ProductsCoontroller.selectById);
routes.put('/product/edit', ProductsCoontroller.editProduct);
routes.delete('/product/delete', ProductsCoontroller.deleteProduct);

module.exports = routes;