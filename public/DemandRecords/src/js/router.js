import VueRouter from 'vue-router';
// import projectSideMiddleContent from '../router/subComponent/menuNode.vue';
// import taskInfo from '../router/taskDetail/taskInfo.vue';
// import sonTask from '../router/taskDetail/sonTask.vue';
// import workTime from '../router/taskDetail/workTime.vue';
// import file from '../router/taskDetail/file.vue';
// import connectTask from '../router/taskDetail/connectTask.vue';

var vueRouter = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/project'
        },
        {
            path: '/project/projectSideMiddleContent',
            // component: projectSideMiddleContent,
            component: () => import('../router/subComponent/menuNode.vue'),
            name: 'projectSideMiddleContent'
        },
        {
            name: 'taskInfo',
            path: '/taskDetail/taskInfo',
            component: {
                // taskDetail: taskInfo
                taskDetail: () => import('../router/taskDetail/taskInfo.vue')
            }
        },
        {
            name: 'sonTask',
            path: '/taskDetail/sonTask',
            component: {
                // taskDetail: sonTask
                taskDetail: () => import('../router/taskDetail/sonTask.vue')
            }
        },
        {
            name: 'workTime',
            path: '/taskDetail/workTime',
            component: {
                // taskDetail: workTime
                taskDetail: () => import('../router/taskDetail/workTime.vue')
            }
        },
        {
            name: 'file',
            path: '/taskDetail/file',
            component: {
                // taskDetail: file
                taskDetail: () => import('../router/taskDetail/file.vue')
            }
        },
        {
            name: 'connectTask',
            path: 'taskDetail/connectTask',
            component: {
                // taskDetail: connectTask
                taskDetail: ()=> import('../router/taskDetail/connectTask.vue')
            }
        }

    ]
});
export default vueRouter;