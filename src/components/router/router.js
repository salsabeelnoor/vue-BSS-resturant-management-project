import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import AdminLayout from '../../components/layout/Admin.vue'
import CommonLayout from '../../components/layout/Common.vue'
import LogIn from '../../Views/LogIn.vue'
import EmployeeList from '../../Views/EmployeeList.vue'
import AddEmployee from '../../Views/AddEmployee.vue'
import EmployeeTable from '../../Views/EmployeeTable.vue'
import AuthRequired from '../../utils/AuthRequired'
 
const routes = [
   {
    path: '/',
    name: 'commonLayout',
    beforeEnter: AuthRequired,
    component: CommonLayout
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
        }
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
