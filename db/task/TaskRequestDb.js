var mysql = require('mysql');
module.exports = {
    taskQuery(type, email, taskId) {
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
                        ) AS taskModelDesc,
                        t.start_date as startDate
                    FROM
                        task t
                    WHERE
                        t.del_flag = 0
                  `;
        if (taskId) {
            sql += ` AND t.task_id = ${taskId}`;
        }
        if (type == 'mineCharge') {
            sql += ` AND t.charge_per = ${mysql.escape(email)}`;
        }
        sql += ` ORDER BY t.sort desc,t.create_date asc`;
        return sql;
    },
    queryTaskPro() {
        return `
                SELECT
                    l.task_progress_state_code taskPro,
                    l.task_progress_state_desc taskProDesc,
                    l.font_color as taskProFc,
                    l.bg_color as taskProBc,
                    l.icon as icon
                FROM
                    task_progress_state_l l
                where l.del_flag = 0
                            ORDER BY
                l.task_progress_state_code DESC
               `;
    },
    addTask(taskTitle, email, chargePer, taskModelId) {
        taskModelId = taskModelId ? taskModelId : 0;
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
                         create_date = SYSDATE(),
                         task_model_id = ${taskModelId}
                       `;
        if (taskTitle) {
            querySql += ` ,task_title =${mysql.escape(taskTitle)}`;
        }
        if (chargePer) {
            querySql += ` ,charge_per =${mysql.escape(chargePer)}`;
        }
        return querySql;
    },
    queryTaskModel() {
        return `select t.task_model_id as taskModelId,t.task_model_desc as taskModelDesc from task_model t where t.del_flag = 0`;
    },
    updateTask(taskId, taskModelId) {
        return `update task t set t.task_model_id = ${taskModelId} where t.task_id = ${taskId}`;
    },
    getTaskStateList() {
        return `select l.task_progress_state_code taskState,l.task_progress_state_desc taskStateDesc,l.icon icon,l.font_color fc,l.bg_color bc from task_progress_state_l l where l.del_flag = 0`;
    },
    updateTaskState(taskId, taskState) {
        return `update task t set t.progress_state = ${taskState} where t.task_id = ${taskId}`;
    },
    updateTaskTime(taskId, startDate, endDate) {
        var querySql = `
                        UPDATE task t
                        SET t.task_id = ${taskId} `;
        if (startDate) {
            querySql += `,t.start_date = STR_TO_DATE(${mysql.escape(startDate)},'%Y-%m-%d %H:%i:%s')`;
        }
        if (endDate) {
            querySql += `,t.end_date = STR_TO_DATE(${mysql.escape(endDate)},'%Y-%m-%d %H:%i:%s')`;
        }
        querySql += ` WHERE t.task_id = ${taskId}`;
        return querySql;
    }
};