<template>
    <div class="contain" @click="closeComment()">
        <el-dialog :visible.sync="showDialog" ref="eDialog">
            <div slot="title" class="detail-head">
                <span class="task-id-sp clearfix">
                    <span>{{this.$store.state.chooseTask && this.$store.state.chooseTask.taskId}}</span>
                </span>
                <ul class="right-box">
                    <li class="close" @click="closeDialog()">
                        <a class="el-icon-close"></a>
                    </li>
                    <li>
                        <el-tooltip effect="dark" content="更多" placement="bottom" :open-delay=500>
                            <a class="el-icon-more"></a>
                        </el-tooltip>
                    </li>
                    <li>
                        <el-tooltip effect="dark" content="发送到聊天" placement="bottom" :open-delay=500>
                            <a class="el-icon-position"></a>
                        </el-tooltip>
                    </li>
                    <li>
                        <el-tooltip effect="dark" content="上传附件" placement="bottom" :open-delay=500>
                            <a class="el-icon-paperclip"></a>
                        </el-tooltip>
                    </li>
                    <li>
                        <el-tooltip effect="dark" content="添加工时" placement="bottom" :open-delay=500>
                            <a class="el-icon-timer"></a>
                        </el-tooltip>
                    </li>
                </ul>
            </div>
            <div class="detail-body">
                <div class="detail-title">
                    <span class="detail-title-content">
                        {{this.$store.state.chooseTask && this.$store.state.chooseTask.taskTitle}}
                    </span>
                </div>
                <div class="operation-group clearfix">
                    <loading v-if="queryTastProList"></loading>
                    <div v-if="!queryTastProList">
                        <div class="task-progress group clearfix" @click="loadTaskStates($event)">
                            <span :class="[item.icon,'icon']" :style="'color:'+item.fc" v-for="item in taskStateList"
                                  v-if="$store.state.chooseTask && $store.state.chooseTask.taskPro == item.taskState"></span>
                            <div class="group-content">
                                <span class="group-value">{{this.$store.state.chooseTask && this.$store.state.chooseTask.taskProDesc}}</span>
                                <span class="group-key">当前状态</span>
                            </div>
                            <taskStateList v-if="showTaskStateList" class="task-state-list"
                                           @changeState="changeState"></taskStateList>
                        </div>
                        <div class="task-charge-man group clearfix">
                            <span class="icon">{{this.$store.state.chooseTask && this.$store.state.chooseTask.nickName}}</span>
                            <div class="group-content">
                                <span class="group-value">{{this.$store.state.chooseTask && this.$store.state.chooseTask.nickName}}</span>
                                <span class="group-key">负责人</span>
                            </div>
                        </div>
                        <div class="task-start-time group clearfix" @click="chooseStartTime()">
                            <span class="el-icon-alarm-clock icon"></span>
                            <div class="group-content">
                                <span class="group-value">{{this.$store.state.chooseTask ? (this.$store.state.chooseTask.showStartDate ? this.$store.state.chooseTask.showStartDate : '无') : '无'}}</span>
                                <span class="group-key">开始时间</span>
                            </div>
                            <el-date-picker
                                    v-model="startTime"
                                    type="datetime"
                                    placeholder="开始日期">
                            </el-date-picker>
                        </div>
                        <div class="task-end-time group clearfix" @click="chooseEndTime()">
                            <span class="el-icon-timer icon"></span>
                            <div class="group-content">
                                <span class="group-value">{{this.$store.state.chooseTask ? (this.$store.state.chooseTask.showEndDate ? this.$store.state.chooseTask.showEndDate : '无') : '无'}}</span>
                                <span class="group-key">截止时间</span>
                                <el-date-picker
                                        v-model="endTime"
                                        type="datetime"
                                        placeholder="开始日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-nav">
                    <a @click="chooseTab(tab)" :data-select-tab="tab.selectTabStyle" :class="['tab',tab.selectTabStyle]"
                       v-for="tab in tabs">
                        <span :class="[tab.icon,'icon']"></span>
                        <span class="descr">{{tab.descr}}
                            <i v-show="tab.id != tabs.length" class="divider-line"></i>
                        </span>
                    </a>
                </div>
                <div class="box">
                    <taskInfo v-if="currentTab&&currentTab.componentName == 'taskInfo'"
                              :taskId="$store.state.chooseTask&&$store.state.chooseTask.taskId"
                              @sendComment="sendComment"></taskInfo>
                    <sonTask v-if="currentTab&&currentTab.componentName == 'sonTask'"
                             :taskId="$store.state.chooseTask&&$store.state.chooseTask.taskId"></sonTask>
                    <connectTask v-if="currentTab&&currentTab.componentName == 'connectTask'"></connectTask>
                    <file v-if="currentTab&&currentTab.componentName == 'file'"></file>
                    <workTime v-if="currentTab&&currentTab.componentName == 'workTime'"></workTime>
                </div>
                <div :class="['comment-body',!showCommentText?'show-animation':'hide-animation']">
                    <span :class="['charge-man']">{{this.$store.state.chooseTask && this.$store.state.chooseTask.nickName}}</span>
                    <div class="comment-body-content">
                        <input v-model="comments" v-show="showCommentText" @keydown="perSaveComment($event)"
                               @click="showComment(this)" type="text"
                               class="show-text"
                               placeholder="评论内容，文字上限2000（Ctrl+Enter发送）"/>
                        <div :class="['comment-content']"
                             v-show="!showCommentText">
                            <textarea v-model="comments" autofocus maxlength="2000" class="show-text-area"
                                      @keydown="perSaveComment($event)"
                                      placeholder="评论内容，文字上限2000（Ctrl+Enter发送）">
                            </textarea>
                            <div class="divider"></div>
                            <div :class="['comment-content-footer','clearfix']">
                                <ul>
                                    <li class="footer-item"><a class="el-icon-paperclip"></a></li>
                                    <li class="footer-item"><a class="fa fa-smile-o"></a></li>
                                    <li class="footer-item"><a class="el-icon-s-operation"></a></li>
                                </ul>
                                <div class="button-groups">
                                    <span class="send-cancel" @click="cancelSend()">取消</span>
                                    <button class="send-msg" @click="saveComment()">发送</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import loading from '../../common/loading.vue'
    import taskStateList from '../../common/taskStateList.vue';
    import moment from '../../../lib/moment.min.js';
    import utils from '../../../utils/utils.js';
    import taskInfo from '../../taskDetail/taskInfo.vue';
    import sonTask from '../../taskDetail/sonTask.vue';
    import connectTask from '../../taskDetail/connectTask.vue';
    import file from '../../taskDetail/file.vue';
    import workTime from '../../taskDetail/workTime.vue';

    export default {
        data() {
            return {
                showDialog: false,
                showLoading: true,
                activeName: 'taskInfo',
                showCommentText: true,
                showTaskStateList: false,
                comments: '',
                startTime: new Date(),
                endTime: new Date(),
                updateTime: false,
                queryTastProList: true,
                currentTab: null,
                taskStateList: [],
                currentComponentName: '',
                allComponents: [],
                commentId: null,
                tabs: [
                    {
                        id: 1,
                        menuCode: 'taskInfo',
                        descr: '任务信息',
                        icon: 'fa fa-tasks',
                        selectTabStyle: 'select-tab',
                        componentName: 'taskInfo'
                    },
                    {
                        id: 2,
                        menuCode: 'sonTask',
                        descr: '子任务',
                        icon: 'el-icon-s-operation',
                        selectTabStyle: '',
                        componentName: 'sonTask'
                    },
                    {
                        id: 3,
                        menuCode: 'connectTask',
                        descr: '关联任务',
                        icon: 'fa fa-link',
                        path: '/taskDetail/connectTask',
                        selectTabStyle: '',
                        componentName: 'connectTask'
                    },
                    {
                        id: 4,
                        menuCode: 'workTime',
                        descr: '任务工时',
                        icon: 'el-icon-time',
                        selectTabStyle: '',
                        componentName: 'workTime'
                    },
                    {
                        id: 5,
                        menuCode: 'file',
                        descr: '任务附件',
                        icon: 'el-icon-paperclip',
                        selectTabStyle: '',
                        componentName: 'file'
                    }
                ],
            }
        },
        created() {
            this.currentTab = this.tabs[0];
        },
        props: ['dialogVisible', 'chooseTask'],
        watch: {
            'dialogVisible': function (newval) {
                this.showDialog = newval;
                if (newval) {
                    utils.request(this, {
                        url: '/getTaskStateList',
                        method: 'get',
                        data: {},
                    }, data => {
                        this.taskStateList = data.returnData;
                        this.queryTastProList = false;
                    }, error => {
                        this.queryTastProList = false;
                    }, true);
                }
            },
            'showDialog': function (newval) {
                this.$emit('passStatus', newval);
                if (!newval) {
                    this.$store.commit('updateSelectTaskDetail', null);
                    this.showCommentText = true;
                    this.comments = '';
                    this.showTaskStateList = false;
                    this.updateTime = false;
                    this.currentTab = null;
                }
            },
            '$store.state.chooseTask': function (newval) {
                if (newval) {
                    this.startTime = newval.startDate;
                    this.endTime = newval.endDate;
                    newval.showStartDate = newval.startDate ? moment(newval.startDate).format('MM月DD号') : '无';
                    newval.showEndDate = newval.endDate ? moment(newval.endDate).format('MM月DD号') : '无';
                }
            },
            'startTime': function (newval) {
                var item = this.$store.state.chooseTask;
                if (item) {
                    item.startDate = newval;
                    item.showStartDate = item.startDate ? moment(item.startDate).format('MM月DD号') : '无';
                    if (this.updateTime) {
                        utils.request(this, {
                            url: '/updateTaskTime',
                            method: 'post',
                            data: {
                                taskId: this.$store.state.chooseTask.taskId,
                                startDate: moment(newval).format('YYYY-MM-DD HH:mm:ss'),
                                type: 'start'
                            },
                        }, data => {
                            var taskItem = data.returnData[0];
                            taskItem.showStartDate = taskItem.startDate ? moment(taskItem.startDate).format('MM月DD号') : '无';
                            taskItem.showEndDate = taskItem.endDate ? moment(taskItem.endDate).format('MM月DD号') : '无';
                            this.$store.state.chooseTask.startDate = taskItem.startDate;
                            this.$store.state.chooseTask.showStartDate = taskItem.showStartDate;
//                            this.$store.commit('updateSelectTaskDetail', taskItem);
                            this.$emit('changeState', false);
                        }, error => {
                        }, true);
                    }
                }
            },
            'endTime': function (newval) {
                var item = this.$store.state.chooseTask;
                if (item) {
                    item.endDate = newval;
                    item.showEndDate = item.endDate ? moment(item.endDate).format('MM月DD号') : '无';
                    if (this.updateTime) {
                        utils.request(this, {
                            url: '/updateTaskTime',
                            method: 'post',
                            data: {
                                taskId: this.$store.state.chooseTask.taskId,
                                endDate: moment(newval).format('YYYY-MM-DD HH:mm:ss'),
                                type: 'end'
                            },
                        }, data => {
                            var taskItem = data.returnData[0];
                            taskItem.showDate = taskItem.startDate ? moment(taskItem.startDate).format('MM月DD号') : '无';
                            taskItem.showEndDate = taskItem.endDate ? moment(taskItem.endDate).format('MM月DD号') : '无';
                            this.$store.state.chooseTask.endDate = taskItem.endDate;
                            this.$store.state.chooseTask.showEndDate = taskItem.showEndDate;
                            this.$emit('changeState', false);
                        }, error => {
                        }, true);
                    }
                }
            },
            'currentTab': function (newval) {
                this.tabs.forEach(item => {
                    if (item == newval) {
                        item.selectTabStyle = 'select-tab';
                    } else {
                        item.selectTabStyle = '';
                    }
                });
            },
            'showCommentText': function (newval) {
                if (newval) {
                    this.commentId = null;
                }
            }
        },
        methods: {
            closeDialog() {
                this.showDialog = false;
            },
            showComment() {
                this.showCommentText = false;
                document.querySelector('.show-text-area').focus();
            },
            cancelSend() {
                this.showCommentText = true;
            },
            closeComment() {
            },
            loadTaskStates(e) {
                if (e.target.tagName == 'LI')
                    return;
                this.showTaskStateList = !this.showTaskStateList;
            },
            changeState(val) {
                this.showTaskStateList = false;
            },
            chooseStartTime() {
                document.querySelector('.el-input__inner').focus();
                this.updateTime = true;
            },
            chooseEndTime() {
                this.updateTime = true;
            },
            chooseTab(tab) {
                this.currentTab = tab;
            },
            //保存评论
            sendComment(commentId) {
                this.commentId = commentId;
                this.showCommentText = false;
            },
            perSaveComment(e) {
                var keyCode = e.keyCode || e.which || e.charCode;
                if (e.keyCode == 13 && e.ctrlKey) {
                    this.saveComment();
                    e.preventDefault();
                }
            },
            saveComment() {
                if (this.comments && this.comments.trim()) {
                    utils.request(this, {
                        url: '/saveComment',
                        method: 'post',
                        data: {
                            taskId: this.$store.state.chooseTask.taskId,
                            commentId: this.commentId,
                            comments: this.comments,
                            currentUser: '565784355@qq.com'
                        },
                    }, data => {
                        this.comments = '';
                        this.showCommentText = true;
                        this.$store.commit('updateTaskCommentList', data.returnData);
                        //兼容addList方法
                        this.$store.state.taskCommentList.forEach(item => {
                            item.parentCode = item.parentComment;
                            item.menuCode = item.commentId;
                            item.showCommentTime = moment(item.createDate).format('MM月DD日 HH:mm');
                        });
                        this.$store.state.taskCommentList.forEach(item => utils.addList(this.$store.state.taskCommentList, item));
                        var arr = [];
                        this.$store.state.taskCommentList.forEach(item => {
                            if (!item.parentCode) {
                                arr.push(item);
                            }
                        });
                        this.$store.commit('updateTaskCommentList', arr);
                    }, error => {
                        this.showCommentText = true;
                        this.comments = '';
                    }, false);
                } else {
                    alert('您还未输入评论哦');
                }
            }
        },
        components: {
            loading, taskStateList, taskInfo, sonTask, connectTask, file, workTime
        },
        mounted() {
            document.querySelector('.el-dialog').onscroll = function () {
                var st = document.querySelector('.el-dialog').scrollTop || document.querySelector('.el-dialog').scrollTop;
                document.querySelector('.comment-body').style.bottom = -st + 'px';
            }
        }
    }
</script>

<style scoped lang="scss">
    @keyframes showCommentInfo {
        from {
            transform: translateY(91px);
        }
        to {
            transform: translateY(0px);
        }
    }

    @keyframes hideCommentInfo {
        from {
            transform: translateY(-91px);
        }
        to {
            transform: translateY(0px);
        }
    }

    .show-animation {
        animation: showCommentInfo .3s;
    }

    .hide-animation {
        animation: hideCommentInfo .3s;
    }

    /deep/ .el-dialog__header {
        height: 51px;
        border-bottom: 1px #eee solid;
        padding: 0 20px;
        line-height: 51px;
    }

    /deep/ .el-dialog__close {
        display: none !important;
    }

    /deep/ .el-dialog__body {
        padding: 25px 40px !important;
    }

    /deep/ .el-dialog {
        width: 980px !important;
        position: relative;
        border-radius: 5px !important;
        overflow-y: auto !important;
        overflow-x: hidden;
        height: 580px;
        margin-top: 50px !important;
    }

    .detail-head {
        .task-id-sp {
            width: 35px;
            height: 26px;
            padding: 6px 10px;
            background-color: rgba(34, 215, 187, .1);
            color: #22d7bb;
            cursor: pointer;
            font-size: 16px;
            border-radius: 2px;
            display: inline-block;
            line-height: 16px;
            text-align: center;
            > sapn {
                float: left;
            }
        }
        ul.right-box {
            height: 51px;
            float: right;
            li {
                float: right;
                width: 35px;
                font-size: 20px;
                color: #ddd;
                text-align: center;
                cursor: pointer;
            }
            li.close {
                font-weight: bolder;
                /*border-left: 1px solid #ddd;*/

            }
            li:hover {
                color: #22d7bb;
            }
        }
    }

    .detail-body {
        padding-bottom: 70px;
        .detail-title {
            margin-bottom: 26px;
            .detail-title-content {
                font-size: 25px;
                color: #333;
            }

        }
        .operation-group {
            height: 39px;
            margin-bottom: 26px;
            .group {
                position: relative;
                width: 25%;
                float: left;
                height: 100%;
                cursor: pointer;
                z-index: 999;
                .icon {
                    display: inline-block;
                    height: 39px;
                    width: 39px;
                    font-size: 39px;
                    line-height: 39px;
                    float: left;
                }
                .group-content {
                    float: left;
                    height: 40px;
                    margin-left: 10px;
                    .group-value {
                        color: #333;
                        display: block;
                        height: 20px;
                        line-height: 20px;
                        font-size: 14px;
                    }
                    .group-key {
                        color: #aaa;
                        font-size: 12px;
                        display: block;
                        height: 20px;
                        line-height: 20px;
                    }
                }
                .task-state-list {
                    margin-top: 40px;
                    margin-left: -10px;
                    position: absolute;
                }
                /deep/ .el-date-editor {
                    opacity: 0;
                    top: 0;
                    left: 0;
                    position: absolute;
                }
                /deep/ .el-input__inner {
                    cursor: pointer;
                }
            }
            .task-progress {
                .icon {
                    color: rgb(255, 164, 21);
                }
            }
            .task-charge-man {
                .icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 19px;
                    line-height: 38px;
                    font-size: 12px;
                    color: white;
                    text-align: center;
                    background-color: rgb(45, 188, 255);
                }
            }
            .task-start-time:hover .el-icon-alarm-clock {
                color: #22d7bb;
            }
            .task-end-time:hover .el-icon-timer {
                color: #22d7bb;
            }
        }
        .detail-nav {
            border-bottom: 1px solid #eee;
            margin-bottom: 20px;
            .tab {
                display: inline-block;
                margin-right: 60px;
                height: 35px;
                color: #888;
                line-height: 21px;
                .icon {
                    font-size: 16px;
                    margin-right: 5px;
                }
                .descr {
                    position: relative;
                    display: inline-block;
                    .divider-line {
                        position: absolute;
                        right: -30px;
                        width: 1px;
                        background-color: #eee;
                        height: 100%;
                    }
                }
            }
            .tab:hover {
                cursor: pointer;
                color: #22d7bb;
                border-bottom: 2px solid #22d7bb;

            }
        }
    }

    .comment-body {
        border-top: 1px #eee solid;
        display: flex;
        flex-direction: row;
        background: #fff;
        width: 980px;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 999;
        padding: 11px 50px;
        .charge-man {
            width: 38px;
            height: 38px;
            border-radius: 19px;
            line-height: 38px;
            font-size: 12px;
            color: white;
            text-align: center;
            background-color: rgb(45, 188, 255);
            margin-top: 5px;
        }
        .comment-body-content {
            .show-text {
                height: 38px;
                width: 826px;
                border: none;
                padding: 1px 1px 1px 19px;
                display: inline-block;
                margin-left: 10px;
                outline: none;
                background-color: #f3f3f3;
            }
            .show-text:hover {
                background-color: #fff;
                border: 1px solid #ddd;
                padding-left: 18px;
            }
            .comment-content {
                margin-left: 10px;
                margin-top: 6px;
                border: 1px solid #ddd;
                border-radius: 3px 3px 0 0;
                height: 141px;
                position: relative;
                .show-text-area {
                    display: inline-block;
                    outline: none;
                    padding: 10px 20px;
                    height: 80px;
                    min-height: 80px;
                    resize: none;
                    width: 826px;
                    border: none;
                }
                .show-text-area:hover .comment-content {
                    border: 1px solid #22d7bb;
                    cursor: pointer;
                }
                .divider {
                    width: 826px;
                    height: 5px;
                }
                .comment-content-footer {
                    position: absolute;
                    bottom: 0px;
                    left: 0px;
                    padding: 8px 20px;
                    height: 44px;
                    width: 826px;
                    ul {
                        float: left;
                    }
                    .footer-item {
                        float: left;
                        margin-right: 20px;
                        font-size: 16px;
                        font-weight: 400;
                        color: #bbb;
                        height: 28px;
                        line-height: 28px;
                    }
                    .footer-item:hover {
                        cursor: pointer;
                        color: #22d7bb;
                    }
                    .button-groups {
                        float: right;
                        height: 28px;
                        line-height: 28px;
                        .send-cancel {
                            display: inline-block;
                            cursor: pointer;
                            color: #aaa;
                            height: 28px;
                            line-height: 28px;
                            margin-right: 5px;
                            text-align: center;
                        }
                        .send-cancel:hover {
                            color: #22d7bb;
                        }
                        .send-msg {
                            width: 70px;
                            height: 28px;
                            background-color: #22d7bb;
                            border: none;
                            line-height: 28px;
                            border-radius: 14px;
                            color: white;
                            margin: 0 !important;
                            padding: 0 !important;
                            outline: none;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

    .select-tab {
        color: #22d7bb !important;
        border-bottom: 2px solid #22d7bb;
    }

</style>