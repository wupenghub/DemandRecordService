<template>
    <div class="contain">
        <el-card class="task-item box-card">
            <div slot="header" class="clearfix">
                <span class="title">收件箱</span>
            </div>
            <div class="content">
                <el-card class="card-item" v-for="item in mineChargeList">
                    <div class="inner-card clearfix">
                        <span :class="item.bgc"><i :class="item.icon"></i>{{item.taskProDesc}}</span>
                        <span class="charge_per">{{item.nickName}}</span>
                    </div>
                    <div class="task-title">{{item.taskTitle}}</div>
                    <div class="trips clearfix">
                        <span class="task-id trip" v-if="item.taskId">任务编号：{{item.taskId}}</span>
                        <span class="task-id trip" v-if="item.belong">所属项目：{{item.belongDesc}}</span>
                        <span :class="['task-id',currentTime < item.endDate ? 'trip':'trip-out-time']"
                              v-if="item.endDate">截止时间：{{item.endDate}}</span>
                        <i class="el-icon-document-checked font_focus_color icon"></i>
                    </div>
                </el-card>
            </div>
            <div class="bottom">
                <transition name="mybox">
                    <div class="add_info" v-if="!showAdd">
                        <textarea autofocus v-model="taskTitle" class="task_title">
                        </textarea>
                        <div class="info">
                            <div class="choose_task_type">
                                <i class="el-icon-document-checked font_focus_color"></i>
                                <span class="task_type">任务</span>
                                <span class="el-icon-arrow-down"></span>
                            </div>
                            <span class="current_user">吴鹏</span>
                            <i class="fa fa-calendar-check-o time"></i>
                        </div>
                        <div class="button_group">
                            <el-button round @click="addTask()">确定</el-button>
                            <span class="cancel" @click="cancel()">取消</span>
                        </div>
                    </div>
                    <div class="add_task" @click="showAddTask()" v-if="showAdd">
                        <i class="fa fa-plus"></i>
                        <span style="margin-left: 10px">添加新任务</span>
                    </div>
                </transition>
            </div>
        </el-card>
    </div>
</template>
<style lang="scss">
    .task-item {
        user-select: none;
        > .el-card__body {
            padding: 17px 10px 43px !important;
            overflow: auto;
            position: relative;
        }
        .el-card__body {
            padding: 12px 12px 7px !important;
        }
        .card-item {
            margin-bottom: 10px;
        }
        .card-item:hover {
            box-shadow: 0 2px 13px 3px rgba(0, 0, 0, .15) !important;
            cursor: pointer;

        }
    }
</style>
<style scoped lang="scss">
    .box-card {
        width: 290px;
        display: flex;
        flex-direction: column;
        .font_focus_color {
            color: #22d7bb;
            font-size: 23px;
        }
        .title {
            font-size: 16px;
        }
        .content {
            overflow: auto;
            flex: 1;
            .inner-card {
                margin-bottom: 10px;
                span.task-state {
                    font-size: 12px;
                    display: inline-block;
                    background-color: rgba(255, 164, 21, 0.1);
                    padding: 5px 10px;
                    height: 24px;
                    line-height: 14px;
                    float: left;
                    i {
                        margin-right: 5px;
                        font-weight: bolder;
                        color: rgb(255, 164, 21);
                    }
                }
                span.task-state-ws {
                    font-size: 12px;
                    display: inline-block;
                    background-color: rgba(250, 90, 85, 0.1);
                    padding: 5px 10px;
                    height: 24px;
                    line-height: 14px;
                    float: left;
                    i {
                        margin-right: 5px;
                        font-weight: bolder;
                        color: rgb(250, 90, 85);
                    }
                }
                span.task-state-wc {
                    font-size: 12px;
                    display: inline-block;
                    background-color: rgba(34, 215, 187, 0.1);
                    padding: 5px 10px;
                    height: 24px;
                    line-height: 14px;
                    float: left;
                    i {
                        margin-right: 5px;
                        font-weight: bolder;
                        color: rgb(34, 215, 187);
                    }
                }
                span.charge_per {
                    font-size: 12px;
                    display: inline-block;
                    width: 28px;
                    height: 28px;
                    background-color: rgb(45, 188, 255);
                    line-height: 26px;
                    float: right;
                    border-radius: 14px;
                    color: #ffffff;
                    text-align: center;
                    padding: 1px;
                }
            }
            .inner-card:hover {
                cursor: pointer;
            }
            .task-title {
                height: 25px;
                line-height: 25px;
                margin: 5px 0;
            }
            .trips {
                .trip {
                    float: left;
                    margin-right: 8px;
                    margin-bottom: 8px;
                    display: inline-block;
                    height: 20px;
                    font-size: 12px;
                    line-height: 12px;
                    background-color: rgba(102, 102, 102, .1);
                    padding: 4px 10px;
                    border-radius: 2px;
                    color: #aaa;
                }
                .trip-out-time {
                    float: left;
                    margin-right: 8px;
                    margin-bottom: 8px;
                    display: inline-block;
                    height: 20px;
                    font-size: 12px;
                    line-height: 12px;
                    background-color: rgba(255, 91, 87, .1);
                    padding: 4px 10px;
                    border-radius: 2px;
                    color: #ff5b57;
                }
                .icon {
                    float: left;
                    color: #22d7bb;
                    height: 20px;
                    display: inline-block;
                    line-height: 20px;

                }
            }
            .add_info {
                height: 130px;
                .task_title {
                    display: block;
                    width: 100%;
                    border-radius: 3px;
                    border: 1px solid #eee;
                    height: 52px;
                    outline: none;
                    margin-bottom: 10px;
                }
                .task_title:focus {
                    border-color: #22d7bb;
                }
                .task_title:hover {
                    border-color: #22d7bb;
                }
                .info {
                    height: 24px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .choose_task_type {
                        display: inline-flex;
                        flex-direction: row;
                        align-items: center;
                        margin-right: 16px;
                        .task_type {
                            margin: 0 3px;
                        }
                        .el-icon-arrow-down {
                            font-size: 16px;
                            color: #aaa
                        }
                    }
                    .choose_task_type:hover {
                        cursor: pointer;
                    }
                    .current_user {
                        display: inline-block;
                        width: 22px;
                        height: 22px;
                        border-radius: 11px;
                        line-height: 22px;
                        text-align: center;
                        overflow: hidden;
                        background-color: rgb(45, 188, 255);
                        color: #ffffff;
                        margin-right: 10px;
                    }
                    .current_user:hover {
                        cursor: pointer;
                    }
                    .time:hover {
                        color: #22d7bb;
                        cursor: pointer;
                    }
                }
                .button_group {
                    .el-button.el-button--default.is-round {
                        background: #22d7bb !important;
                        color: #ffffff;
                        border: none;
                        width: 70px;
                        height: 28px;
                        line-height: 28px;
                        padding: 0;

                    }
                    .el-button.el-button--default.is-round:hover {
                        box-shadow: 1px 1px 5px #22d7bb;
                    }
                    .cancel {
                        margin-left: 10px;
                        color: #aaa;
                    }
                    .cancel:hover {
                        cursor: pointer;
                        color: #22d7bb;
                    }
                }

            }
        }
        .bottom {
            > * {
                transition: all linear .2s;
            }
            .add_task {
                color: #666;
                height: 35px;
                margin-bottom: 5px;
                bottom: 0;
            }
            .add_task:hover {
                color: #404040;
                cursor: pointer;
            }
            .add_info {
                height: 130px;
                .task_title {
                    display: block;
                    width: 100%;
                    border-radius: 3px;
                    border: 1px solid #eee;
                    height: 52px;
                    outline: none;
                    margin-bottom: 10px;
                }
                .task_title:focus {
                    border-color: #22d7bb;
                }
                .task_title:hover {
                    border-color: #22d7bb;
                }
                .info {
                    height: 24px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .choose_task_type {
                        display: inline-flex;
                        flex-direction: row;
                        align-items: center;
                        margin-right: 16px;
                        .task_type {
                            margin: 0 3px;
                        }
                        .el-icon-arrow-down {
                            font-size: 16px;
                            color: #aaa
                        }
                    }
                    .choose_task_type:hover {
                        cursor: pointer;
                    }
                    .current_user {
                        display: inline-block;
                        width: 22px;
                        height: 22px;
                        border-radius: 11px;
                        line-height: 22px;
                        text-align: center;
                        overflow: hidden;
                        background-color: rgb(45, 188, 255);
                        color: #ffffff;
                        margin-right: 10px;
                    }
                    .current_user:hover {
                        cursor: pointer;
                    }
                    .time:hover {
                        color: #22d7bb;
                        cursor: pointer;
                    }
                }
                .button_group {
                    .el-button.el-button--default.is-round {
                        background: #22d7bb !important;
                        color: #ffffff;
                        border: none;
                        width: 70px;
                        height: 28px;
                        line-height: 28px;
                        padding: 0;

                    }
                    .el-button.el-button--default.is-round:hover {
                        box-shadow: 1px 1px 5px #22d7bb;
                    }
                    .cancel {
                        margin-left: 10px;
                        color: #aaa;
                    }
                    .cancel:hover {
                        cursor: pointer;
                        color: #22d7bb;
                    }
                }

            }
        }
    }
</style>
<script>
    import utils from '../../../utils/utils.js';
    import moment from '../../../lib/moment.min.js';

    export default {
        data() {
            return {
                showAdd: true,
                taskTitle: '',
                mineChargeList: [],
                currentTime: moment(new Date()).format('YYYY-MM-DD')
            }
        },
        created() {
            this.queryMineTask();
        },
        methods: {
            showAddTask() {
                this.showAdd = !this.showAdd;
            },
            cancel() {
                this.showAdd = true;
            },
            addTask() {
                if (this.taskTitle) {
                    utils.request(this, {
                        url: '/addTask',
                        method: 'post',
                        data: {taskTitle: this.taskTitle, email: '565784355@qq.com', chargePer: '565784355@qq.com'}
                    }, data => {
                        this.taskTitle = '';
                        if (data.returnData.affectedRows > 0) {
                            this.queryMineTask();
                        }
                    }, error => {

                    });
                }
            },
            queryMineTask() {
                utils.request(this, {
                    url: '/getTasks',
                    method: 'get',
                    params: {type: 'mineCharge', email: '565784355@qq.com'}
                }, data => {
                    this.mineChargeList = data.returnData;
                    console.log(this.mineChargeList)
                    this.mineChargeList.map(item => {
                        console.log(item.endDate)
                        if (item.endDate) {
                            item.endDate = moment(item.endDate).format('YYYY-MM-DD');
                        }
                    });
                    this.mineChargeList.forEach(item => {
                        if (item.taskPro == 0) {
                            item.icon = 'el-icon-time';
                            item.bgc = 'task-state-ws';
                        } else if (item.taskPro == 1) {
                            item.icon = 'el-icon-remove-outline';
                            item.bgc = 'task-state';
                        } else if (item.taskPro == 2) {
                            item.icon = 'el-icon-circle-check';
                            item.bgc = 'task-state-wc';
                        }
                    })
                }, error => {
                });
            }
        }
    }
</script>