const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const db_connection = require('./db_connection');




//const SessionController = require('./controllers/SessionController');
//const SpotController = require('./controllers/SpotController');
//const DashboardController = require('./controllers/DashboardController');
//const BookingController = require('./controllers/BookingController');

const routes = express.Router();


routes.get('/', function (req, res, next){
    db_connection.query('SELECT id, email FROM users', function (err, rows, fields){
        if (!err)
      res.json({
        status: 'success',
        data: rows
      })
    else
      res.json([{
        status: 'failed',
        errMsg: 'Error while performing query.'
      }])

    });

});
//list
routes.get('/product', function (req, res, next){
  db_connection.query('SELECT * FROM products', function (err, rows, fields){
      if (!err)
    res.json({
      status: 'success',
      data: rows
    })
  else
    res.json([{
      status: 'failed',
      errMsg: 'Error while performing query.'
    }])

  });

});
//create
routes.post('/product/create', function (req, res){
  
  data = req.body
  db_connection.query('INSERT INTO products SET ?', data, function (err, rows){
      if (!err)
    res.status(200).json({
      status: 'success',
      data: rows
    })
  else
    res.status(502).json([{
      status: 'failed',
      errMsg: 'Error while performing query.'
    }])

  });

});
//selectbyid
routes.get('/id/:id', function (req, res){
  db_connection.query('SELECT * FROM products where id = ?', req.params.id, function (err, rows){
      if (!err)
    res.json({
      status: 'success',
      data: rows
    })
  else
    res.json([{
      status: 'failed',
      errMsg: 'Error while performing query.'
    }])

  });

});
//edit
routes.put('/product/edit', (req, res) => {
  data = req.body
  id = data.id

  delete data.id
  // console.log(id)
  // res.sendStatus(200)
  db_connection.query("UPDATE products set ? where id = ? ", [data,id], function (err, rows) {
    if (!err)
      res.status(200).json([{
        status: 'success',
      }])
    else
      res.status(502).json([{
        status: 'failed',
        errMsg: 'Error while updating data.'
      }])
  })
})

routes.delete('/product/delete', (req, res) => {
  db_connection.query("DELETE FROM products where id = ? ", req.body.id, function (err, rows) {
    if (!err)
      res.status(200).json([{
        status: 'success',
      }])
    else
      res.status(502).json([{
        status: 'failed',
        errMsg: 'Error while updating data.'
      }])
  })

})
//const upload = multer(uploadConfig);

//routes.post('/sessions', SessionController.store);

//routes.get('/spots', SpotController.index);
//routes.post('/spots', upload.single('thumbnail') , SpotController.store);

//routes.get('/dashboard', DashboardController.show);

//routes.post('/spots/:spot_id/bookings', BookingController.store);

module.exports = routes;