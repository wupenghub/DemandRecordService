<template>
    <div class="contain">
        <div class="category-task-item" v-for="item in categoryListArray">
            <taskItem :category-list-array="item" @fun="queryMineTask"></taskItem>
        </div>
    </div>

</template>

<script>
    import taskItem from '../../subComponent/task/taskItem.vue';
    import utils from '../../../utils/utils.js';
    export default {
        data() {
            return {
                dataList: [],
                categoryListObject: {},
                categoryListArray: []
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
                        })
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
                        taskItem.ListArry.forEach(listItem=>{
                            taskItem.taskPro.forEach(taskPro=>{
                                if(listItem.taskPro == taskPro.taskPro){
                                    taskPro.count++;
                                }
                            })
                        })
                    });
                }, error => {
                }, true);
            },
        },
        components: {
            taskItem
        },
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