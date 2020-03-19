//require("dotenv-safe").config();
var jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const app = express();  
const db_connection = require('./db_connection');
console.log('API funcionando!');


app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..','uploads')));
app.use(routes);

app.listen(3333);