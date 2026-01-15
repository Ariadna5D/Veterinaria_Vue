<script setup>
import Card from 'primevue/card';
import Badge from 'primevue/badge';

defineProps({
    // animal a mostrar (de json)
    animal: Object
});
</script>

<template>
    <Card class="h-full overflow-hidden shadow-md focus:outline-2 hover:outline-3 outline-primary">
        <template #header>
            <img :src="animal.imagen" :alt="'Foto de ' + animal.nombre" class="w-full h-64 object-cover" />
        </template>
        <template #title>
            <span class="font-bold text-xl text-primary hover:text-primary-200">{{ animal.nombre }}</span>
        </template>
        <template #subtitle>
            <span class="text-surface-600 font-medium">{{ animal.edad }}</span>
        </template>
        <template #content>
            <p class="mb-3 text-sm font-semibold uppercase tracking-wider text-surface-500">Personalidad:</p>
            <div class="flex flex-wrap gap-2">
                <Badge v-for="rasgo in animal.personalidad" :key="rasgo" :value="rasgo" severity="info" />
            </div>
        </template>
    </Card>
</template>