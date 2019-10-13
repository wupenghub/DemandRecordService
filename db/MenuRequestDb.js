var mysql = require('mysql');
module.exports = {

    menusQuery(menuType,parentCode) {
        var sql = `
                    SELECT
                        m.icon,
                        m.menu_desc AS descr,
                        m.path,
                        m.icon_nomal AS iconNormal,
                        m.icon_hover AS iconHover,
                        m.parent_code as parentCode,
                        m.menu_code as menuCode
                    FROM
                        menu m
                    WHERE
                        m.del_flag = 0
                   `;
        if(menuType)
            sql+=` And m.menu_type=${mysql.escape(menuType)}`;
        if(parentCode)
            sql+=` And m.parent_code=${mysql.escape(parentCode)}`;
        return sql;
    }
}