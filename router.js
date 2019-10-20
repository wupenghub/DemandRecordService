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
    TaskRequest.taskQuery(req, res);
});
router.post('/addTask', (req, res) => {
    TaskRequest.addTask(req, res);
});
router.post('/updateTask', (req, res) => {
    TaskRequest.updateTask(req, res);
});
router.get('/getTaskStateList', (req, res) => {
    TaskRequest.getTaskStateList(req, res);
});
router.post('/updateTaskState', (req, res) => {
    TaskRequest.updateTaskState(req, res);
});
router.post('/updateTaskTime', (req, res) => {
    TaskRequest.updateTaskTime(req, res);
});
router.get('/selectTaskInfo', (req, res) => {
    TaskRequest.selectTaskInfo(req, res);
});
router.post('/updateTaskPriority', (req, res) => {
    TaskRequest.updateTaskPriority(req, res);
});
router.get('/selectLabelList',(req,res)=>{
    TaskRequest.selectLabelList(req,res);
});
router.post('/updateTaskLabel',(req,res)=>{
    TaskRequest.updateTaskLabel(req,res);
});
router.post('/updateTaskDesc',(req,res)=>{
    TaskRequest.updateTaskDesc(req,res);
});
router.post('/saveComment',(req,res)=>{
    TaskRequest.saveComment(req,res);
});
router.get('/test', (req, res) => {

});
module.exports = router;
