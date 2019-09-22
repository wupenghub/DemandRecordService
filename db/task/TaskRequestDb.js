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
                        t.end_date AS endDate,
                        t.task_model_id AS taskModelId,
                        (
                            SELECT
                                tm.task_model_desc
                            FROM
                                task_model tm
                            WHERE
                                tm.task_model_id = t.task_model_id
                        ) AS taskModelDesc
                    FROM
                        task t
                    WHERE
                        t.del_flag = 0
                  `;
        if (type == 'mineCharge') {
            sql += ` AND t.charge_per = ${mysql.escape(email)}`;
        }
        return sql;
    },
    queryTaskPro() {
        return `
                SELECT
                    l.task_progress_state_code taskPro,
                    l.task_progress_state_desc taskProDesc
                FROM
                    task_progress_state_l l
                where l.del_flag = 0
                            ORDER BY
                l.task_progress_state_code DESC
               `;
    },
    addTask(taskTitle, email, chargePer) {
        var querySql = `
                        INSERT INTO task
                        SET task_id = (
                            SELECT
                                max(t.task_id) + 1
                            FROM
                                task t
                            WHERE
                                t.create_per = create_per
                        ),
                         create_per = ${mysql.escape(email)},
                         create_date = SYSDATE()
                       `;
        if (taskTitle) {
            querySql += ` ,task_title =${mysql.escape(taskTitle)}`;
        }
        if (chargePer) {
            querySql += ` ,charge_per =${mysql.escape(chargePer)}`;
        }
        return querySql;
    }
};