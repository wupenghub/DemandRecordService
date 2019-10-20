<template>
    <div class="comments">
        <div class="comment clearfix" v-for="comment in taskCommentList">
            <div class="clearfix">
                <span class="comment-per">{{comment.createName}}</span>
                <div class="comment-content clearfix" v-if="comment.commentDesc">
                    <div class="comment-title">
                        <span class="comment-name">{{comment.createName}}</span>
                        <span class="parent-comment-name"
                              v-if="comment.parentCommentName">回复{{comment.parentCommentName}}</span>
                        <span class="comment-time">{{comment.showCommentTime}}</span>
                    </div>
                    <div class="comment-desc-box">
                    <span class="comment-desc">
                        {{comment.commentDesc}}
                    </span>
                    </div>
                </div>
                <el-tooltip effect="dark" content="删除" :open-delay=500>
                    <span class="delete fa fa-trash-o" @click="deleteComment(comment.commentId)"></span>
                </el-tooltip>
                <el-tooltip effect="dark" content="回复" :open-delay=500>
                    <span class="reply fa fa-share" @click="replyComment(comment.commentId)"></span>
                </el-tooltip>

            </div>
            <taskComment :level="'inner'" @deleteComment="sonDeleteComment" @replyComment="sonReplyComment" v-if="comment.sonList"
                         :taskCommentList="comment.sonList"></taskComment>
            <span class="end" v-if="level=='outter'"></span>
        </div>
    </div>

</template>

<script>
    import taskComment from './taskComment.vue';

    export default {
        name: 'taskComment',
        data() {
            return {}
        },
        created() {
        },
        props: ['taskCommentList', 'level'],
        components: {
            taskComment
        },
        methods: {
            deleteComment(commentId) {
                this.$emit('deleteComment', commentId);
            },
            replyComment(commentId) {
                this.$emit('replyComment', commentId);
            },
            sonDeleteComment(commentId) {
                this.$emit('deleteComment', commentId);
            },
            sonReplyComment(commentId) {
                this.$emit('replyComment', commentId);
            }
        }
    }
</script>

<style scoped lang="scss">
    .comments {
        .comment {
            .comment-per {
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
                margin-right: 10px;
                overflow: hidden;
            }
            .comment-content {
                float: left;
                .comment-title {
                    line-height: 20px;
                }
                .comment-desc-box {
                    max-height: 74px;
                    overflow: auto;
                }
            }
            .comment-time {
                color: rgb(170, 170, 170);
                font-size: 12px;
            }
            .parent-comment-name {
                font-size: 12px;
            }
            .reply {
                float: right;
                color: #cccccc;
                cursor: pointer;
                margin-right: 15px;
            }
            .reply:hover {
                color: #22d7bb;
            }
            .delete {
                float: right;
                cursor: pointer;
                color: #cccccc;
            }
            .delete:hover {
                color: red;
            }
        }
    }

    .end {
        display: block;
        height: 1px;
        background-color: #cccccc;
        margin-bottom: 15px;
    }
</style>