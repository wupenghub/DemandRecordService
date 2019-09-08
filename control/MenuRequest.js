var DbUtils = require('../DbUtils');
var MenuRequestDb = require('../db/MenuRequestDb.js');
var MenuRequest = {
    menusQuery(req, res) {
        var querySql = MenuRequestDb.menusQuery();
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

module.exports = MenuRequest;