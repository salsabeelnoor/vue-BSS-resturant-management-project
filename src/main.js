import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'

import store from './store/index'
import router from './components/router/router'
const vuetify = createVuetify({
    components: { ...components, VDataTable },
    directives,
  })

createApp(App)
.use(vuetify)
.use(router)
.use(store)
.mount('#app')
