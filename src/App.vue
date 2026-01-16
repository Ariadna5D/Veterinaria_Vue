<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import ThemeToggle from './components/common/ThemeToggle.vue';

import AnimalList from './components/AnimalList.vue';
import AnimalForm from './components/AnimalForm.vue';
import ContactForm from './components/ContactForm.vue';
import Adoption from './components/Adoption.vue';
import AnimalStats from './components/AnimalStats.vue';


// estos son los iconos
import { PawPrint, PlusCircle, Heart, ChartBar, Mail, Dog, Languages } from 'lucide-vue-next';

// esto es para usar el cambio de idioma
const { t, locale } = useI18n();

// para alternar el idioma
const toggleIdioma = () => {
    locale.value = locale.value === 'es' ? 'en' : 'es';
}
// referencia a los json
const animales = ref([]);
const estadisticas = ref([]);

// esperar a cargar toda la página
onMounted(async () => {
    try {
        const res = await fetch(`${import.meta.env.BASE_URL}pacientes.json`);
        if (res.ok) animales.value = await res.json();
    } catch (e) { console.error(e); }
    try {
        const res = await fetch(`${import.meta.env.BASE_URL}pacientesStats.json`);
        if (res.ok) estadisticas.value = await res.json();
    } catch (e) { console.error(e); }
});

</script>

<template>
    <div
        class="min-h-screen flex flex-col bg-surface-100 dark:bg-surface-950 text-color transition-colors duration-300">
        <Toast />
        <div class="container mx-auto p-4">
            <header class="flex justify-between items-center mb-6">
                <div class="flex items-center gap-4 text-primary">
                    <PawPrint :size="42" :stroke-width="2" class="logo-icon" aria-hidden="true" />
                    <h1 class="m-0 font-bold text-3xl">{{ t('titulo') }}</h1>
                </div>
                <div class="flex items-center gap-2">

                    <ThemeToggle />
                    <Button @click="toggleIdioma" class="">
                        <Languages :size="22" aria-hidden="true" :stroke-width="2" />
                        <span class="font-bold">{{ t('btn_idioma') }}</span>
                    </Button>
                </div>
            </header>

            <main class="border border-surface shadow-lg rounded-xl overflow-hidden">
                <Tabs value="0">
                    <TabList>
                        <Tab value="0">
                            <div class="flex items-center gap-2">
                                <Dog :size="20" aria-hidden="true" />
                                <h3 class="text-lg font-semibold">{{ t('tabs.pacientes') }}</h3>
                            </div>
                        </Tab>

                        <Tab value="1">
                            <div class="flex items-center gap-2">
                                <PlusCircle :size="18" aria-hidden="true" />
                                <h3 class="text-lg font-semibold">{{ t('tabs.nuevo') }}</h3>
                            </div>
                        </Tab>

                        <Tab value="2">
                            <div class="flex items-center gap-2">
                                <Heart :size="18" aria-hidden="true" />
                                <h3 class="text-lg font-semibold">{{ t('tabs.servicios') }}</h3>
                            </div>
                        </Tab>

                        <Tab value="3">
                            <div class="flex items-center gap-2">
                                <ChartBar :size="18" aria-hidden="true" />
                                <h3 class="text-lg font-semibold">{{ t('tabs.stats') }}</h3>
                            </div>
                        </Tab>

                        <Tab value="4">
                            <div class="flex items-center gap-2">
                                <Mail :size="18" aria-hidden="true" />
                                <h3 class="text-lg font-semibold">{{ t('tabs.contacto') }}</h3>
                            </div>
                        </Tab>
                    </TabList>

                    <TabPanels class="p-6">
                        <TabPanel value="0">
                            <h3 class="text-2xl font-bold mb-2">{{ t('tabs.pacientes') }}</h3>
                            <AnimalList :animales="animales" />
                        </TabPanel>

                        <TabPanel value="1">
                            <div class="flex flex-col gap-4">
                                <h3 class="text-2xl font-bold mb-2">{{ t('tabs.nuevo') }}</h3>
                                <AnimalForm @alta-animal="registrarAnimal" />
                            </div>
                        </TabPanel>

                        <TabPanel value="2">
                            <h3 class="text-2xl font-bold mb-2">{{ t('tabs.servicios') }}</h3>
                            <Adoption />
                        </TabPanel>

                        <TabPanel value="3">
                            <h3 class="text-2xl font-bold mb-2">{{ t('tabs.stats') }}</h3>
                            <AnimalStats :animales="estadisticas" />
                        </TabPanel>

                        <TabPanel value="4">
                            <h3 class="text-2xl font-bold mb-2">{{ t('tabs.contacto') }}</h3>
                            <ContactForm />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </main>
        </div>
    </div>
</template>