<script setup>
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import Badge from 'primevue/badge';

const adopciones = ref([]);

// Esta es la funcion AJAX que nos permitirá llevar la sincronizacion
const cargarAdopciones = async () => {
    try {
        const respuesta = await fetch(`${import.meta.env.BASE_URL}adopciones.json`);

        const datos = await respuesta.json();

        adopciones.value = datos.map(animal => {
            return {
                ...animal,
                imagen: `${import.meta.env.BASE_URL}${animal.imagen.slice(1)}`
            }
        });

    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
};

// se usa onmounted para que no se pise con la carga de la página
onMounted(() => {
    cargarAdopciones();
});
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        <div v-for="animal in adopciones" :key="animal.id" class="h-full">
            <Card class="h-full overflow-hidden shadow-md focus:outline-2 hover:outline-3 outline-primary  ">
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
                        <Badge 
                            v-for="rasgo in animal.personalidad" 
                            :key="rasgo" 
                            :value="rasgo" 
                            severity="info" 
                        />
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>