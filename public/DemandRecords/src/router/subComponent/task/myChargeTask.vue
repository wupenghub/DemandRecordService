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
                    this.categoryListObject = [];
                    this.categoryListArray = [];
                    this.dataList.returnData.taskList.forEach(item => {
                        if (!this.categoryListObject[item.taskModelId]) {
                            this.categoryListObject[item.taskModelId] = [];
                        }
                        this.categoryListObject[item.taskModelId].push(item);

                    });
                    for (var key in this.categoryListObject) {
                        var objList = {};
                        objList.key = key;
                        objList.ListArry = this.categoryListObject[key];
                        objList.desc = objList.ListArry[0].taskModelDesc;
                        objList.taskPro = [];
                        this.dataList.returnData.taskPro.forEach(item => {
                            var obj = {};
                            for (var key in item) {
                                obj[key] = item[key];
                            }
                            objList.taskPro.push(obj)
                        });
                        objList.taskPro.forEach(item => item.count = 0);
                        objList.ListArry.forEach(obj => {
                            objList.taskPro.forEach(taskPro => {
                                if (obj.taskPro == taskPro.taskPro) {
                                    taskPro.count++;
                                }
                            })
                        });
                        this.categoryListArray.push(objList);
                    }
                }, error => {
                });
            }
        },
        components: {
            taskItem
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