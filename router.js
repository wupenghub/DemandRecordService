var express = require('express');
var router = express.Router();
var DbUtils = require('./DbUtils');
var mail = require('./util/mail');
var md5 = require('md5-node');
var uuid = require('node-uuid');
let excelUtils = require('./util/ExcelUtils.js');
var mysql = require('mysql');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var path = require('path');
router.get('/',(req,res) => {
    res.redirect('/public/DemandRecords/dist/');
});
module.exports = router;
