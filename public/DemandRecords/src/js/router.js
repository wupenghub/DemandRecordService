import VueRouter from 'vue-router';
import projectSideMiddleContent from '../router/subComponent/menuNode.vue';
import taskInfo from '../router/taskDetail/taskInfo.vue';
import sonTask from '../router/taskDetail/sonTask.vue';
import workTime from '../router/taskDetail/workTime.vue';
import file from '../router/taskDetail/file.vue';
import connectTask from '../router/taskDetail/connectTask.vue';

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
            name: 'taskInfo',
            path: '/taskDetail/taskInfo',
            component: {
                taskDetail: taskInfo
            }
        },
        {
            name: 'sonTask',
            path: '/taskDetail/sonTask',
            component: {
                taskDetail: sonTask
            }
        },
        {
            name: 'workTime',
            path: '/taskDetail/workTime',
            component: {taskDetail: workTime}
        },
        {
            name: 'file',
            path: '/taskDetail/file',
            component: {taskDetail: file}
        },
        {
            name: 'connectTask',
            path: 'taskDetail/connectTask',
            component: {taskDetail: connectTask}
        }

    ]
});
export default vueRouter;