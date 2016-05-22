var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var morgan = require('morgan');

var port = process.env.PORT || 9000;
var app = express();

var dbUrl = 'mongodb://localhost/ikitchen';
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connect to the ikitchen sucessfully!");
});

app.set('views', 'app/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({
    secret:'ikitchen',
    store : new mongoStore({
        url:dbUrl,
        collection: 'sessions'
    })
}));

if ("development" === app.get('env')) {
    app.set("showStackError", true);
    app.use(morgan(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

require('./config/routes')(app);

app.locals.moment = require('moment');
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);

console.log('server started on port ' + port);