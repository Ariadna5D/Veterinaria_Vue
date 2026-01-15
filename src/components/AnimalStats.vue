<script setup>
import { ref, computed } from 'vue';
import Chart from 'primevue/chart';
import SelectButton from 'primevue/selectbutton';
import { useI18n } from "vue-i18n";

// Importamos el nuevo componente
import CustomLabel from './common/CustomLabel.vue';

import { Dog, Cat, Turtle, Bird, PawPrint } from 'lucide-vue-next';

const { t } = useI18n();
const props = defineProps(['animales']);

const tipoGrafico = ref('bar');
const opciones = ref(['bar', 'pie', 'doughnut']);

const config = {
    perros: { match: 'Perro', icon: Dog, color: '#f59e0b', label: 'especies.perro' },
    gatos: { match: 'Gato', icon: Cat, color: '#10b981', label: 'especies.gato' },
    reptiles: { match: 'Reptil', icon: Turtle, color: '#6366f1', label: 'especies.reptil' },
    aves: { match: 'Ave', icon: Bird, color: '#ec4899', label: 'especies.ave' },
    otros: { match: 'Otro', icon: PawPrint, color: '#94a3b8', label: 'especies.otro' }
};

const chartData = computed(() => {
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

const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false }
    },
    scales: {
        y: {
            ticks: {
                color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b'
            },
            grid: {
                color: document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
            }
        },
        x: {
            ticks: {
                color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b'
            }
        }
    }
}));
</script>

<template>
    <div class="flex flex-col gap-6 w-full">
        <h3 class="text-2xl font-bold text-center">{{ t('stats.titulo') }}</h3>

        <div class="flex justify-center">
            <SelectButton v-model="tipoGrafico" :options="opciones" :aria-label="t('stats.grafico')" />
        </div>

        <div class="flex flex-wrap justify-center gap-3">
            <CustomLabel v-for="(item, key) in config" :key="key" :icon="item.icon" :label="t(item.label)"
                :color="item.color" />
        </div>

        <div class="h-100 w-full relative">
            <Chart :key="tipoGrafico" :type="tipoGrafico" :data="chartData" :options="chartOptions"
                class="h-full w-full !text-base !uppercase" />
        </div>
    </div>
</template>