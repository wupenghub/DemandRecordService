<template>
    <div class="contain">
        <el-tabs v-model="activeName" @tab-click="handleClick" ref="tabs">
            <el-tab-pane v-for="tab in tabs" :label="tab.descr" :name="tab.menuCode">
                <myChargeTask  v-if="tab.menuCode == 'chargeOfMine'"></myChargeTask>
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
                activeName: ''
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
        components:{
//            taskItem,
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
<style scoped lang="scss">
    .contain {
        overflow: auto;
        width: 1200px;
    }
</style>

