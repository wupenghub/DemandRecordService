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
                <div class="task-info-item project-priority" @click="toggleSelectList()">
                    <span class="desc">优先级：</span>
                    <div class="priority-info item-info">
                        <span :class="['icon',item.icon]" :style="{color:item.fontColor,fontSize:item.fontSize}"
                              v-for="item in taskPriorityList" :key="item.priorityCode"
                              v-if="taskInfo&&taskInfo.priority==item.priorityCode"></span>
                        <span>{{taskInfo && taskInfo.priorityDesc}}</span>
                    </div>
                    <selectList @selectCallBack="selectCallBack" class="select-list" v-if="showSelectList"
                                :passDataList="taskPriorityList" :passItem="taskInfo"
                                :isLoading="false"></selectList>
                </div>
                <div class="task-info-item project-label">
                    <span class="desc">标签：</span>
                    <div class="label-info item-info">
                        <span class="label-shape" v-for="item in taskLabels" :key="item.labelCode"
                              :style="{background:item.bgColor,color:item.fontColor}">
                            {{item.icon}}
                        </span>
                        <span class="add-label" @click="addLabel()"><i class="fa fa-plus label-icon"></i>
                                添加标签
                            <selectList @selectCallBack="selectCallBack" class="label-list" v-if="showLabelList"
                                        :passDataList="taskPriorityList" :passItem="taskInfo"
                                        :isLoading="false"></selectList>
                        </span>
                    </div>
                </div>
                <div class="task-info-item project-part-in">
                    <span class="desc">参与人：</span>
                    <div class="part-in-info item-info">
                        <span class="part-in-per" v-for="item in partInPers" :key="item.partInPerCode">
                            {{item.partInPerName}}
                        </span>
                        <span class="add-per">
                            <i class="fa fa-plus"></i>
                        </span>
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
    import selectList from '../common/selectList.vue';

    export default {
        data() {
            return {
                requestData: true,
                taskInfo: null,
                taskInfoItems: [],
                taskLabels: [],
                partInPers: [],hai
                taskPriorityList: [],
                showSelectList: false,
                showLabelList: false,
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
                    console.log(JSON.stringify(data, null, '  '));
                    this.taskInfo = data.resultData.taskInfoList[0];
                    this.taskInfo.code = this.taskInfo.priority;
                    this.renderPage(data);
                    this.taskLabels = data.resultData.taskLabelList;
                    this.partInPers = data.resultData.partPerList;
                    this.taskPriorityList = data.resultData.taskPriorityList;
                    this.taskPriorityList.forEach(item => {
                        item.code = item.priorityCode;
                        item.descr = item.priorityDesc;
                        item.icon = item.icon;
                    })
                }, error => {
                    this.requestData = false;
                }, true);
            },
            renderPage(data) {
            },
            toggleSelectList() {
                this.showSelectList = !this.showSelectList;
            },
            selectCallBack(item) {
                this.taskInfo.priority = item.priorityCode;
                this.taskInfo.priorityDesc = item.descr;
                this.taskInfo.code = this.taskInfo.priority;
                utils.request(this, {
                    url: '/updateTaskPriority',
                    method: 'post',
                    data: {
                        taskId: this.taskId,
                        priority: this.taskInfo.priority
                    },
                }, data => {
                }, error => {

                }, true);
            },
            addLabel() {
                this.showLabelList = !this.showLabelList;
            }
        },
        components: {
            loading, selectList
        },
        props: ['taskId']
    }
</script>

<style scoped lang="scss">
    .task_info {
        .load {
            margin-top: 10px;
        }
        .priority-info {
            height: 32px;
            width: 200px;
            padding: 5px 15px;
            margin-top: -5px;
            .delete-project-priority {
                float: right;
                color: #aaa;
                line-height: 22px;
                display: none;
            }
            .delete-project-priority:hover {
                color: red;
                cursor: pointer;
            }
        }
        .priority-info:hover {
            height: 32px;
            border: 1px solid #22d7bb;
            border-radius: 3px;
            padding: 4px 14px;
        }
        .priority-info:hover .delete-project-priority {
            display: block;
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
                font-size: 14px;
                line-height: 20px;
            }
            .project-name {
                .project-info {

                }
            }
            .task-desc {
                padding: 0 10px;
            }
            .project-label {
                .label-shape {
                    height: 22px;
                    line-height: 12px;
                    padding: 5px 10px;
                    border-radius: 3px;
                    display: inline-block;
                    margin: 0 8px 4px 0;
                }
                .label-shape:hover {
                    cursor: pointer;
                }
                .add-label {
                    display: inline-block;
                    height: 22px;
                    line-height: 12px;
                    padding: 5px 10px;
                    color: #aaa;
                    background-color: #eee;
                    border-radius: 3px;
                    font-size: 14px;
                    cursor: pointer;
                    position: relative;
                    .label-list {
                        position: absolute;
                        top: 30px !important;
                        right: 0;
                    }
                }

            }
            .project-part-in {
                .part-in-per {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                    background-color: rgb(45, 188, 255);
                    color: white;
                    line-height: 30px;
                    font-size: 12px;
                    text-align: center;
                    float: left;
                    margin-right: 5px;
                }
                .add-per {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                    border: 1px dashed #aaa;
                    float: left;
                    line-height: 30px;
                    text-align: center;
                    cursor: pointer;
                }
            }
            .project-priority {
                position: relative;
                .select-list {
                    position: absolute;
                    top: 80px;
                    left: 0;
                }
            }
        }
    }

    .icon {
        color: #22d7bb;
        font-size: 18px;
        margin-right: 5px;
    }

    .label-icon {
        margin-right: 5px;
    }

</style>