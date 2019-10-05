var DbUtils = require('../../DbUtils');
var TaskRequestDb = require('../../db/task/TaskRequestDb.js');
var TaskRequest = {
    taskQuery(req, res) {
        var querySql = TaskRequestDb.taskQuery(req.query.type, req.query.email);
        console.log('taskQuery查询任务明细：' + querySql);
        DbUtils.queryData(querySql, result => {
            var querySql = TaskRequestDb.queryTaskPro();
            var returnData = {};
            returnData.taskList = result;
            DbUtils.queryData(querySql, result => {
                returnData.taskPro = result;
                var queryTaskModelSql = TaskRequestDb.queryTaskModel();
                DbUtils.queryData(queryTaskModelSql, result => {
                    returnData.taskModel = result;
                    res.json({
                        code: 0,
                        returnData: returnData
                    })
                }, error => {
                    res.json({
                        code: -1,
                        error
                    })
                });

            }, error => {
                res.json({
                    code: -1,
                    error
                })
            });
        }, error => {
            res.json({
                code: -1,
                error
            })
        });
    },
    addTask(req, res) {
        var querySql = TaskRequestDb.addTask(req.body.taskTitle, req.body.email, req.body.chargePer, req.body.taskModelId);
        console.log('addTask添加任务：' + querySql);
        DbUtils.queryData(querySql, result => {
            res.json({
                code: 0,
                returnData: result
            })
        }, error => {
            res.json({
                code: -1,
                error
            })
        });
    },
    updateTask(req, res) {
        var querySql = TaskRequestDb.updateTask(req.body.taskId, req.body.taskModelId);
        DbUtils.queryData(querySql, result => {
            res.json({
                code: 0,
                returnData: result
            })
        }, error => {
            res.json({
                code: -1,
                error
            })
        });

    },
    getTaskStateList(req, res) {
        var querySql = TaskRequestDb.getTaskStateList();
        DbUtils.queryData(querySql, data => {
            res.json({
                code: 0,
                returnData: data
            })
        }, error => {
            res.json({
                code: -1,
                returnData: error
            })
        })
    }
};

module.exports = TaskRequest;