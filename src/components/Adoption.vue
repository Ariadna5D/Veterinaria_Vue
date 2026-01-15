<script setup>
import { ref, onMounted } from 'vue';
import AnimalCard from './common/ImageCard.vue'; // Importamos el nuevo componente reutilizable
import ImageCard from './common/ImageCard.vue';

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
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <!-- For para recorrer todos los animales en adopcion-->
        <div v-for="animal in adopciones" :key="animal.id" class="h-full">
            <!-- Componente de tarjeta para ver los animalitos -->
            <ImageCard :animal="animal" />
        </div>
    </div>
</template>