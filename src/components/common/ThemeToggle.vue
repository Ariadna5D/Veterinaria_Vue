<script setup>
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import { Sun, Moon } from 'lucide-vue-next';

const esOscuro = ref(false);

const toggleDarkMode = () => {
    const element = document.querySelector('html');
    element.classList.toggle('my-app-dark'); 
    
    const isDark = element.classList.contains('my-app-dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        esOscuro.value = true;
        document.querySelector('html').classList.add('my-app-dark');
    }
});
</script>

<template>
    <Button @click="toggleDarkMode" severity="secondary" variant="text" rounded>
        <Sun v-if="esOscuro" :size="20" />
        <Moon v-else :size="20" />
    </Button>
</template>