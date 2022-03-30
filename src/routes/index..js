import VueRouter from 'vue-router';
import IndexComponent from '@/components/IndexComponent';

const routes = [
  {
    name: "home",
    path: "/",
    component: IndexComponent
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
