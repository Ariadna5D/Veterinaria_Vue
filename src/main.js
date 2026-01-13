import { createApp } from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import i18n from './i18n'; 

import './assets/main.css';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: { darkModeSelector: '.dark-mode' }
    }
});

app.use(i18n);

app.mount('#app');