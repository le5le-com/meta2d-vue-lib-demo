import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';

import store from './store';

import meta2d from 'meta2d-vue/meta2d-vue.es.js';

import 'meta2d-vue/style.css';

createApp(App).use(router).use(store).use(meta2d).mount('#app');
