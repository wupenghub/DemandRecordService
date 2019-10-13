<template>
    <div class="task_info">
        <loading v-show="requestData"></loading>
        <div class="task-info-box">
            <div class="task-info-item project-name">
                <span class="desc">项目名称：</span>
                <div class="project-info">
                    <span class="project-name">{{taskInfo&&taskInfo.projectName}}</span>
                </div>
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
                taskInfo: null
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
                    console.log(JSON.stringify(this.taskInfo,null,'  '));
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
        .task-info-box {
            .task-info-item {
                width: 33.333%;
                height: 76px;
                padding: 0 10px 15px 10px;
            }
            .project-name {
                .desc {
                    color: #888 !important;
                    font-size: 16px;
                }
            }
        }
    }

</style>