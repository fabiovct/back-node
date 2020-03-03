const db_connection = require('./../db_connection');
var session = require('express-session');

module.exports = {
    
    async listProducts(req, res, next) {
        if(!session.email){
            res.send('Acesso Negado');
            res.end();
        } else {
            db_connection.query('SELECT * FROM products', function (err, rows, fields){
                if (!err)
              res.json(rows)
            else
              res.json([{
                status: 'failed',
                errMsg: 'Error while performing query.'
              }])
            });
        }
        
    },

    async createProduct(req, res, next) {
        if(!session.email){
            res.send('Acesso Negado');
            res.end();
        } else {
        data = req.body
        db_connection.query('INSERT INTO products SET ?', data, function (err, rows){
        if (!err)
            res.json(data) 
        else
            res.status(502).json([{
            status: 'failed',
            errMsg: 'Error while performing query.'
        }])
        });
    }
    },
    
    async selectById(req,res){
        if(!session.email){
            res.send('Acesso Negado');
            res.end();
        } else {
        db_connection.query('SELECT * FROM products where id = ?', req.params.id, function (err, rows){
            if (!err)
          res.json(rows)
        else
          res.json([{
            status: 'failed',
            errMsg: 'Error while performing query.'
          }])
        });
    }
    },

    async editProduct(req,res){
        if(!session.email){
            res.send('Acesso Negado');
            res.end();
        } else {
        data = req.body
        id = data.id
        delete data.id
    db_connection.query("UPDATE products set ? where id = ? ", [data,id], function (err, rows) {
        if (!err)
            res.json(data)
        else
            res.status(502).json([{
            status: 'failed',
            errMsg: 'Error while updating data.'
        }])
        })
    }    
    },

    async deleteProduct(req,res){
        if(!session.email){
            res.send('Acesso Negado');
            res.end();
        } else {
        db_connection.query("DELETE FROM products where id = ? ", req.body.id, function (err, rows) {
            if (!err)
              res.json('sucesso')
            else
              res.status(502).json([{
                status: 'failed',
                errMsg: 'Error while updating data.'
            }])
        })
    }
    }
}