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
        const res = await fetch(`${import.meta.env.BASE_URL}animales.json`);
        if (res.ok) animales.value = await res.json();
    } catch (e) { console.error(e); }
});

const registrarAnimal = (nuevo) => {
    animales.value.unshift(nuevo);
};
</script>

<template>
    <div class="min-h-screen flex flex-col bg-surface-100 dark:bg-surface-950 text-color transition-colors duration-300">
        <div class="container mx-auto p-4">
            <header class="flex justify-between items-center mb-6">
                <div class="flex items-center gap-4 text-primary">
                    <PawPrint :size="42" :stroke-width="2" class="logo-icon" aria-hidden="true"/>
                    <h1 class="m-0 font-bold text-3xl">{{ t('titulo') }}</h1>
                </div>
                <Button @click="toggleIdioma" class="flex items-center gap-2">
                    <Globe :size="20" aria-hidden="true"/>
                    <span>{{ t('btn_idioma') }}</span>
                </Button>
            </header>

            <main class="border border-surface shadow-lg rounded-xl overflow-hidden">
                <Tabs value="0">
                    <TabList>
                        <Tab value="0">
                            <div class="flex items-center gap-2">
                                <Dog :size="20" aria-hidden="true"/>
                                <h3 class="text-lg font-semibold">{{ t('tabs.pacientes') }}</h3>
                            </div>
                        </Tab>
                        
                        <Tab value="1">
                            <div class="flex items-center gap-2">
                                <PlusCircle :size="18" aria-hidden="true"/>
                                <h3 class="text-lg font-semibold">{{ t('tabs.nuevo') }}</h3>
                            </div>
                        </Tab>
                        
                        <Tab value="2">
                            <div class="flex items-center gap-2">
                                <Heart :size="18" aria-hidden="true"/>
                                <h3 class="text-lg font-semibold">{{ t('tabs.servicios') }}</h3>
                            </div>
                        </Tab>
                        
                        <Tab value="3">
                            <div class="flex items-center gap-2">
                                <ChartBar :size="18" aria-hidden="true"/>
                                <h3 class="text-lg font-semibold">{{ t('tabs.stats') }}</h3>
                            </div>
                        </Tab>

                        <Tab value="4">
                            <div class="flex items-center gap-2">
                                <Mail :size="18" aria-hidden="true"/>
                                <h3 class="text-lg font-semibold">{{ t('tabs.contacto') }}</h3>
                            </div>
                        </Tab>
                    </TabList>

                    <TabPanels class="p-6">
                        <TabPanel value="0">
                            <h3 class="text-2xl font-bold">{{ t('tabs.pacientes') }}</h3>
                            <AnimalList :animales="animales" />
                        </TabPanel>

                        <TabPanel value="1">
                            <div class="flex flex-col gap-4">
                                <h3 class="text-2xl font-bold">{{ t('tabs.nuevo') }}</h3>
                                <AnimalForm @alta-animal="registrarAnimal" />
                            </div>
                        </TabPanel>

                        <TabPanel value="2">
                            <h3 class="text-2xl font-bold">{{ t('tabs.servicios') }}</h3>
                            <Adoption />
                        </TabPanel>

                        <TabPanel value="3">
                            <h3 class="text-2xl font-bold">{{ t('tabs.stats') }}</h3>
                            <AnimalStats :animales="animales" />
                        </TabPanel>

                        <TabPanel value="4">
                            <h3 class="text-2xl font-bold">{{ t('tabs.contacto') }}</h3>
                            <ContactForm />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </main>
        </div>
    </div>
</template>