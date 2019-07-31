import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Materials from './views/Materials.vue'
import Products from './views/Products.vue'
import Product from './views/Product.vue'
import Specs from './views/Specs.vue'
import Spec from './views/Spec.vue'
import Test from './views/Test.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/materials',
            name: 'Materials',
            component: Materials
        },
        {
            path: '/products',
            name: 'Products',
            component: Products
        },
        {
            path: '/products/:product_id',
            name: 'Product',
            component: Product
        },
        {
            path: '/specs',
            name: 'Specs',
            component: Specs
        },
        {
            path: '/specs/:spec_id',
            name: 'Spec',
            component: Spec
        },
        {
            path: '/test',
            name: 'Test',
            component: Test
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
