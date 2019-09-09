module.exports = {
    menusQuery() {
        return `
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
                AND m.menu_type = 'sideMenu'
               `;
    }
}