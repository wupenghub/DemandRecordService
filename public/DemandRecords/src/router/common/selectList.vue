<template>
    <div class="select-list">
        <loading v-show="loading" class="loading"></loading>
        <ul>
            <li v-for="item in dataList" :key="item.code"
                @click.self="chooseListItem(item)">
                <i :class="['icon','clearfix',item.icon]" :style="{color:item.fontColor,fontSize:item.fontSize}"></i>
                <span class="descr">{{item.descr}}</span>
                <i class="el-icon-check current-state icon"
                   v-if="selectItem.code&&(selectItem.code == item.code)"></i>
            </li>
        </ul>
    </div>
</template>

<script>
    import loading from './loading.vue'
    import utils from '../../utils/utils.js';
    import moment from '../../lib/moment.min.js';

    export default {
        data() {
            return {
                dataList: [],
                loading: true,
                selectItem: {}
            }
        },
        created() {
            this.dataList = this.passDataList;
            this.loading = this.isLoading;
        },
        components: {
            loading
        },
        methods: {
            chooseListItem(item) {
                this.$emit('selectCallBack',item);
            }
        },
        props: ['isLoading', 'passDataList']
    }
</script>

<style scoped lang="scss">
    .select-list {
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
                .current-state {
                    float: right;
                }
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
            line-height: 16px;
        }
        .descr {
        }
    }
</style>