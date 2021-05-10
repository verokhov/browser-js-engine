import { ROUTES } from '@/config';

import HomeView from '@/views/home.vue';
import ExampleView from '@/views/example.vue';

export default [
  {
    path: '/',
    name: ROUTES.home,
    component: HomeView,
  },
  {
    path: '/example-:number',
    name: ROUTES.example,
    component: ExampleView,
    props: true,
  },
];
