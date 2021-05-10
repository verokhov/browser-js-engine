import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import { BASE_URL } from '@/config';

import App from './App.vue';
import routes from './routes';

import './assets/styles/main.scss';

const router = createRouter({
  history: createWebHashHistory(BASE_URL),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
