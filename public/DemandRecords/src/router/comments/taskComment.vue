<template>
    <div class="comments">
        <div class="comment clearfix" v-for="comment in taskCommentList">
            <div :class="['clearfix',comment.sonList?'comment-none-border':'comment-boder']">
                <span class="comment-per">{{comment.createName}}</span>
                <div class="comment-content clearfix" v-if="comment.commentDesc">
                    <div class="comment-title">
                        <span class="comment-name">{{comment.createName}}</span>
                        <span class="comment-time">{{comment.showCommentTime}}</span>
                    </div>
                    <div class="comment-desc-box">
                    <span class="comment-desc">
                        {{comment.commentDesc}}
                    </span>
                    </div>
                </div>
            </div>
            <taskComment v-if="comment.sonList" :taskCommentList="comment.sonList"></taskComment>
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
        props: ['taskCommentList'],
        components: {
            taskComment
        },
        watch: {
            'taskCommentList': function (newval) {
                console.log(JSON.stringify(newval, null, '  '));
            }
        }
    }
</script>

<style scoped lang="scss">
    .comments {
        .comment {
            padding-bottom: 5px;
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
        }
    }

    .comment-boder {
        border-bottom: 1px solid #ccc;
    }

    .comment-none-border {
        border-bottom: none;
    }
</style>