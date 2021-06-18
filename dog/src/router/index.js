import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Breed from "../views/breed.vue"
import Breeds from "../views/breeds.vue"
import SignUp from "../views/signup.vue"
import Login from "../views/login.vue"
import Admin from "../views/admin.vue"

import store from "../store"

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: "/breeds",
        component: Breeds
    },
    {
        path: "/breeds/:id",
        component: Breed
    },
    {
        path: "/signup",
        component: SignUp
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/admin",
        component: Admin,
        beforeEnter: (to, from, next) => {
            if (!store.state.user) {
                next("/login")
            } else {
                next()
            }
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/About.vue')
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router