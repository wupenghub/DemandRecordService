<template>
    <div class="contain">
        <el-tabs v-model="activeName" @tab-click="handleClick" ref="tabs">
            <el-tab-pane v-for="tab in tabs" :label="tab.descr" :name="tab.menuCode">{{tab.descr}}</el-tab-pane>

           <!-- <el-tab-pane :label="info.descr" name="first">{{info.descr}}</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
        </el-tabs>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tabs:[],
                activeName: '',

            };
        },
        methods: {
            handleClick(tab, event) {
                tab.$el.style.display = 'none';
            },
        },
        mounted() {
        },
        props: ['info'],
        watch: {
            info:function (newVal,oldVal) {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios({
                    url: '/menus',
                    method: 'get',
                    params: {menuType:'topMenu',parentCode:this.info.menuCode}
                }).then(data => {
                    this.tabs = data.returnData;
                    console.log(this.tabs)
                    loading.close();
                }).catch(error => {
                    loading.close();
                });
            }
        }
    }
    ;
</script>
<style scoped lang="scss">
    .contain {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

