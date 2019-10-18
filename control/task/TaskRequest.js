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
    },
    updateTaskState(req, res) {
        var querySql = TaskRequestDb.updateTaskState(req.body.taskId, req.body.taskState);
        console.log('更新任务状态updateTaskState:' + querySql);
        DbUtils.queryData(querySql, result => {
            querySql = TaskRequestDb.taskQuery(null, null, req.body.taskId);
            DbUtils.queryData(querySql, result => {
                res.json({
                    code: 0,
                    returnData: result
                })
            }, error => {
                res.json({
                    code: -1,
                    returnData: error
                })
            })
        }, error => {
            res.json({
                code: -1,
                returnData: error
            })
        });
    },
    updateTaskTime(req, res) {
        var querySql = '';
        if (req.body.type == 'start') {
            querySql = TaskRequestDb.updateTaskTime(req.body.taskId, req.body.startDate);
        } else {
            querySql = TaskRequestDb.updateTaskTime(req.body.taskId, null, req.body.endDate);

        }
        console.log('updateTaskTime修改任务开始时间：' + querySql);
        DbUtils.queryData(querySql, reslut => {
            querySql = TaskRequestDb.taskQuery(null, null, req.body.taskId);
            DbUtils.queryData(querySql, result => {
                res.json({
                    code: 0,
                    returnData: result
                })
            }, error => {
                res.json({
                    code: -1,
                    returnData: error
                })
            })
        }, error => {
            res.json({
                code: -1,
                returnData: error
            })
        })
    },
    selectTaskInfo(req, res) {
        var querySql = TaskRequestDb.selectTaskInfo(req.query.taskId);
        console.log('selectTaskInfo查询任务基本信息：' + querySql);
        DbUtils.queryData(querySql, data => {
            var resultData = {};
            resultData.taskInfoList = data;
            querySql = TaskRequestDb.queryTaskPriority();
            console.log('selectTaskInfo查询任务优先级：' + querySql);
            DbUtils.queryData(querySql, data => {
                resultData.taskPriorityList = data;
                querySql = TaskRequestDb.queryPartInPer(req.query.taskId);
                console.log('selectTaskInfo查询任务参与人：' + querySql);
                DbUtils.queryData(querySql, data => {
                    resultData.partPerList = data;
                    querySql = TaskRequestDb.queryTaskLabel(req.query.taskId);
                    DbUtils.queryData(querySql, data => {
                        resultData.taskLabelList = data;
                        res.json({
                            code: 0,
                            resultData
                        })
                    }, error => {
                        res.json({
                            code: -1,
                            resultData: error
                        })
                    })
                }, error => {
                    res.json({
                        code: -1,
                        resultData: error
                    })
                })
            }, error => {
                res.json({
                    code: -1,
                    resultData: error
                })
            });
        }, error => {
            res.json({
                code: -1,
                resultData: error
            })
        });
    },
    updateTaskPriority(req, res) {
        var taskId = req.body.taskId;
        var priority = req.body.priority;
        var querySql = TaskRequestDb.updateTaskPriority(taskId, priority);
        DbUtils.queryData(querySql, data => {
            res.json({
                code: 0
            });
        }, error => {
            res.json({
                code: -1
            });
        })
    },
    selectLabelList(req, res) {
        var querySql = TaskRequestDb.selectLabelList();
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
    },
    updateTaskLabel(req, res) {
        var type = req.body.type;
        var taskId = req.body.taskId;
        var taskLabelCode = req.body.taskLabelCode;
        var querySql = '';
        if (type == 'remove') {
            querySql = TaskRequestDb.removeTaskLabel(taskId, taskLabelCode);
        } else if (type == 'add') {
            querySql = TaskRequestDb.addTaskLabel(taskId, taskLabelCode);
        }
        console.log('updateTaskLabel:'+querySql);
        DbUtils.queryData(querySql,data=>{
            res.json({
                code:0
            });
        },error=>{
            res.json({
                code:-1
            });
        })
    }
};

module.exports = TaskRequest;