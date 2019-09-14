var mysql = require('mysql');
module.exports = {
    taskQuery(type, email) {
        var sql = `
                    SELECT
                        t.task_id AS taskId,
                        t.progress_state AS taskPro,
                        (
                            SELECT
                                tpl.task_progress_state_desc
                            FROM
                                task_progress_state_l tpl
                            WHERE
                                tpl.task_progress_state_code = t.progress_state
                        ) AS taskProDesc,
                        (
                            SELECT
                                u.nickname
                            FROM
                                sys_user u
                            WHERE
                                u.email = t.charge_per
                        ) AS nickName,
                        t.task_title AS taskTitle,
                        t.end_date AS endDate
                    FROM
                        task t
                    WHERE
                        t.del_flag = 0
                  `;
        if (type == 'mineCharge') {
            sql += ` AND t.charge_per = ${mysql.escape(email)}`;
        }
        return sql;
    }
}