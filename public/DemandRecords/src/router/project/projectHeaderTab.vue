<template>
    <div class="contain">
        <el-tabs v-model="activeName" @tab-click="handleClick" ref="tabs">
            <el-tab-pane v-for="tab in tabs" :label="tab.descr" :name="tab.menuCode">{{tab.descr}}</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
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
        mounted() {
        },
        created() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            var parentCode = this.$store.state.selectItem.menuCode ? this.$store.state.selectItem.menuCode : 'myTask';
            this.$axios({
                url: '/menus',
                method: 'get',
                params: {menuType: 'topMenu', parentCode}
            }).then(data => {
                this.tabs = data.returnData;
                console.log(this.tabs[0].menuCode);
                this.activeName = this.tabs[0].menuCode
                loading.close();
            }).catch(error => {
                loading.close();
            });
        },
        props: ['info'],
        watch: {
            '$store.state.selectItem': function (newVal) {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios({
                    url: '/menus',
                    method: 'get',
                    params: {menuType: 'topMenu', parentCode: newVal.menuCode}
                }).then(data => {
                    this.tabs = data.returnData;
                    this.activeName = this.tabs[0].menuCode;
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

