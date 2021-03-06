var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./src/utilities/config');
//var db = 'mongodb://localhost:27017/seekpick';
//mongoose.connect(db);
mongoose.connect(config.db);
//mongoose.connect(process.env.MONGODB_URI);
require('./src/utilities/userpassport')(passport);
var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(express.static('public'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(passport.initialize());

var indexRoute=require('./src/routes/index');
var lawyerroute=require('./src/routes/index2');
var docRoute=require('./src/routes/document');

app.use('/',indexRoute);
app.use('/lawyer',lawyerroute);
app.use('/doc',docRoute);


app.listen(app.get('port'),function(err) {
    if(!err)
    {
        console.log("server started at port 3000");
    }
});