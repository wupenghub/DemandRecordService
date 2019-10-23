<template>
    <div class="comments">
        <span class="divider"></span>
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
</template>

<script>
    import taskComment from '../comments/taskComment.vue';

    export default {
        name: "comments",
        components: {
            taskComment
        },
        methods: {
            replyComment(commentId) {
                this.$emit('replyComment', commentId);
            },
            deleteComment(commentId) {
            }
        }
    }
</script>

<style scoped lang="scss">
    .comments {
        padding: 0 20px;
        .divider {
            margin-top: 30px;
            display: block;
            width: 100%;
            height: 1px;
            background: #cccccc;
        }
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