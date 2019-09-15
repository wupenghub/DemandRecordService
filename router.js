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
var MenuRequest = require('./control/MenuRequest.js');
var TaskRequest = require('./control/task/TaskRequest.js');
router.get('/', (req, res) => {
    res.redirect('/public/DemandRecords/dist/');
});
router.get('/menus', (req, res) => {
    MenuRequest.menusQuery(req, res);
});
router.get('/getTasks', (req, res) => {
    TaskRequest.taskQuery(req,res);
});
router.post('/addTask',(req,res)=>{
    TaskRequest.addTask(req,res);
});
router.get('/test', (req, res) => {

});
module.exports = router;
