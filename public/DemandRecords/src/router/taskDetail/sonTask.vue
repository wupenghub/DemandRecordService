<template>
    <div class="son-task">
        <loading v-show="requestData" class="load"></loading>
        <div class="son-task-info">
            <div class="son-task-list">
                <div class="son-task-item" v-for="taskItem in sonTaskList">
                    <span class="pro-state" :style="{backgroundColor:taskItem.bgColor}">
                        <i :class="taskItem.icon" :style="{color:taskItem.fontColor}"></i>
                        {{taskItem.proDesc}}
                    </span>
                    <span class="task-title">{{taskItem.taskTitle}}</span>
                    <span class="fa fa-edit (alias) edit task-item-icon"></span>
                    <span class="fa fa-trash-o delete task-item-icon"></span>
                    <i class="fa fa-navicon (alias) left-nav"></i>
                    <span :class="[taskItem.chargePerName?'has-charge-man':'no-charge-man','clearfix']">
                            <i class="fa fa-user-circle" v-if="!taskItem.chargePerName"></i>
                            <span class="charge-man-name" v-if="taskItem.chargePerName">{{taskItem.chargePerName}}</span>
                    </span>
                </div>
                <span class="add-son-task"><i class="el-icon-plus add-son-task-icon"></i>新建子任务</span>
            </div>
            <comments @replyComment="replyComment"
                      @deleteComment="deleteComment"></comments>
        </div>
    </div>

</template>

<script>
    import loading from '../common/loading.vue';
    import utils from '../../utils/utils.js';
    import comments from '../comments/comments.vue';

    export default {
        data() {
            return {
                requestData: true,
                sonTaskList: []
            }
        },
        created() {
            utils.request(this, {
                url: '/selectSonTaskInfo',
                method: 'get',
                params: {
                    parentTaskId: this.taskId
                }
            }, data => {
                console.log(JSON.stringify(data, null, '  '));
                this.requestData = false;
                this.sonTaskList = data.returnData;
            }, error => {
                this.requestData = false;
            }, true);
        },
        props: ['taskId'],
        components: {
            loading, comments
        },
        methods: {
            replyComment(commentId) {
                this.$emit('sendComment', commentId);
            },
            deleteComment(commentId) {
            }
        }
    }
</script>

<style scoped lang="scss">
    .son-task {
        .load {
            margin-top: 10px;
        }

        .son-task-info {
            .son-task-list {
                padding-left: 30px;
                margin-bottom: 26px;
                font-size: 14px;
                cursor: pointer;
                .son-task-item {
                    padding: 0 20px;
                    border-bottom: 1px solid rgba(0, 0, 0, .1);
                    height: 60px;
                    line-height: 60px;
                    position: relative;
                    .task-title {
                        margin-left: 10px;
                    }
                    .pro-state {
                        font-size: 12px;
                        display: inline-block;
                        padding: 5px 10px;
                        height: 24px;
                        line-height: 14px;
                        border-radius: 2px;
                    }
                    .left-nav {
                        color: #aaa;
                        position: absolute;
                        left: 5px;
                        top: 50%;
                        transform: translateY(-50%);
                        display: none;
                    }
                    .no-charge-man,.has-charge-man {
                        float: right;
                        width: 24px;
                        height: 24px;
                        line-height: 24px;
                        text-align: center;
                        overflow: hidden;
                        font-size: 12px;
                        color: white;
                        background: rgb(45, 188, 255);
                        border-radius: 12px;
                        top: 50%;
                        right: 20px;
                        position: absolute;
                        transform: translateY(-50%);
                    }
                    .no-charge-man{
                        background: #ffffff;
                        border: 1px dashed #aaaaaa;
                    }
                    .task-item-icon {
                        font-size: 18px;
                        color: rgb(170, 170, 170);
                        margin-left: 20px;
                        display: none;
                    }
                    .task-item-icon:hover {
                        color: #22d7bb;
                    }
                }
                .son-task-item:hover {
                    box-shadow: 0 1px 8px 5px rgba(0, 0, 0, .1);
                    border-bottom: none;
                }
                .son-task-item:hover .left-nav {
                    display: inline-block;
                }
                .son-task-item:hover .task-item-icon {
                    display: inline-block;
                }
                .add-son-task {
                    color: #22d7bb;
                    padding: 0 20px;
                }
                .add-son-task:hover {
                    text-decoration: underline;
                }
            }
            .add-son-task-icon {
                margin-right: 10px;
            }
        }
    }

</style>