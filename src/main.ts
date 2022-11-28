import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.scss';

const app = createApp(App);
const pinia = createPinia();

// eslint-disable-next-line no-param-reassign
pinia.use(({ store }) => { store.router = markRaw(router); });

app.use(pinia);
app.use(router);

app.mount('#app');
