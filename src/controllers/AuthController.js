const { authSecret } = require('./../../.env');
const db_connection = require('./../db_connection');
const jwt = require('jwt-simple');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./../routes')
var session = require('express-session');

module.exports = {
    
async login(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
    db_connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
        if (results.length > 0) {
            const now = Math.floor(Date.now()/1000)

            const payload = {
                id: results[0].id,
                name: results[0].name,
                email: results[0].email,
                iat: now,
                exp: now + (60 * 60)
            }
            //session.email = email
            res.json({
                ...payload,
                token: jwt.encode(payload, authSecret)
            }
                //[{
                //login: email,
                //status: 'true',
                //msg: 'Usuario logado com sucesso'
              //}]
              );
            //response.redirect('/');
        } else {
            res.json([{
                status: 'failed',
                errMsg: 'Incorrect Username and/or Password!'
              }]);
        }			
        res.end();
    });
} else {
    res.json([{
        status: 'failed',
        errMsg: 'Please enter Username and Password!'
      }]);
    res.end();
}
},

async validateToken(req, res) {
    const userData = req.body || null
    try {
        if(userData) {
            const token = jwt.decode(userData.token, authSecret)
            if(new Date(token.exp * 1000) > new Date()) {
                return res.send(true)
            }
        }
    } catch(e) {
        // problema com o token
    }

    res.send(false)
}


}