<template>
    <div class="task-pro-list">
        <loading v-show="loading" class="loading"></loading>
    </div>
</template>

<script>
    import loading from './loading.vue'
    import utils from '../../utils/utils.js';

    export default {
        data() {
            return {
                taskStateList: [],
                loading:false
            }
        },
        created() {

        },
        components: {
            loading
        },
        props: ['loadTaskStateList'],
        watch: {
            'loadTaskStateList': function (newval) {
                this.loading = newval;
                if (newval) {
                    utils.request(this, {
                        url: '/getTaskStateList',
                        method: 'get',
                        data: {},
                    }, data => {
                        console.log(JSON.stringify(data, null, ' '));
                        this.loading = false;
                        this.$emit('changeState',this.loading);
                    }, error => {
                        this.loading = false;
                    }, true);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .task-pro-list {
        width: 240px;
        min-height: 50px;
        padding: 5px 0;
        background-color: #ffffff;
        box-shadow: 0 2px 13px 1px rgba(0, 0, 0, .15);
        z-index: 9999 !important;
        .loading {
            margin-top: 15px;
        }
    }

</style>