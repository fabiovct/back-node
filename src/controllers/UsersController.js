const db_connection = require('./../db_connection');

module.exports = {
    async selectUsers(req, res, next) {
        db_connection.query('SELECT id, email FROM users', function (err, rows, fields){
            if (!err)
          res.json(rows)
        else
          res.json([{
            status: 'failed',
            errMsg: 'Error while performing query.'
          }])
        });
    
    }
    
}