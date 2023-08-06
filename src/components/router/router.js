import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import AdminLayout from '../../components/layout/Admin.vue'
import CommonLayout from '../../components/layout/Common.vue'
import Home from '../../Views/Home.vue'
import LogIn from '../../Views/LogIn.vue'
import EmployeeList from '../../Views/EmployeeList.vue'
import AddEmployee from '../../Views/AddEmployee.vue'
import EmployeeTable from '../../Views/EmployeeTable.vue'
import Table from '../../Views/Table.vue'
import AddTable from '../../Views/AddTable.vue'
import AddFood from '../../Views/AddFood.vue'
import AuthRequired from '../../utils/AuthRequired'
 
const routes = [
   {
    path: '/',
    name: 'commonLayout',
    beforeEnter: AuthRequired,
    component: CommonLayout,
    redirect: '/admin/employee-list',
   },
   {
    path: '/admin',
    name: 'admin',
    beforeEnter: AuthRequired,
    component: AdminLayout,
    redirect: '/admin/employee-list',
    children: [
        {
            path: 'employee-list',
            name: 'employeeList',
            component: EmployeeList
        },
        {
            path: 'add-employee',
            name: 'addEmployee',
            component: AddEmployee
        },
        {
            path: 'employee-table',
            name: 'employeeTable',
            component: EmployeeTable
        },
        {
            path: 'table',
            name: 'table',
            component: Table
        },
        {
            path: 'add-table',
            name: 'addTable',
            component: AddTable
        },
        {
            path: 'add-food',
            name: 'addFood',
            component: AddFood
        },
    ]
   },
   {
    path: '/login',
    name: 'login',
    component: LogIn
   },
]
const router = createRouter ({
    history: createWebHistory(),
    routes
});

export default router;
