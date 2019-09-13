<template>
    <div class="contain">
        <div class="item" v-for="item in sideDirectories">
            <div class="single_item" @click="doClick(item)"
                 :class="[item.sonList&&item.sonList.length>0?'directory':'',!(item.sonList&&item.sonList.length>0)&&$store.state.selectItem.menuCode==item.menuCode?'icon_color':'']">
                <i v-show="item.sonList&&item.sonList.length>0"
                   :class="[item.open?'fa fa-sort-desc icon':'fa fa-caret-right icon']">
                </i>
                <i v-show="!item.sonList||item.sonList.length==0" :class="[item.icon,'icon','icon_color']"></i>
                {{item.descr}}
            </div>
            <menuNode v-if="item.sonList&&item.sonList.length>0&&item.open"
                      :sideDirectories="item.sonList" @fun="passData"></menuNode>
        </div>
    </div>
</template>

<script>
    import menuNode from './menuNode.vue';

    export default {
        name: 'menuNode',
        data() {
            return {}
        },
        methods: {
            doClick(item) {
                if (item.sonList && item.sonList.length > 0) {
                    item.open = !item.open;
                } else {
                    this.$emit("fun", item);
                    this.$store.commit('updateSelectItem', item);
                    console.log(item);
                    localStorage.setItem('historyItem', JSON.stringify(item));
                }

            },
            passData(item) {
                this.$emit("fun", item);
            }
        },
        components: {
            menuNode
        },
        props: [
            'sideDirectories',
            'pSelectItem'
        ]
    }
</script>

<style scoped lang="scss">
    .contain {
        margin-top: 10px;
        .item {
            padding: 10px 20px;
            .icon {
                font-size: 15px;
                display: inline-block;
                margin: 0 3px 0 5px;
                width: 18px;
                height: 21px;
                color: #aaa;
                text-align: center;
            }
            .single_item {
                cursor: pointer;
                transition: all linear .2s;
                height: 23px;
            }
            .single_item:not(.directory):hover {
                color: #22d7bb;
                transform: translateX(10px);
                font-size: 15px;
                font-style: italic;
            }
            .icon_color {
                color: #22d7bb;
            }
        }
    }
</style>