var express = require('express');
//后台管理统一路由接口
var router = require('./router');
var mysql = require('mysql');
var DbUtils = require('./DbUtils');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.engine('html', require('express-art-template'));
app.set('views', './views');
app.disable('view cache');
app.use(cookieParser());
app.use(session({
        secret: '12345',
        cookie: {maxAge: 300000},
        resave: true,
        saveUninitialized: false
    }
));
app.use(router);
app.use('/public/', express.static('./public/'));
app.use('/node_modules/', express.static('./node_modules/'));
app.use('/uploads/', express.static('./uploads/'));
app.listen(3000, function () {
    console.log('Running...');
});
