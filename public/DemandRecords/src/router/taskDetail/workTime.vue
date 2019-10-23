<template>
    <div class="workTime">
        <loading v-show="requestData" class="load"></loading>
        <comments @replyComment="replyComment"
                  @deleteComment="deleteComment"></comments>
    </div>
</template>

<script>
    import loading from '../common/loading.vue';
    import comments from '../comments/comments.vue';

    export default {
        data() {
            return {
                requestData: true,
            }
        },
        methods: {
            replyComment(commentId) {
                this.$emit('sendComment', commentId);
            },
            deleteComment(commentId) {
            }
        },
        components: {
            loading, comments
        },
    }
</script>

<style scoped>


</style>