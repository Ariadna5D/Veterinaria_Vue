<script setup>
import { ref, computed } from 'vue';
import Chart from 'primevue/chart';
import SelectButton from 'primevue/selectbutton';
import { useI18n } from "vue-i18n";

import { Dog, Cat, Turtle, Bird, PawPrint } from 'lucide-vue-next';

const { t } = useI18n();
const props = defineProps(['animales']);

const tipoGrafico = ref('bar');
const opciones = ref(['bar', 'pie', 'doughnut']);

const config = {
    perros:   { match: 'Perro',  icon: Dog,      color: '#f59e0b', label: 'especies.perro' },
    gatos:    { match: 'Gato',   icon: Cat,      color: '#10b981', label: 'especies.gato' },
    reptiles: { match: 'Reptil', icon: Turtle,   color: '#6366f1', label: 'especies.reptil' },
    aves:     { match: 'Ave',    icon: Bird,     color: '#ec4899', label: 'especies.ave' },
    otros:    { match: 'Otro',   icon: PawPrint, color: '#94a3b8', label: 'especies.otro' }
};

const chartData = computed(() => {
    // Generamos los datos dinámicamente basados en la config
    const values = Object.values(config);
    
    const counts = values.map(c => 
        props.animales.filter(a => a.especie === c.match).length
    );

    return {
        labels: values.map(c => t(c.label)),
        datasets: [{
            label: t('stats.titulo'),
            data: counts,
            backgroundColor: values.map(c => c.color),
            borderWidth: 1
        }]
    };
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false }
    }
});
</script>

<template>
    <div class="flex flex-col gap-6 w-full">
        <h3 class="text-2xl font-bold text-center">{{ t('stats.titulo') }}</h3>

        <div class="flex justify-center">
            <SelectButton v-model="tipoGrafico" :options="opciones" :aria-label="t('stats.grafico')" />
        </div>

        <div class="flex flex-wrap justify-center gap-3">
            <div v-for="(item, key) in config" :key="key" 
                class="flex items-center gap-2 px-4 py-1.5 border rounded-full font-semibold text-sm"
                :style="{ borderColor: item.color, color: item.color }">
                <component :is="item.icon" :size="18" />
                <span>{{ t(item.label) }}</span>
            </div>
        </div>

        <div class="h-100 w-full relative">
            <Chart 
                :key="tipoGrafico"
                :type="tipoGrafico" 
                :data="chartData" 
                :options="chartOptions" 
                class="h-full w-full"
            />
        </div>
    </div>
</template>