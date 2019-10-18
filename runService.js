var express = require('express');
//后台管理统一路由接口
var router = require('./router');
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
const compression = require('compression');
app.use(compression({ threshold: 9 }))
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(router);
app.use('/public/', express.static('./public/'));
app.use('/node_modules/', express.static('./node_modules/'));
app.use('/uploads/', express.static('./uploads/'));
app.listen(5000, function () {
    console.log('Running...');
});
