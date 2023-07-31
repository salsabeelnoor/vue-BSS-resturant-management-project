import {createStore} from 'vuex'

import authModule from './modules/auth/index'
import spinnerModule from './modules/spinner';

const store = createStore ({
    modules: {
        auth: authModule,
        spinner: spinnerModule
    },

})
export default store;