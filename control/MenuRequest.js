var DbUtils = require('../DbUtils');
var MenuRequestDb = require('../db/MenuRequestDb.js');
var MenuRequest = {
    menusQuery(req, res) {
        var querySql = MenuRequestDb.menusQuery(req.query.menuType,req.query.parentCode);
        console.log('menusQuery:'+querySql)
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