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
    <div class="grid-adopciones">
        <div v-for="animal in adopciones" :key="animal.id">
            <Card class="h-full animal-card">
                <template #header>
                    <img :src="animal.imagen" :alt="animal.nombre" class="animal-img" />
                </template>

                <template #title>
                    {{ animal.nombre }}
                </template>

                <template #subtitle>
                    {{ animal.edad }}
                </template>

                <template #content>
                    <p>Personalidad:</p>
                    <div class="flex-wrap">
                        <Badge v-for="rasgo in animal.personalidad" :key="rasgo" :value="rasgo" class="mr-2 mb-2"
                            severity="info" />
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>

<style scoped>
.grid-adopciones {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
}

.animal-img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 0.2rem 0.2rem 0 0;
}

.animal-card {
    transition: transform 0.2s;
    border: 1px solid white;
}

.flex-wrap {
    display: flex;
    flex-wrap: wrap;
}

.mr-2 {
    margin-right: 0.5rem;
}

.mb-2 {
    margin-bottom: 0.5rem;
}
</style>