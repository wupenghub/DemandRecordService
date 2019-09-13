<template>
    <div id="contain">
        <section class="app-nav-area">
            <div class="top_area">
                <a class="top">
                    <img src="../../image/team_logo_default.png"/>
                </a>
            </div>
            <div class="middle_area">
                <ul>
                    <li v-for="item in $store.state.moduleObjList">
                        <router-link :to="item.path" class="item" :key="item.icon"
                                     @mouseenter.native="enter(item)" @mouseleave.native="leave(item)">
                            <i :class="'fa '+item.icon+' icon'"></i>
                            <span class="desc">{{item.descr}}</span>
                            <i v-show="item.showTriangle" class="fa fa-caret-left triangle"></i>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="bottom_area">
                <a class="item">
                    <i class="fa fa-question-circle"></i>
                </a>
                <a class="avatar-default" style="background-color: rgb(45, 188, 255);">吴鹏</a>
            </div>
        </section>
        <div class="app-box">
            <div class="main-body-side">
                <sideHeader></sideHeader>
                <div class="middle">
                    <router-view :sideDirectories="sideDirectories" @fun="getInfo"></router-view>
                </div>
            </div>
            <div class="main-body">
                <selectComponent></selectComponent>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../lib/font-awesome-4.7.0/css/font-awesome.min.css';
    import sideHeader from '../common/sideHeader.vue';
    import selectComponent from '../common/selectComponent.vue'
    import utils from '../../utils/utils.js';

    export default {
        data() {
            return {
                categoryModules: [],
                titleObj: {
                    title: '',
                    titleLeftIcon: '',
                    titleRightIcon: ''
                },
                sideDirectories: [],
                itemInfo: {},
                menuList: []
            }
        },
        created() {
            var historyItem = localStorage.getItem('historyItem');
            this.$store.commit('updateSelectItem', JSON.parse(historyItem));
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$axios({
                url: '/menus',
                method: 'get',
                params: {menuType: 'sideMenu'}
            }).then(data => {
                this.categoryModules = data.returnData.filter(item => item.parentCode == 'top');
                this.$store.commit('updateModuleList', this.categoryModules);
                this.$emit("fun");
                data.returnData.forEach(item => utils.addList(data.returnData, item));
                data.returnData.forEach(item => item.open = true);
                data.returnData = data.returnData.filter(item => item.parentCode == 'top');
                this.menuList = data.returnData;
                this.sideDirectories = data.returnData.filter(item => this.$route.path.indexOf(item.path) != -1)[0].sonList;
//                this.itemInfo = this.$store.state.selectItem;
                loading.close();
            }).catch(error => {
                loading.close();
            });
        },
        methods: {
            enter(item) {
                item.icon = item.iconHover;
            },
            leave(item) {
                item.icon = item.iconNormal;

            },
            getInfo(item) {
                this.itemInfo = item;
            }
        },
        components: {
            sideHeader,
            selectComponent
        }
    }
</script>

<style scoped lang="scss">

    #contain {
        .app-nav-area {
            background: #22d7bb;
            width: 70px;
            height: 100%;
            padding: 0;
            position: fixed;
            .top_area {
                .top {
                    height: 50px;
                    text-align: center;
                    display: block;
                    margin: 18px 0 18px 0;
                    img {
                        display: inline-block;
                        height: 50px;
                        line-height: 50px;
                    }
                }
            }
            .middle_area {
                ul {
                    list-style: none;
                    padding: 0;
                    li {
                        list-style: none;
                        .item {
                            height: 70px;
                            text-align: center;
                            display: block;
                            text-decoration: none;
                            position: relative;
                            > * {
                                transition: all linear .4s;
                            }
                            i.icon {
                                font-size: 24px;
                                color: white;
                                line-height: 70px;
                                display: inline-block;
                            }
                            .desc {
                                line-height: 25px;
                                font-size: 12px;
                                color: white;
                                display: none;
                            }
                            .triangle {
                                position: absolute;
                                top: 25px;
                                right: 0;
                                font-size: 16px;
                                color: white;
                            }
                        }
                        .item:hover {
                            background: rgb(24, 191, 164);
                            cursor: pointer;
                            i.icon {
                                line-height: 40px;
                            }
                            span.desc {
                                display: block;
                                line-height: 25px;
                            }
                        }
                    }
                }

            }
            .bottom_area {
                position: absolute;
                bottom: 0;
                text-align: center;
                padding-bottom: 15px;
                margin: 0 auto;
                width: 70px;
                .item {
                    height: 70px;
                    text-align: center;
                    display: block;
                    i {
                        font-size: 24px;
                        color: white;
                        line-height: 70px;
                    }
                }
                .avatar-default {
                    display: inline-block;
                    border-radius: 24px;
                    width: 48px;
                    height: 48px;
                    background-color: rgb(45, 188, 255);
                    font-size: 14px;
                    color: white;
                    line-height: 48px;
                    margin-top: 10px;
                }
            }
        }
        .app-box {
            padding-left: 70px;
            .main-body-side {
                position: fixed;
                width: 239px;
                background-color: #fff;
                height: 100%;
                overflow: auto;
                .head {

                }
            }
            .main-body {
                margin-left: 240px;
            }
        }
    }
</style>