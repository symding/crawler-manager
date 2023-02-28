import Vue from 'vue'
import VueRouter from 'vue-router'
// 单字母的文件夹无法引入
// import Home from '../test-view/container.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: () => import('../views/helloWorld.vue')
    },
    {
        path: '/cron-task',
        name: 'cron-task',
        component: () => import('../views/cronTask.vue')
    },
    {
        path: '/spider-info',
        name: 'spider-info',
        component: () => import('../views/spider/spiderInfo.vue')
    },
    {
        path: '/spider-detail',
        name: 'spider-detail',
        component: () => import('../views/spider/spiderDetail.vue')
    },
    {
        path: '/docker-clients',
        name: 'docker-client',
        component: () => import('../views/docker/dockerClient.vue')
    },
    {
        path: '/es-to-csv',
        name: 'es-to-csv',
        component: () => import('../views/lab/esCsv.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router