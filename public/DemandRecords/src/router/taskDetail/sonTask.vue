<template>
    <div class="son-task">
        <loading v-show="requestData" class="load"></loading>
        <div class="son-task-info">
            <div class="non-task-list" v-if="!this.sonTaskList || this.sonTaskList.length == 0">
                <span><i class="el-icon-plus add-son-task-icon"></i>新建子任务</span>
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
            loading
        }
    }
</script>

<style scoped lang="scss">
    .son-task {
        .load {
            margin-top: 10px;
        }
        .son-task-info {
            .non-task-list {
                padding-left: 30px;
                height: 46px;
                margin-bottom: 26px;
                line-height: 46px;
                color: #22d7bb;
                font-size: 14px;
                cursor: pointer;
            }
            .add-son-task-icon {
                margin-right: 10px;
            }
        }
    }

</style>