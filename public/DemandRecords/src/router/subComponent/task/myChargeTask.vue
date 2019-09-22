<template>
    <div class="contain">
        <div class="category-task-item" v-for="item in categoryListArray">
            <taskItem :category-list-array="item"></taskItem>
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
                        objList.taskPro = this.dataList.returnData.taskPro;
                        objList.taskPro.forEach(item => item.count = 0);
                         objList.ListArry.forEach(obj => {
                             console.log(obj)
                            objList.taskPro.forEach(taskPro=>{
                                if(obj.taskPro == taskPro.taskPro){
                                    taskPro.count ++;
                                }
                            })
                        });
                        /*for (var i = 0; i < objList.ListArry.length; i++) {
                            var obj = objList.ListArry[i];
                            for (var j = 0; j < objList.taskPro.length; j++) {
                                var taskPro = objList.taskPro[j];
                                if (obj.taskPro == taskPro.taskPro) {
                                    taskPro.count++;
                                    break;
                                }

                            }
                        }*/
                        this.categoryListArray.push(objList);
                        console.log('==========' + key + '=============');
                        console.log(JSON.stringify(this.categoryListArray, null, '  '));
                        console.log('==========' + key + '=============');
                    }
//                    console.log(JSON.stringify(this.categoryListArray,null,'  '));
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