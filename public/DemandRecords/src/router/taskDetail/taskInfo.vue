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
                                :passDataList="taskPriorityList" :passItems="taskInfos"
                                :isLoading="false"></selectList>
                </div>
                <div class="task-info-item project-label">
                    <span class="desc">标签：</span>
                    <div class="label-info item-info">
                        <el-tooltip effect="dark" v-for="item in taskLabels" :key="item.labelCode"
                                    :content="item.labelDesc" placement="bottom" :open-delay=500>
                            <span class="label-shape"
                                  :style="{background:item.bgColor,color:item.fontColor}">
                                {{item.flg}}
                            </span>
                        </el-tooltip>
                        <span class="add-label" @click="addLabel()"><i class="fa fa-plus label-icon"></i>
                                添加标签
                            <selectList @selectCallBack="selectCallBack" class="label-list" v-if="showLabelList"
                                        :passDataList="labelList" :passItems="taskLabels"
                                        :isLoading="loading"></selectList>
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
                <editor :taskDesc="taskDesc" class="editor" v-show="showEditor" @getDesc="getDesc"></editor>
                <span class="add-desc" @click="addDesc()" v-show="!taskDesc&&!showEditor">添加描述</span>
                <div class="show-desc" v-show="!showEditor">
                </div>
                <span class="edit-desc" @click="addDesc()" v-show="taskDesc&&!showEditor">编辑</span>
                <div class="button-groups" v-show="showEditor">
                    <button class="save-desc" @click="saveDesc()">保存</button>
                    <span class="cancel" @click="cancel()">取消</span>
                </div>
            </div>
            <span class="divider"></span>
            <div class="comments">
                <span class="comments-header">
                    <i class="fa fa-commenting-o"></i>
                    评论
                </span>
                <div class="comment-list">
                    <taskComment v-if="$store.state.taskCommentList&&$store.state.taskCommentList.length>0"
                                 class="comment-item" @replyComment="replyComment"
                                 @deleteComment="deleteComment"
                                 :taskCommentList="$store.state.taskCommentList" :level="'outter'"></taskComment>
                    <div class="non-comment-list"
                         v-if="!$store.state.taskCommentList||$store.state.taskCommentList.length==0">
                        <span class="non-commment fa fa-edit (alias)"></span>
                        <div class="non-commment-desc">暂无评论</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import loading from '../common/loading.vue';
    import utils from '../../utils/utils.js';
    import selectList from '../common/selectList.vue';
    import editor from '../subComponent/editor.vue';
    import taskComment from '../comments/taskComment.vue';
    import moment from '../../lib/moment.min.js';

    export default {
        data() {
            return {
                requestData: true,
                taskInfo: null,
                taskInfos: [],
                taskInfoItems: [],
                taskLabels: [],
                partInPers: [],
                taskPriorityList: [],
                showSelectList: false,
                showLabelList: false,
                taskLabelList: [],
                labelList: [],
                loading: true,
                currentSelectModel: '',
                taskDesc: '',
                showEditor: false,
                taskCommentList: []
            }
        },
        created() {
            this.getData();
        },
        mounted() {
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
                    this.taskInfo.code = this.taskInfo.priority;
                    this.taskDesc = this.taskInfo.taskDesc;
                    this.renderPage(data);
                    this.taskLabels = data.resultData.taskLabelList;
                    this.partInPers = data.resultData.partPerList;
                    this.taskPriorityList = data.resultData.taskPriorityList;
                    this.taskLabelList = data.resultData.taskLabelList;
//                    this.taskCommentList = data.resultData.taskCommentList;
                    this.$store.commit('updateTaskCommentList', data.resultData.taskCommentList);
                    this.taskPriorityList.forEach(item => {
                        item.code = item.priorityCode;
                        item.descr = item.priorityDesc;
                        item.icon = item.icon;
                    });
                    this.taskLabelList.forEach(item => {
                        item.code = item.labelCode;
                        item.descr = item.flg;
                    });
                    //兼容addList方法
                    this.$store.state.taskCommentList.forEach(item => {
                        item.parentCode = item.parentComment;
                        item.menuCode = item.commentId;
                        item.showCommentTime = moment(item.createDate).format('MM月DD日 HH:mm');
                    });
                    this.$store.state.taskCommentList.forEach(item => utils.addList(this.$store.state.taskCommentList, item));
                    var arr = [];
                    this.$store.state.taskCommentList.forEach(item => {
                        if (!item.parentCode) {
                            arr.push(item);
                        }
                    });
                    this.$store.commit('updateTaskCommentList', arr);
                    document.querySelector('.show-desc').innerHTML = this.taskDesc;
                    console.log(JSON.stringify(this.$store.state.taskCommentList, null, '  '));

                }, error => {
                    this.requestData = false;
                }, true);
            },
            renderPage(data) {
            },
            toggleSelectList() {
                this.currentSelectModel = 'priority';
                this.showSelectList = !this.showSelectList;
                this.taskInfos = [];
                this.taskInfos.push(this.taskInfo)
            },
            selectCallBack(item, isChoose) {
                if (this.currentSelectModel == 'priority') {
                    this.showLabelList = false;
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
                } else if (this.currentSelectModel == 'label') {
                    var type = isChoose ? 'add' : 'remove';
                    utils.request(this, {
                        url: '/updateTaskLabel',
                        method: 'post',
                        data: {
                            type,
                            taskId: this.taskId,
                            taskLabelCode: item.code
                        },
                    }, data => {
                        this.taskLabels = data.returnData;
                        this.taskLabels.forEach(item => {
                            item.code = item.labelCode;
                            item.descr = item.flg;
                        });
                    }, error => {
                    }, true);
                }
            },
            addLabel() {
                this.currentSelectModel = 'label';
                this.showLabelList = !this.showLabelList;
                this.loading = true;
                this.labelList = [];
                if (this.showLabelList) {
                    utils.request(this, {
                        url: '/selectLabelList',
                        method: 'get',
                    }, data => {
                        this.labelList = data.returnData;
                        this.labelList.forEach(item => {
                            item.code = item.labelCode;
                            item.descr = item.flg;
                            item.fontColor = item.bgColor;
                        });
                        this.loading = false;
                    }, error => {
                        this.loading = false;
                    }, true);
                }
            },
            cancel() {
                this.showEditor = false;
            },
            saveDesc() {
                document.querySelector('.show-desc').innerHTML = this.taskDesc;
                this.showEditor = false;
                utils.request(this, {
                    url: '/updateTaskDesc',
                    method: 'post',
                    data: {
                        taskId: this.taskId,
                        taskDesc: this.taskDesc
                    }
                }, data => {

                }, error => {
                }, true);
            },
            getDesc(desc) {
                this.taskDesc = desc;
            },
            addDesc() {
                this.showEditor = true;
            },
            replyComment(commentId) {
                this.$emit('sendComment', commentId);
            },
            deleteComment(commentId) {
            }
        },
        components: {
            loading, selectList, editor, taskComment
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
                    overflow: hidden;
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
                    user-select: none;
                }
            }
        }
    }

    .button-groups {
        height: 28px;
        line-height: 28px;
        margin-top: 10px;
        .cancel {
            display: inline-block;
            cursor: pointer;
            color: #aaa;
            height: 28px;
            line-height: 28px;
            margin-right: 5px;
            text-align: center;
        }
        .cancel:hover {
            color: #22d7bb;
        }
        .save-desc {
            width: 70px;
            height: 28px;
            background-color: #22d7bb;
            border: none;
            line-height: 28px;
            border-radius: 14px;
            color: white;
            margin: 0 !important;
            padding: 0 !important;
            outline: none;
            cursor: pointer;
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

    .editor {
        /*margin-top: 10px;*/
    }

    .add-desc {
        color: #22d7bb;
        text-decoration: underline;
        cursor: pointer;
    }

    .edit-desc {
        color: #22d7bb;
        cursor: pointer;
    }

    .divider {
        margin-top: 30px;
        display: block;
        width: 100%;
        height: 1px;
        background: #cccccc;
    }

    .comments {
        padding: 0 20px;
        .comments-header {
            color: #22d7bb;
        }
        .non-comment-list {
            height: 96px;
            display: block;
            text-align: center;
            color: #eeeeee;
            line-height: 30px;
            span.non-commment {
                font-size: 48px;
            }
            div.non-commment-desc {
                font-size: 18px;
                color: #cccccc;
            }

        }
    }
</style>