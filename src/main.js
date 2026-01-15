import { createApp } from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import i18n from './i18n'; 

import './assets/main.css';
import ToastService from 'primevue/toastservice';
const app = createApp(App);

app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark',
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue'
            }
        }
    }
});

app.use(i18n);

app.mount('#app');