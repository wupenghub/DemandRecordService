<template>
    <div class="contain project-header">
        <el-tabs v-model="activeName" @tab-click="handleClick" ref="tabs">
            <el-tab-pane class="pane" v-for="tab in tabs" :label="tab.descr" :name="tab.menuCode">
                <myChargeTask v-if="tab.menuCode == 'chargeOfMine'"></myChargeTask>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import utils from '../../utils/utils.js';
    import myChargeTask from '../subComponent/task/myChargeTask.vue';

    export default {
        data() {
            return {
                tabs: [],
                activeName: '',
            };
        },
        methods: {
            handleClick(tab, event) {

            },
        },
        created() {
            var parentCode = this.$store.state.selectItem.menuCode ? this.$store.state.selectItem.menuCode : 'myTask';
            utils.request(this, {
                url: '/menus',
                method: 'get',
                params: {menuType: 'topMenu', parentCode}
            }, data => {
                this.tabs = data.returnData;
                this.activeName = this.tabs[0].menuCode;
            }, error => {
            });
        },
        props: ['info'],
        components: {
            myChargeTask
        },
        watch: {
            '$store.state.selectItem': function (newVal) {
                utils.request(this, {
                        url: '/menus',
                        method: 'get',
                        params: {menuType: 'topMenu', parentCode: newVal.menuCode},
                    }, data => {
                        this.tabs = data.returnData;
                        this.activeName = this.tabs[0].menuCode;
                    }, error => {
                    }
                );
            }
        }
    }
    ;
</script>
<style lang="scss">
    .project-header {
        .el-tab-pane {
            width: 1500px !important;
            overflow: auto !important;
        }
    }
</style>
<style scoped lang="scss">
    .contain {
        /deep/ .el-tabs__header.is-top {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 55px;
        }

        /deep/ .el-card__header {
            padding: 17px 10px 10px !important;
            height: 45px !important;
            line-height: 18px;
        }
        .pane {

        }
    }
</style>

