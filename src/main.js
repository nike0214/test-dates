import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

library.add(faWallet)

const app = createApp(App)

app.use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

app.config.globalProperties.axios = axios
