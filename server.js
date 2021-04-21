// requiring express module
const express = require('express')
// assigning the express module object to app
const app = express()
// assigning MongoClient to mongodb MongoClient which is a module
const MongoClient = require('mongodb').MongoClient
mongo = require('mongodb')
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');
var configDB = require('./config/database.js');
var morgan       = require('morgan');
var mongoose = require('mongoose');

// assigning PORT  2121
const PORT = 3000

// connecting to the data base and uses a promise
mongoose.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
    if (err) return console.log(err)
    const client = new MongoClient(configDB.url);
    client.connect((err) => {
      console.log(`Connected to ${configDB.dbName} Database`)
      db = client.db(configDB.dbName)
      require('./app/routes/routes.js')(app, passport, db);
      require('./app/routes/login-route.js')(app, passport, db);
      require('./app/routes/sign-up-routes.js')(app, passport, db);
      require('./app/routes/logout-route.js')(app, passport, db);
    })

})

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }))

// This tells Express we’re using EJS as the template engine.
app.set('view engine', 'ejs')

// tells express to render the public folder
app.use(express.static('public'))

// does what body parser did
app.use(express.urlencoded({ extended: true }))

// required for passport
app.use(session({
    secret: 'mortgageCalculation', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// send response as json format
app.use(express.json())
app.use(flash()); // use connect-flash for flash messages stored in session


// process.env.PORT is for hosting otherwise its PORT 2121
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
