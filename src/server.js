const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const app = express();  
const db_connection = require('./db_connection');

//configurando o body parser para pegar POSTS mais tarde
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

//definindo as rotas
/*const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
router.get('/clientes', (req, res) =>{
    execSQLQuery('SELECT * FROM users', res);
})
app.use('/', router);*/

//inicia o servidor
//app.use(routes);
//app.listen(port);
console.log('API funcionando!');


/*function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : 'localhost',
      port     : 3306,
      user     : 'root',
      password : '',
      database : 'back-laravel'
    });
  
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
  }*/

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..','uploads')));
app.use(routes);

app.listen(3333);