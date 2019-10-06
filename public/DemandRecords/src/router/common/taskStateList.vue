<template>
    <div class="task-pro-list">
        <loading v-show="loading" class="loading"></loading>
        <ul>
            <li v-for="item in taskStateList" :key="item.taskState"
                @click.self="chooseTaskState($event,item.taskState)">
                <i :class="['icon','clearfix',item.icon,item.taskState==0?'ws':(item.taskState==1?'ing':'wc')]"></i>
                <span class="descr">{{item.taskStateDesc}}</span>
                <i class="el-icon-check current-state icon"
                   v-if="$store.state.chooseTask&&($store.state.chooseTask.taskPro == item.taskState)"></i>
            </li>
        </ul>
    </div>
</template>

<script>
    import loading from './loading.vue'
    import utils from '../../utils/utils.js';
    import moment from '../../lib/moment.min.js';
    export default {
        data() {
            return {
                taskStateList: [],
                loading: true
            }
        },
        created() {
            utils.request(this, {
                url: '/getTaskStateList',
                method: 'get',
                data: {},
            }, data => {
                this.taskStateList = data.returnData;
                this.loading = false;
            }, error => {
                this.loading = false;
            }, true);
        },
        components: {
            loading
        },
        methods: {
            chooseTaskState(e, taskState) {
                utils.request(this, {
                    url: '/updateTaskState',
                    method: 'post',
                    data: {taskId: this.$store.state.chooseTask.taskId, taskState},
                }, data => {
                    console.log(JSON.stringify(data, null, '  '));
                    var taskItem = data.returnData[0];
                    taskItem.showStartDate = taskItem.startDate ? moment(taskItem.startDate).format('MM月DD号') : '无';
                    taskItem.showEndDate = taskItem.endDate ? moment(taskItem.endDate).format('MM月DD号') : '无';
                    this.$store.state.chooseTask.taskPro = taskItem.taskPro;
                    this.$store.state.chooseTask.taskProDesc = taskItem.taskProDesc;
                    //                    this.$store.commit('updateSelectTaskDetail', taskItem);
                    this.$emit('changeState', false);
                }, error => {
                }, true);

            }
        }
    }
</script>

<style scoped lang="scss">
    .task-pro-list {
        width: 240px;
        min-height: 50px;
        padding: 5px 0;
        background-color: #ffffff;
        box-shadow: 0 2px 13px 1px rgba(0, 0, 0, .15);
        z-index: 9999 !important;
        .loading {
            margin-top: 15px;
        }
        ul {
            li {
                width: 240px;
                height: 40px;
                padding: 10px 20px;
                line-height: 20px;
                color: #666;
                .current-state {
                    float: right;
                }
            }
            li:hover {
                background-color: #f3f3f3;
                color: #333;

            }
        }
        .ws {
            color: rgb(250, 90, 85);
        }
        .ing {
            color: rgb(255, 164, 21);
        }
        .wc {
            color: rgb(34, 215, 187);
        }
        .icon {
            font-size: 16px;
            margin-right: 5px;
            font-weight: bolder;
            line-height: 16px;
        }
        .descr {
        }
    }

</style>