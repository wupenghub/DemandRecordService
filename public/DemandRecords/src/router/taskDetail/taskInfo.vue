<template>
    <div class="task_info">
        <loading v-show="requestData" class="load"></loading>
        <div class="task-info-box" v-show="!requestData">
            <div class="clearfix">
                <div class="task-info-item project-name" v-if="taskInfo && taskInfo.projectName">
                    <span class="desc">项目名称：</span>
                    <div class="project-info item-info">
                        <span class="fa fa-user icon"></span>
                        <span class="project-name">{{taskInfo && taskInfo.projectName}}</span>
                    </div>
                </div>
                <div class="task-info-item project-priority">
                    <span class="desc">优先级：</span>
                    <div class="priority-info item-info">
                        <span class="fa fa-user icon"></span>
                        <span>{{taskInfo && taskInfo.priorityDesc}}</span>
                    </div>
                </div>
                <div class="task-info-item project-label">
                    <span class="desc">标签：</span>
                    <div class="label-info item-info">
                        <span class="fa fa-user icon"></span>
                        <span>{{taskInfo && taskInfo.projectName}}</span>
                    </div>
                </div>
                <div class="task-info-item project-part-in">
                    <span class="desc">参与人：</span>
                    <div class="part-in-info item-info">
                        <span class="fa fa-user icon"></span>
                        <span>{{taskInfo && taskInfo.projectName}}</span>
                    </div>
                </div>
            </div>
            <div class="task-desc">
                <span class="desc">描述：</span>
            </div>
        </div>
    </div>

</template>

<script>
    import loading from '../common/loading.vue';
    import utils from '../../utils/utils.js';

    export default {
        data() {
            return {
                requestData: true,
                taskInfo: null,
                taskInfoItems: []
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                utils.request(this, {
                    url: '/selectTaskInfo',
                    method: 'get',
                    params: {
                        taskId: this.taskId
                    }
                }, data => {
                    this.requestData = false;
                    this.taskInfo = data.resultData.taskInfoList[0];
                    this.renderPage(data);
                    console.log(JSON.stringify(this.taskInfo, null, '  '));
                }, error => {
                    this.requestData = false;
                }, true);
            },
            renderPage(data) {
            }
        },
        components: {
            loading
        },
        props: ['taskId']
    }
</script>

<style scoped lang="scss">
    .task_info {
        .load {
            margin-top: 10px;
        }
        .task-info-box {
            .task-info-item {
                width: 33.333%;
                height: 76px;
                padding: 0 10px 15px 10px;
                float: left;
            }
            .item-info {
                line-height: 20px;
            }
            .desc {
                color: #888 !important;
                font-size: 16px;
                line-height: 20px;
            }
            .project-name {
                .project-info {

                }
            }
            .task-desc{
                padding: 0 10px;
            }
        }
    }

    .icon {
        color: #22d7bb;
        font-size: 18px;
        margin-right: 5px;
    }

</style>