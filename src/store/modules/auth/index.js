import mutations from './mutations'
import actions from './actions'
import getters   from './getters'
const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export default {
    state() {
        return {
            token: token,
            user: user
        }
    },
    mutations,
    actions, 
    getters
}