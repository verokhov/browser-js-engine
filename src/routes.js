import HomeView from '@/views/home.vue';
import ExampleView from '@/views/example.vue';

export default [
  { path: '/', component: HomeView },
  { path: '/example-:number', component: ExampleView, props: true },
];
