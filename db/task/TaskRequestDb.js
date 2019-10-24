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
                                CASE
                            WHEN (max(t.task_id) IS NULL) THEN
                                1
                            ELSE
                                max(t.task_id) + 1
                            END
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
    },
    selectTaskInfo(taskId) {
        return `
               SELECT
                    (
                        SELECT
                            p.project_name
                        FROM
                            project p
                        WHERE
                            p.project_code = t.project_code
                    ) AS projectName,
                    t.priority,
                    (
                        SELECT
                            l.task_priority_desc
                        FROM
                            task_priority_l l
                        WHERE
                            l.task_priority_code = t.priority
                    ) AS priorityDesc,
                    t.task_desc as taskDesc
                FROM
                    task t
                WHERE
                    t.task_id = ${taskId}
                `;
    },
    selectSonTaskInfo(parentTask) {
        return `
                   SELECT
                    t.progress_state AS proCode,
                    (
                        SELECT
                            l.task_progress_state_desc AS proDesc
                        FROM
                            task_progress_state_l l
                        WHERE
                            l.task_progress_state_code = t.progress_state
                    ) AS proDesc,
                    (
                        SELECT
                            l.icon
                        FROM
                            task_progress_state_l l
                        WHERE
                            l.task_progress_state_code = t.progress_state
                    ) AS icon,
                    (
                        SELECT
                            l.font_color
                        FROM
                            task_progress_state_l l
                        WHERE
                            l.task_progress_state_code = t.progress_state
                    ) AS fontColor,
                    (
                        SELECT
                            l.bg_color
                        FROM
                            task_progress_state_l l
                        WHERE
                            l.task_progress_state_code = t.progress_state
                    ) AS bgColor,
                    t.task_title AS taskTitle
                FROM
                    task t
                WHERE
                    t.parent_task = ${parentTask}
                `;
    },
    queryTaskPriority() {
        return `
                SELECT
                    l.task_priority_code AS priorityCode,
                    l.task_priority_desc priorityDesc,
                    bs.font_color as fontColor,
                    bs.bg_color as bgColor,
                    bs.font_size as fontSize,
                    bs.icon as icon
                FROM
                    task_priority_l l,
                basic_dispaly_setting bs
                WHERE
                    l.del_flag = 0
                and bs.basic_model_code = 'task_priority_model'
                and bs.basic_model_key = l.task_priority_code
               `;
    },
    queryPartInPer(taskId) {
        return `select t.val as partInPerCode,(select u.nickname from sys_user u where u.email = t.val) as partInPerName from task_char t where t.task_id = ${taskId} and t.key = 'part_in_per'`;
    },
    queryTaskLabel(taskId) {
        return `
                SELECT
                    bs.icon,
                    bs.font_color AS fontColor,
                    bs.bg_color AS bgColor,
                    l.task_label_desc AS labelDesc,
                    l.task_label_code AS labelCode,
                    l.task_label_flg as flg
                FROM
                    task t,
                    task_char c,
                    basic_dispaly_setting bs,
                    task_label_l l
                WHERE
                    t.task_id = c.task_id
                AND c.KEY = 'task_label'
                AND bs.basic_model_code = 'task_label_model'
                AND c.val = bs.basic_model_key
                AND l.task_label_code = c.val
                AND t.task_id = ${taskId}
                GROUP BY
                    bs.icon,
                    fontColor,
                    bgColor,
                    labelDesc,
                    labelCode
                `;
    },
    updateTaskPriority(taskId, priority) {
        return `UPDATE task t set t.priority = ${mysql.escape(priority)} where t.task_id = ${taskId}`;
    },
    selectLabelList() {
        return `
                SELECT
                    l.task_label_code AS labelCode,
                    l.task_label_desc AS labelDesc,
                    bs.bg_color AS bgColor,
                    bs.font_color AS fontColor,
                    bs.font_size AS fontSize,
                    bs.icon AS icon,
                    l.task_label_flg as flg
                FROM
                    task_label_l l,
                    basic_dispaly_setting bs
                WHERE
                    bs.basic_model_code = 'task_label_model'
                AND bs.basic_model_key = l.task_label_code
               `
    },
    addTaskLabel(taskId, taskLabelCode) {
        return `insert task_char set \`key\` = 'task_label',task_id = ${taskId},val = ${mysql.escape(taskLabelCode)}`;
    },
    removeTaskLabel(taskId, taskLabelCode) {
        return `
                DELETE
                FROM
                    task_char
                WHERE
                    task_id = ${taskId}
                AND \`KEY\` = 'task_label'
                AND val = ${mysql.escape(taskLabelCode)}
                `;
    },
    updateTaskDesc(taskId, taskDesc) {
        return `update task t set t.task_desc = ${mysql.escape(taskDesc)} where t.task_id = ${taskId};`;

    },
    queryTaskComments(taskId) {
        return `
                SELECT
                    tc.comment_id AS commentId,
                    tc.comment_desc AS commentDesc,
                    tc.create_per AS createPer,
                    (
                        SELECT
                            CASE
                        WHEN u.nickname IS NULL THEN
                            u.email
                        ELSE
                            u.nickname
                        END
                        FROM
                            sys_user u
                        WHERE
                            u.email = tc.create_per
                    ) AS createName,
                    tc.parent_comment AS parentComment,
                    tc.create_date AS createDate,
                    (
                        SELECT
                            CASE
                        WHEN u.nickname IS NULL THEN
                            u.email
                        ELSE
                            u.nickname
                        END
                        FROM
                            sys_user u
                        WHERE
                            u.email = (
                                SELECT
                                    t1.create_per
                                FROM
                                    task_comment t1
                                WHERE
                                    t1.comment_id = tc.parent_comment
                            )
                    ) as parentCommentName
                FROM
                    task_comment tc
                WHERE
                    tc.task_id = ${taskId}
                AND tc.del_flag = 0
                order by tc.create_date
               `;
    },
    saveComment(parentComment, comments, taskId, currentUser) {
        var querySql = `
                         INSERT INTO task_comment
                        SET create_per = ${mysql.escape(currentUser)},
                         create_date = sysdate(),
                         comment_desc = ${mysql.escape(comments)},
                         task_id = ${taskId}
                        `;
        if (parentComment) {
            querySql += `,parent_comment=${parentComment}`;
        }
        return querySql;
    }
};