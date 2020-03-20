//require("dotenv-safe").config();
//var jwt = require('jsonwebtoken');
const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const UserController = require('./controllers/UsersController');
const AuthController = require('./controllers/AuthController');
const ProductsCoontroller = require('./controllers/ProductsController');
const passport = require('./config/passport');
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

routes.post('/login', AuthController.login);
routes.post('/validateToken', AuthController.validateToken);

//users
routes.route('/api/users').all(passport.token)
  .get(UserController.selectUsers);

routes.get('/logout', UserController.logout);

//routes.get('/api/users', UserController.selectUsers);
//products
routes.route('/api/product').all(passport.token)
  .get( ProductsCoontroller.listProducts)
  .post( ProductsCoontroller.createProduct)
  .put(ProductsCoontroller.editProduct)
  .delete( ProductsCoontroller.deleteProduct)
routes.route('/api/product/:id').all(passport.token)
  .get(ProductsCoontroller.selectById);


module.exports = routes;