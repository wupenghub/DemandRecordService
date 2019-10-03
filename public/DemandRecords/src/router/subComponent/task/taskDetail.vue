<template>
    <div class="contain">
        <el-dialog :visible.sync="showDialog" :before-close="handleClose">
            <div slot="title" class="detail-head">
                <span class="task-id-sp clearfix">
                    <span>{{chooseTask && chooseTask.taskId}}</span>
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
                        {{chooseTask && chooseTask.taskTitle}}
                    </span>
                </div>
                <div class="operation-group clearfix">
                    <div class="task-progress group clearfix">
                        <span class="el-icon-time icon"></span>
                        <div class="group-content">
                            <span class="group-value">{{chooseTask && chooseTask.taskProDesc}}</span>
                            <span class="group-key">当前状态</span>
                        </div>
                    </div>
                    <div class="task-charge-man group clearfix">
                        <span class="icon">吴鹏</span>
                        <div class="group-content">
                            <span class="group-value">{{chooseTask && chooseTask.nickName}}</span>
                            <span class="group-key">负责人</span>
                        </div>
                    </div>
                    <div class="task-start-time group clearfix">
                        <span class="el-icon-alarm-clock icon"></span>
                        <div class="group-content">
                            <span class="group-value">{{chooseTask ? (chooseTask.showStartDate ? chooseTask.showStartDate : '无') : '无'}}</span>
                            <span class="group-key">开始时间</span>
                        </div>
                    </div>
                    <div class="task-end-time group clearfix">
                        <span class="el-icon-timer icon"></span>
                        <div class="group-content">
                            <span class="group-value">{{chooseTask ? (chooseTask.showEndDate ? chooseTask.showEndDate : '无') : '无'}}</span>
                            <span class="group-key">截止时间</span>
                        </div>
                    </div>
                    <!--<div class="task-detail-nav">
                        <el-tabs v-model="activeName" @tab-click="handleClick" ref="tabs">
                            <el-tab-pane class="pane" v-for="tab in tabs" :label="tab.descr" :name="tab.menuCode">
                            </el-tab-pane>
                        </el-tabs>
                    </div>-->
                </div>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                showDialog: false

            }
        },
        created() {
//            this.showDialog = this.dialogVisible;
//            console.log('====='+this.showDialog);
        }
        ,
        props: ['dialogVisible', 'chooseTask'],
        watch: {
            'dialogVisible': function (newval) {
                this.showDialog = newval;
            }
        },
        methods: {
            handleClose() {
                this.showDialog = false;
                this.$emit('passStatus', this.showDialog);
            },
            closeDialog(){
                this.showDialog = false;
                this.$emit('passStatus', this.showDialog);
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
        width: 924px !important;
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
    }

</style>