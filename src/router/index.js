import Main from "@/components/Main";
import Login from "@/components/Login";
import Register from "@/components/Register";

import {createRouter, createWebHistory} from 'vue-router'

const routerHistory = createWebHistory()
const routes = [
    {
        path:'/',
        name:'Main',
        component: Main,
        meta:{
            keepalive: true
        }
    },
    {
        path:'/Login',
        name:'Login',
        component: Login,
        meta: {
            keepalive: false
        }
    },
    {
        path:'/Register',
        name:'Register',
        component: Register,
        meta: {
            keepalive: false
        }
    }
]

const router = createRouter({
    history: routerHistory,
    routes
})

export default router