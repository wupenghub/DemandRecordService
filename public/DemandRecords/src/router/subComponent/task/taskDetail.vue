<template>
    <div class="contain">
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
                    <div class="task-progress group clearfix">
                        <span class="el-icon-time icon"></span>
                        <div class="group-content">
                            <span class="group-value">{{this.$store.state.chooseTask && this.$store.state.chooseTask.taskProDesc}}</span>
                            <span class="group-key">当前状态</span>
                        </div>
                    </div>
                    <div class="task-charge-man group clearfix">
                        <span class="icon">吴鹏</span>
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
                <div class="comment-body"></div>
                <loading v-if="showLoading"></loading>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import loading from '../../common/loading.vue'

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
                ]

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
            }
        },
        components: {
            loading
        },
        mounted() {
            console.log(document.querySelectorAll('.el-dialog').length);
            document.querySelector('.el-dialog').onscroll = function () {
                var st = document.querySelector('.el-dialog').scrollTop || document.querySelector('.el-dialog').scrollTop;
                console.log(st)
                document.querySelector('.comment-body').style.bottom = -st + 'px';
            }
        }
    }
</script>

<style scoped lang="scss">
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
        min-height: 600px;
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
                /*padding:7px 0;*/
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
        height: 61px;
        border-top: 1px #eee solid;
        display: flex;
        flex-direction: row;
        background: #ddd;
        width: 980px;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        position: absolute;
        bottom: 0;
        left: 0;
    }

</style>