////////////////////////////////////////
// Server Config
////////////////////////////////////////
var path = require('path'),
    users = require('../controllers/users.js')

////////////////////////////////////////
// Login Middleware
////////////////////////////////////////


function loginAuthentication(req,res,next){
    if (req.session.userId){
        next();
    } else {
        res.status(401).send("User not found");
    }
}

module.exports = function(app){
    app.get('/', users.index);
    app.post('/create', users.create);
    app.post('/login', users.login);
    app.use(loginAuthentication);
    app.get('/home', users.home);
    app.post('/appointment', users.appt);
    app.get('/appointment', users.allAppts);
    app.post('/appointment/date', users.checkDate);
    app.post('/appointment/delete', users.deleteAppt);
}