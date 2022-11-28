import { createRouter, createWebHistory } from 'vue-router';
import useAppStore from '../stores/appStore';
import SetupPage from '../pages/setup.vue';
import IndexPage from '../pages/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexPage,
      beforeEnter: () => {
        const appStore = useAppStore();

        if (!appStore.text) return '/setup';

        return true;
      },
    },
    {
      path: '/setup',
      name: 'setup',
      component: SetupPage,
    },
  ],
});

export default router;
