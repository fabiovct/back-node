const { authSecret } = require('./../../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const jwt = require('jwt-simple');
const db_connection = require('./../db_connection');

module.exports = {
async  token(req,response, next){
    //console.log(ExtractJwt.fromHeader('auth'))
   const params = {
        secretOrKey: authSecret,
        jwtFromRequest: req.headers.auth
    }

    try {
        const token = jwt.decode(req.headers.auth, authSecret)
        db_connection.query('SELECT * FROM users WHERE id = ?', [token.id], function(error, results, fields) {
            if (results.length > 0) {
                return next();
            } else {
                response.json([{
                    status: 'false',
                  }]);
            }			
            response.end();
        });
        
    } catch(e){
        response.send(false)
    }
//console.log(token.id)
/*db_connection.query('SELECT * FROM users WHERE id = ?', [token.id], function(error, results, fields) {
    if (results.length > 0) {
        response.json([{
            status: 'true',
          }]);
        //response.redirect('/');
    } else {
        response.json([{
            status: 'false',
          }]);
    }			
    response.end();
});*/
//response.end();
 

    /*const strategy = new Strategy(params, (payload, done) => {
        db_connection.query('SELECT * FROM users WHERE id = ?', [payload.id], function(error, results, fields) {
      }).then(user => done(null, user ? { ...payload } : false))
      .catch(err => done(err, false))
    })*/
    //console.log(passport.use(strategy))
    //passport.use(strategy)
    //console.log(passport.Authenticator)
        /*app.db('users')
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? { ...payload } : false))
            .catch(err => done(err, false))
    })

    return{
        authenticate: () => passport.authenticate('jwt', {session:false})
    }*/
    
    //passport.use(strategy)
    //console.log(passport.use(strategy))
    //res.json(passport.authenticate('jwt', { session: false }))
    
        //res.json({authenticate: () => passport.authenticate('jwt', { session: false })})
    
    //console.log( passport.authenticate('jwt', {session:false}))

       // authenticate: () => passport.authenticate('jwt', { session: false })

}
    

}