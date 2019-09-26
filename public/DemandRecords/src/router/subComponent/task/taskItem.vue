<template>
    <div class="contain" v-show="showItem">
        <div class="box-card item-card" :style="{paddingBottom:showAdd?'35px':'10px'}" style="padding-bottom: 10px">
            <div class="header clearfix">
                <span class="title">{{categoryListArray.desc}}</span>
                <div class="task-count">
                    <span class="wc-count">{{categoryListArray.taskPro[0] ? categoryListArray.taskPro[0].count : 0}}</span>
                    <span class="separator">/</span>
                    <span class="ing-count">{{categoryListArray.taskPro[1] ? categoryListArray.taskPro[1].count : 0}}</span>
                    <span class="separator">/</span>
                    <span class="ws-count">{{categoryListArray.taskPro[2] ? categoryListArray.taskPro[2].count : 0}}</span>
                </div>
                <div class="bar">
                    <div :class="['bar_percentage',item.barClass]" v-for="item in categoryListArray.taskPro"
                         :style="{width:(item.count/totalCount)*100+'%',float:'left'}">

                    </div>
                </div>
            </div>
            <div class="content">
                <div class="item-card item-content" v-for="item in mineChargeList" @click="showTaskDetail()"
                     @mouseup="keyUp()" @mousedown="keyDown($event,item)" @mousemove="keyMove($event,item)">
                    <div class="inner-card  clearfix">
                        <span :class="item.bgc" @click.stop="showTaskPro(item)"><i
                                :class="item.icon"></i>{{item.taskProDesc}}</span>
                        <span class="charge_per">{{item.nickName}}</span>
                        <!-- <div class="task-pro-list" @click="chooseTaskPro($event,item)">

                         </div>-->
                    </div>
                    <div class="task-title">{{item.taskTitle}}</div>
                    <div class="trips clearfix">
                        <span class="task-id trip" v-if="item.taskId">任务编号：{{item.taskId}}</span>
                        <span class="task-id trip" v-if="item.belong">所属项目：{{item.belongDesc}}</span>
                        <span :class="['task-id',currentTime < item.endDate ? 'trip':'trip-out-time']"
                              v-if="item.endDate">截止时间：{{item.endDate}}</span>
                        <i class="el-icon-document-checked font_focus_color icon"></i>
                    </div>
                </div>
                <div :class="['add-info',showAdd?'hide-animation':'show-animation']">
                    <div class="box" v-show="!showAdd">
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
                </div>
            </div>
            <div class="bottom">
                <div class="add_task" @click="showAddTask()" v-if="showAdd">
                    <i class="fa fa-plus"></i>
                    <span style="margin-left: 10px">添加新任务</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @keyframes showAddInfo {
        from {
            height: 0;
        }
        to {
            height: 130px;
        }
    }

    @keyframes hideAddInfo {
        from {
            height: 130px;
        }
        to {
            height: 0;
        }
    }

    .item-card {
        background: #fdfdfd;
        border-radius: 3px;
        padding: 17px 10px 10px;
    }

    .box-card {
        width: 290px;
        position: relative;
        padding-bottom: 35px;
        user-select: none;
        .header {
            height: 35px;
            line-height: 25px;
            margin-bottom: 10px;
            .bar_percentage {
                height: 6px;
            }
            .task-count {
                display: inline-block;
                text-align: center;
                .separator {
                    margin: 0 1px;
                    color: #aaa;
                }
                .wc-count {
                    color: #22d7bb;
                }
                .ing-count {
                    color: #ffc442;
                }
                .ws-count {
                    color: #aaa;
                }
            }
            .ing {
                background: #ffc442;
            }
            .wc {
                background: #22d7bb;
            }
            .ws {
                background: #eee;;
            }
        }
        .font_focus_color {
            color: #22d7bb;
            font-size: 23px;
        }
        .title {
            font-size: 16px;
            display: inline-block;
            height: 24px;
            margin-bottom: 10px;
            margin-right: 10px;
        }
        .content {
            transition: all linear 2s;
            padding: 5px;
            .item-content {
                margin-bottom: 10px;
                box-shadow: 0 1px 8px 0 rgba(0, 0, 0, .1)

            }
            .item-content:hover {
                cursor: pointer;
                box-shadow: 0 2px 13px 1px rgba(0, 0, 0, .15)

            }
            .inner-card {
                position: relative;
                span.task-state {
                    font-size: 12px;
                    display: inline-block;
                    background-color: rgba(255, 164, 21, 0.1);
                    padding: 5px 10px;
                    height: 28px;
                    line-height: 18px;
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
                    float: right;
                }
                .task-pro-list {
                    width: 240px;
                    height: 130px;
                    position: absolute;
                    padding: 5px 0;
                    background-color: #ffffff;
                    top: 25px;
                    left: -80px;
                    box-shadow: 0 2px 13px 1px rgba(0, 0, 0, .15);
                    z-index: 999;
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
            .add-info {
                margin-top: 10px;
                height: 0px;
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
            .show-animation {
                animation: showAddInfo .3s;
                height: 130px;
            }
            .hide-animation {
                animation: hideAddInfo .3s;
                height: 0px;
            }
        }
        .bottom {
            position: absolute;
            bottom: 5px;
            left: 15px;
            .add_task {
                color: #666;
                height: 35px;
                margin-bottom: 5px;
            }
            .add_task:hover {
                color: #404040;
                cursor: pointer;
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
                currentTime: moment(new Date()).format('YYYY-MM-DD'),
                taskCountList: [],
                totalCount: 0,
                showItem: false,
                mouseDown: false,
                rootParent: null
            }
        },
        created() {
            this.injectData(this.categoryListArray);
        }
        ,
        methods: {
            showAddTask() {
                this.showAdd = !this.showAdd;
            },
            cancel() {
                this.showAdd = true;
            },
            created() {
            },
            addTask() {
                if (this.taskTitle) {
                    var taskModelId = this.categoryListArray.key;
                    utils.request(this, {
                        url: '/addTask',
                        method: 'post',
                        data: {
                            taskTitle: this.taskTitle,
                            email: '565784355@qq.com',
                            chargePer: '565784355@qq.com',
                            taskModelId
                        },
                    }, data => {
                        this.taskTitle = '';
                        if (data.returnData.affectedRows > 0) {
                            this.$emit('fun');
                            // this.injectData(this.categoryListArray);
                        }
                    }, error => {

                    }, true);
                }
            },
            injectData(data) {
                if (data) {
                    this.mineChargeList = data.ListArry;
                    this.totalCount = 0;
                    this.categoryListArray.taskPro.forEach(item => {
                        this.totalCount += item.count;
                        if (item.taskPro == 0) {
                            item.barClass = 'ws';
                        } else if (item.taskPro == 1) {
                            item.barClass = 'ing';
                        } else {
                            item.barClass = 'wc';
                        }
                    });
                    this.mineChargeList.map(item => {
                        if (item.endDate)
                            item.endDate = moment(item.endDate).format('YYYY-MM-DD');
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
                    });
                    this.showItem = true;
                }
            },
            showTaskPro(item) {
            },
            showTaskDetail() {
            },
            chooseTaskPro(e, item) {
                console.log(e.target.className)
                if (e.target.className == 'task-pro-list') {
                    alert('chooseTaskPro');
                }
            },
            keyDown(e, item) {
                this.mouseDown = true;
                var dd = e.target;
                if (this.mouseDown) {
                    /*var startX = e.target.offsetLeft;
                    console.log(startX)
                    console.log(e.target)*/
                    this.findRootParent(dd);
                    console.log(this.rootParent);


                }
            },
            keyUp() {
                this.mouseDown = false;
            },
            keyMove(e) {

            },
            findRootParent(dd) {
                if (dd.className != 'item-card item-content') {
                    this.findRootParent(dd.parentNode)
                } else {
                    this.rootParent = dd;
                }
            }
        },
        props: ['categoryListArray'],
        watch: {
            'categoryListArray': function (newval) {
                this.injectData(this.categoryListArray);
            }
        }
    }
</script>