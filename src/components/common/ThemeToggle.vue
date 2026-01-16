<script setup>
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import { Sun, Moon } from 'lucide-vue-next';

const esOscuro = ref(false);

const toggleDarkMode = () => {
    const element = document.querySelector('html');
    // esta es la clase que se activará y desactivará
    element.classList.toggle('dark');

    const isDark = element.classList.contains('dark');
    esOscuro.value = isDark;
    // este es el flipflop de los iconos
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

onMounted(() => {
    // esperamos a que la pagina esté cargada
    // guardamos el tema en el local storage para cuando se revisite la pagina
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        esOscuro.value = true;
        document.querySelector('html').classList.add('dark');
    }
});
</script>

<template>
    <Button @click="toggleDarkMode" :severity="esOscuro ? 'info' : 'warn'" variant="text" rounded
        class="dark:hover:!bg-blue-400/20 !bg-transparent hover:!bg-yellow-400/20">
        <Moon v-if="esOscuro" :size="26" stroke-width="3" />
        <Sun v-else :size="26" stroke-width="3" />
    </Button>
</template>