import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import { BASE_URL } from '@/config';

import App from './App.vue';
import routes from './routes';

import './assets/styles/main.scss';

const router = createRouter({
  base: BASE_URL,
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
