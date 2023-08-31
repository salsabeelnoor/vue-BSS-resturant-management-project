import {createStore} from 'vuex'

import authModule from './modules/auth/index'
import spinnerModule from './modules/spinner';

const store = createStore ({
    modules: {
        auth: authModule,
    },
    state() {
        return {
            toggleDashboard: false,
        }
    },
    mutations: {
        TOGGLE_DASHBOARD(state){
            state.toggleDashboard = !state.toggleDashboard
        }
    },
    actions: {
        toggleDashboard({commit}){
            commit('TOGGLE_DASHBOARD')
        }
    },
    getters: {
        isDashboardToggled(state){
            return state.toggleDashboard
        }
    }

})
export default store;