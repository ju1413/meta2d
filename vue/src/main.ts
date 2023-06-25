/*
 * @Description: 
 * @Author: G
 * @Date: 2021-10-12 17:01:42
 * @LastEditTime: 2023-06-13 11:12:21
 */
import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue';

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')