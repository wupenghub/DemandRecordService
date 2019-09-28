import Vue from 'vue';
import appVue from './router/app.vue';
import VueRouter from 'vue-router';
import router from './js/router.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex';
import request from './utils/Http.js';
import moment from './lib/moment.min.js';
// import './lib/dragula/dist/dragula.css';

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.$axios = request;
const store = new Vuex.Store({
    state: {
        sideTitleObj: {
            title: '',
            titleLeftIcon: '',
            titleRightIcon: '',
            showSearch: true,
            placeHolder: ''
        },
        moduleObjList: [],
        currentModule: {},
        selectItem: {
            "icon": "fa fa-user icon",
            "descr": "我的任务",
            "path": "/project/projectSideMiddleContent/selectComponent",
            "iconNormal": null,
            "iconHover": null,
            "parentCode": "work",
            "menuCode": "myTask",
            "open": true
        }
    },
    mutations: {
        updateSideInfo(state, sideTitleObj) {
            state.sideTitleObj.title = sideTitleObj.title ? sideTitleObj.title : state.sideTitleObj.title;
            state.sideTitleObj.titleLeftIcon = sideTitleObj.titleLeftIcon ? sideTitleObj.titleLeftIcon : state.sideTitleObj.titleLeftIcon;
            state.sideTitleObj.titleRightIcon = sideTitleObj.titleRightIcon ? sideTitleObj.titleRightIcon : state.sideTitleObj.titleRightIcon;
            state.sideTitleObj.placeHolder = sideTitleObj.placeHolder ? sideTitleObj.placeHolder : state.sideTitleObj.placeHolder;
            state.sideTitleObj.showSearch = sideTitleObj.showSearch == undefined ? state.sideTitleObj.showSearch : sideTitleObj.showSearch;
        },
        updateModuleList(state, moduleList) {
            state.moduleObjList = [];
            if (moduleList)
                state.moduleObjList = state.moduleObjList.concat(moduleList);
        },
        updateSelectItem(state, selectItem) {
            state.selectItem = selectItem ? selectItem : state.selectItem;
        }
    }
});
Vue.filter('timeFormat', function (value) {
    if (!value) return '';
    value = value.toString()
    return moment(value).format('YYYY-MM-DD')
})
var vue = new Vue({
    el: '#app',
    router,
    store,
    render: DemandRecorde => DemandRecorde(appVue)
});