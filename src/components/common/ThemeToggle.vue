<script setup>
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import { Sun, Moon } from 'lucide-vue-next';

const esOscuro = ref(false);

const toggleDarkMode = () => {
    const element = document.querySelector('html');
    element.classList.toggle('dark');

    const isDark = element.classList.contains('dark');
    esOscuro.value = isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        esOscuro.value = true;
        document.querySelector('html').classList.add('dark');
    }
});
</script>

<template>
    <Button @click="toggleDarkMode" :severity="esOscuro ? 'warn' : 'info'" variant="text" rounded
        class="hover:!bg-blue-400/20 !bg-transparent dark:hover:!bg-yellow-400/20">
        <Sun v-if="esOscuro" :size="24" />
        <Moon v-else :size="24" />
    </Button>
</template>