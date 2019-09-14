var DbUtils = require('../../DbUtils');
var TaskRequestDb = require('../../db/task/TaskRequestDb.js');
var TaskRequest = {
    taskQuery(req, res) {
        var querySql = TaskRequestDb.taskQuery(req.query.type, req.query.email);
        console.log(querySql);
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
    }
};

module.exports = TaskRequest;