import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // 引入路由

// createApp(App).mount('#app')
const app = createApp(App);
app.use(router); // 使用路由
app.mount('#app');