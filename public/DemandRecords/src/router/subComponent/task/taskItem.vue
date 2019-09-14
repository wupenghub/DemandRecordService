<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span class="title">收件箱</span>
        </div>
        <div>
            <div class="content">
                133
            </div>
            <div class="bottom">
                <div class="add_task" v-show="showAdd" @click="addTask()">
                    <i class="fa fa-plus"></i>
                    <span style="margin-left: 10px">添加新任务</span>
                </div>
                <div class="add_info" v-show="!showAdd">
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
                        <el-button round>确定</el-button>
                        <span class="cancel" @click="cancel()">取消</span>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
</template>
<style scoped lang="scss">
    .box-card {
        width: 280px;
        .font_focus_color {
            color: #22d7bb;
            font-size: 23px;
        }
        .title {
            font-size: 16px;
        }
        .bottom {
            transition: all linear .2s;
            .add_task {
                color: #666;
                height: 35px;
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
                    .choose_task_type:hover{
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
                    .current_user:hover{
                        cursor: pointer;
                    }
                    .time:hover{
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
                    .cancel:hover{
                        cursor: pointer;
                        color: #22d7bb;
                    }
                }
            }

        }
    }
</style>
<script>

    export default {
        data() {
            return {
                showAdd: true,
                taskTitle: ''
            }
        },
        methods: {
            addTask() {
                this.showAdd = !this.showAdd;
            },
            cancel(){
                this.showAdd = true;
            }
        }
    }
</script>