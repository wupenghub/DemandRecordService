import VueRouter from 'vue-router';
import projectSideMiddleContent from '../router/subComponent/menuNode.vue';
import taskInfo from '../router/taskDetail/taskInfo.vue';
import sonTask from '../router/taskDetail/sonTask.vue';
import workTime from '../router/taskDetail/workTime.vue';
import file from '../router/taskDetail/file.vue';

var vueRouter = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/project'
        },
        {
            path: '/project/projectSideMiddleContent',
            component: projectSideMiddleContent,
            name: 'projectSideMiddleContent'
        },
        {
            name:'taskDetail',
            path: '/taskDetail/taskInfo',
            component: taskInfo
        },
        {
            name:'taskDetail',
            path: '/taskDetail/sonTask',
            component: sonTask
        },
        {
            name:'taskDetail',
            path: '/taskDetail/workTime',
            component: workTime
        },
        {
            name:'taskDetail',
            path: '/taskDetail/file',
            component: file
        },
    ]
});
export default vueRouter;