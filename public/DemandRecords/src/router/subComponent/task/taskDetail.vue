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
                    <div class="task-progress group clearfix" @click="loadTaskStates($event)">
                        <span class="el-icon-time icon"></span>
                        <div class="group-content">
                            <span class="group-value">{{this.$store.state.chooseTask && this.$store.state.chooseTask.taskProDesc}}</span>
                            <span class="group-key">当前状态</span>
                        </div>
                        <taskStateList :loadTaskStateList="loadTaskStateList" class="task-state-list"
                                       @changeState="changeState"></taskStateList>
                    </div>
                    <div class="task-charge-man group clearfix">
                        <span class="icon">{{this.$store.state.chooseTask && this.$store.state.chooseTask.nickName}}</span>
                        <div class="group-content">
                            <span class="group-value">{{this.$store.state.chooseTask && this.$store.state.chooseTask.nickName}}</span>
                            <span class="group-key">负责人</span>
                        </div>
                    </div>
                    <div class="task-start-time group clearfix">
                        <span class="el-icon-alarm-clock icon"></span>
                        <div class="group-content">
                            <span class="group-value">{{this.$store.state.chooseTask ? (this.$store.state.chooseTask.showStartDate ? this.$store.state.chooseTask.showStartDate : '无') : '无'}}</span>
                            <span class="group-key">开始时间</span>
                        </div>
                    </div>
                    <div class="task-end-time group clearfix">
                        <span class="el-icon-timer icon"></span>
                        <div class="group-content">
                            <span class="group-value">{{this.$store.state.chooseTask ? (this.$store.state.chooseTask.showEndDate ? this.$store.state.chooseTask.showEndDate : '无') : '无'}}</span>
                            <span class="group-key">截止时间</span>
                        </div>
                    </div>
                </div>
                <div class="detail-nav">
                    <a :class="['tab',tab.select?'select':'']" v-for="tab in tabs">
                        <span :class="[tab.icon,'icon']"></span>
                        <span class="descr">{{tab.descr}}
                            <i v-show="tab.id != tabs.length" class="divider-line"></i>
                        </span>
                    </a>
                </div>
                <div :class="['comment-body',!showCommentText?'show-animation':'hide-animation']">
                    <span :class="['charge-man']">{{this.$store.state.chooseTask && this.$store.state.chooseTask.nickName}}</span>
                    <div class="comment-body-content">
                        <input v-show="showCommentText" @click="showComment(this)" type="text" class="show-text"
                               placeholder="评论内容，文字上限2000（Ctrl+Enter发送）"/>
                        <div :class="['comment-content']"
                             v-show="!showCommentText">
                            <textarea autofocus maxlength="2000" class="show-text-area"
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
                                    <button class="send-msg">发送</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <loading v-if="showLoading"></loading>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import loading from '../../common/loading.vue'
    import taskStateList from '../../common/taskStateList.vue';

    export default {
        data() {
            return {
                showDialog: false,
                showLoading: true,
                activeName: 'taskInfo',
                tabs: [
                    {
                        id: 1,
                        menuCode: 'taskInfo',
                        descr: '任务信息',
                        icon: 'fa fa-tasks'
                    },
                    {
                        id: 2,
                        menuCode: 'sonTask',
                        descr: '子任务',
                        icon: 'el-icon-s-operation'
                    },
                    {
                        id: 3,
                        menuCode: 'connectTask',
                        descr: '关联任务',
                        icon: 'fa fa-link'
                    },
                    {
                        id: 4,
                        menuCode: 'workTime',
                        descr: '任务工时',
                        icon: 'el-icon-time'
                    },
                    {
                        id: 5,
                        menuCode: 'file',
                        descr: '任务附件',
                        icon: 'el-icon-paperclip'
                    }
                ],
                showCommentText: true,
                loadTaskStateList: false

            }
        },
        created() {
        }
        ,
        props: ['dialogVisible', 'chooseTask'],
        watch: {
            'dialogVisible': function (newval) {
                this.showDialog = newval;
            },
            'showDialog': function (newval) {
                this.$emit('passStatus', newval)
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
//                alert(123);
            },
            loadTaskStates(e) {
                if (e.target.tagName == 'LI')
                    return;
                this.loadTaskStateList = true;
            },
            changeState(val) {
                this.loadTaskStateList = val;
            }
        },
        components: {
            loading, taskStateList
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
        overflow: auto !important;
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
            .select {
                border-bottom: 2px solid #22d7bb;
                color: #22d7bb;

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

</style>