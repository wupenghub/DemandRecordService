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
                    <span>{{taskItem.taskTitle}}</span>
                    <i class="fa fa-navicon (alias) left-nav"></i>
                    <div class="task-item-right clearfix">
                        <span class="charge-man">
                            吴鹏
                        </span>
                    </div>
                </div>
                <span><i class="el-icon-plus add-son-task-icon"></i>新建子任务</span>
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
                    position: relative;
                    height: 50px;
                    line-height: 50px;
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
                        top: 19px;
                        display: none;
                    }
                    .task-item-right {
                        float: right;
                        height: 50px;
                        line-height: 50px;
                        .charge-man {
                            display: inline-block;
                            width: 24px;
                            height: 24px;
                            line-height: 24px;
                            text-align: center;
                            overflow: hidden;
                            font-size: 12px;
                            color: white;
                            background: rgb(45, 188, 255);
                            border-radius: 12px;
                        }
                    }
                }
                .son-task-item:hover {
                    box-shadow: 0 1px 8px 5px rgba(0, 0, 0, .1);
                    border-bottom: none;
                }
                .son-task-item:hover .left-nav {
                    display: inline-block;
                }
            }
            .add-son-task-icon {
                margin-right: 10px;
            }
        }
    }

</style>