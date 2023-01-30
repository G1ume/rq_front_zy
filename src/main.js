import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import axios from 'axios'
import store from './store/index'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store)
// eslint-disable-next-line no-unused-vars
const LocalHost = 'http://localhost:8000'
// eslint-disable-next-line no-unused-vars
const self_Internet = 'http://192.168.3.62:8000'
axios.defaults.baseURL = self_Internet
app.config.globalProperties.$axios = axios

/*router.beforeEach((to, from, next) => {
    store.commit('getAccessToken')
    const token = store.state.access_token
    if (!token && to.name !== 'Login') {
        next({ name: 'Login' })
    } else if (token && to.name === 'Login') {
        next({ name: 'Main' })
    } else (
        next()
    )
})*/

app.mount('#app')
