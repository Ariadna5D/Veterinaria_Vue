<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';

import AnimalList from './components/AnimalList.vue';
import AnimalForm from './components/AnimalForm.vue';
import ContactForm from './components/ContactForm.vue';
import Adoption from './components/Adoption.vue';
import AnimalStats from './components/AnimalStats.vue';

// estos son los iconos
import { PawPrint, PlusCircle, Heart, ChartBar, Mail, Dog, Globe } from 'lucide-vue-next';

// esto es para usar el cambio de idioma
const { t, locale } = useI18n();

const toggleIdioma = () => {
    locale.value = locale.value === 'es' ? 'en' : 'es';
}

const animales = ref([]);

onMounted(async () => {
    try {
        const res = await fetch('/animales.json');
        if (res.ok) animales.value = await res.json();
    } catch (e) { console.error(e); }
});

const registrarAnimal = (nuevo) => {
    animales.value.unshift(nuevo);
};
</script>

<template>
    <main class="container">
        <header class="header-flex mb-4">
            <div class="title">
                <PawPrint :size="42" :stroke-width="2" class="logo-icon" />
                <h1>{{ t('titulo') }}</h1>
            </div>
            <Button @click="toggleIdioma" class="btn-idioma">
                <Globe :size="20" />
                <span>{{ t('btn_idioma') }}</span>
            </Button>
        </header>

        <!-- Esta es la ventana principal de la web -->
        <div class="card">
            <Tabs value="0">
                <!-- Dependiendo del tab seleccionado, carga una vista u otra sin recargar -->
                <TabList>
                    <Tab value="0">
                        <div class="tab-content">
                            <Dog :size="20" />
                            <span>{{ t('tabs.pacientes') }}</span>
                        </div>
                    </Tab>
                    
                    <Tab value="1">
                        <div class="tab-content">
                            <PlusCircle :size="18" />
                            <span>{{ t('tabs.nuevo') }}</span>
                        </div>
                    </Tab>
                    
                    <Tab value="2">
                        <div class="tab-content">
                            <Heart :size="18" />
                            <span>{{ t('tabs.servicios') }}</span>
                        </div>
                    </Tab>
                    
                    <Tab value="3">
                        <div class="tab-content">
                            <ChartBar :size="18" />
                            <span>{{ t('tabs.stats') }}</span>
                        </div>
                    </Tab>

                    <Tab value="4">
                        <div class="tab-content">
                            <Mail :size="18" />
                            <span>{{ t('tabs.contacto') }}</span>
                        </div>
                    </Tab>
                </TabList>

                <TabPanels>
                    <!-- Aquí están los casos, es decir, todos los tabs disponibles -->
                    <TabPanel value="0">
                        <AnimalList :animales="animales" />
                    </TabPanel>

                    <TabPanel value="1">
                        <div>
                            <div>
                                <h3>{{ t('ingreso.titulo') }}</h3>
                                <AnimalForm @alta-animal="registrarAnimal" />
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel value="2">
                        <Adoption />
                    </TabPanel>

                    <TabPanel value="3">
                        <AnimalStats :animales="animales" />
                    </TabPanel>

                    <TabPanel value="4">
                        <ContactForm />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </main>
</template>

<style>
.header-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    color: var(--p-primary-color);
}

.title h1 {
    margin: 0;
    font-weight: bold;
}
.tab-content {
    display: flex;
    align-items: center;
    gap: 0.2rem;
}
</style>