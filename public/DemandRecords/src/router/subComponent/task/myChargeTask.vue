<template>
    <div class="contain">
        <div class="load-box" style="width: 1100px">
            <loading v-if="requestData"></loading>
        </div>
        <div class="category-task-item" v-for="item in categoryListArray">
            <taskItem :category-list-array="item" @fun="queryMineTask" @addData="addData"
                      @passStatus="passStatus"></taskItem>
        </div>
        <taskDetail :dialogVisible="dialogVisible" @passStatus="passStatus"></taskDetail>
    </div>

</template>

<script>
    import taskItem from '../../subComponent/task/taskItem.vue';
    import utils from '../../../utils/utils.js';
    import dragula from '../../../lib/dragula/dist/dragula.js';
    import '../../../lib/dragula/dist/dragula.css';
    import taskDetail from './taskDetail.vue'
    import loading from '../../common/loading.vue'

    export default {
        data() {
            return {
                dataList: [],
                categoryListObject: {},
                categoryListArray: [],
                sonDataList: [],
                count: 0,
                dialogVisible: false,
                requestData: true
            }
        },
        created() {
            this.queryMineTask();
        },
        methods: {
            queryMineTask() {
                utils.request(this, {
                    url: '/getTasks',
                    method: 'get',
                    params: {type: 'mineCharge', email: '565784355@qq.com'}
                }, data => {
                    this.dataList = data;
                    this.categoryListArray = [];
                    this.dataList.returnData.taskModel.forEach(item => {
                        var obj = {};
                        obj.key = item.taskModelId;
                        obj.desc = item.taskModelDesc;
                        obj.ListArry = [];
                        this.dataList.returnData.taskList.forEach(taskItem => {
                            if (taskItem.taskModelId == obj.key) {
                                obj.ListArry.push(taskItem);
                            }
                        });
                        this.categoryListArray.push(obj)
                    });
                    this.categoryListArray.forEach(item => {
                        item.taskPro = [];
                        this.dataList.returnData.taskPro.forEach(taskPro => {
                            var obj = {};
                            for (var key in taskPro) {
                                obj[key] = taskPro[key];
                            }
                            obj.count = 0;
                            item.taskPro.push(obj);
                        });
                    });
                    this.categoryListArray.forEach(taskItem => {
                        taskItem.ListArry.forEach(listItem => {
                            taskItem.taskPro.forEach(taskPro => {
                                if (listItem.taskPro == taskPro.taskPro) {
                                    taskPro.count++;
                                }
                            })
                        })
                    });
                    this.requestData = false;
                }, error => {
                    this.requestData = false;
                }, true);
            },
            addData(arr) {
                this.count++;
                if (arr) {
                    arr.forEach(item => this.sonDataList.push(item));
                }
                var _this = this;
                //完全添加完子组件之后才能进行事件回调
                if (this.count == this.dataList.returnData.taskModel.length) {
                    dragula(arr).on('drag', function (el) {
                        el.className = el.className.replace('ex-moved', '');
                        el.style.cursor = 'grab';
                    }).on('drop', function (el, target, source) {
                        el.style.cursor = 'pointer';
                        var taskModelId = target.dataset.taskModel;
                        var taskId = el.dataset.taskId;
                        utils.request(_this, {
                            url: '/updateTask',
                            method: 'post',
                            data: {taskId, taskModelId}
                        }, data => {
                            if (data.returnData.affectedRows > 0) {
                                _this.queryMineTask();
                            }
                        }, error => {
                        }, true);
                    }).on('over', function (el, container) {
                    }).on('out', function (el, container) {
                    });
                }

            },
            passStatus(status) {
                this.dialogVisible = status;
            }
        },
        components: {
            taskItem, taskDetail, loading
        }
    }
</script>

<style scoped lang="scss">
    .contain {
        .category-task-item {
            float: left;
            /*display: inline-block;*/
            margin-right: 10px;
        }
    }

</style>