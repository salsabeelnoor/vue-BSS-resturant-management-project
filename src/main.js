import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

import store from './store/index'
import router from './components/router/router'
const vuetify = createVuetify({
    components: { ...components, VDataTable, VDataTableServer },
    directives,
  })

createApp(App)
    .component('VueDatePicker', VueDatePicker)
    .use(vuetify)
    .use(router)
    
    .use(store)
    .use(Toast, {
      transition: "Vue-Toastification__bounce",
      maxToasts: 20,
      newestOnTop: true
    })
.mount('#app')
