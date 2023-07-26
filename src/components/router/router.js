import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import DashBordView from '../../Views/DashBordView.vue'
import HomeView from '../../Views/HomeView.vue'
import LogInView from '../../Views/LogInView.vue'
 
const routes = [
   {
    path: '/',
    name: 'home',
    component: HomeView
   },
   {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBordView
   },
   {
    path: '/login',
    name: 'login',
    component: LogInView
   },
]
const router = createRouter ({
    history: createWebHistory(),
    routes
});

export default router;
