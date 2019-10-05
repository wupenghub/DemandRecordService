<template>
    <div class="task-pro-list">
        <loading v-show="loading" class="loading"></loading>
        <ul>
            <li v-for="item in taskStateList" :key="item.taskState"
                @click.self="chooseTaskState($event,item.taskState)">
                <i :class="['icon',item.icon,item.taskState==0?'ws':(item.taskState==1?'ing':'wc')]"></i>
                <span>{{item.taskStateDesc}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import loading from './loading.vue'
    import utils from '../../utils/utils.js';

    export default {
        data() {
            return {
                taskStateList: [],
                loading: true
            }
        },
        created() {
            utils.request(this, {
                url: '/getTaskStateList',
                method: 'get',
                data: {},
            }, data => {
                this.taskStateList = data.returnData;
                this.loading = false;
            }, error => {
                this.loading = false;
            }, true);
        },
        components: {
            loading
        },
        methods: {
            chooseTaskState() {
                this.$emit('changeState', false);
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
        ul {
            li {
                width: 240px;
                height: 40px;
                padding: 10px 20px;
                line-height: 20px;
                color: #666;
            }
            li:hover {
                background-color: #f3f3f3;
                color: #333;

            }
        }
        .ws {
            color: rgb(250, 90, 85);
        }
        .ing {
            color: rgb(255, 164, 21);
        }
        .wc {
            color: rgb(34, 215, 187);
        }
        .icon {
            font-size: 16px;
            margin-right: 5px;
            font-weight: bolder;
        }
    }

</style>