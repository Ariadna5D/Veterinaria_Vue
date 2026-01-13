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
    <div class="card p-4 stats-container">
        <h3 class="text-center">{{ t('stats.titulo') }}</h3>

        <div class="controls">
            <SelectButton v-model="tipoGrafico" :options="opciones" :aria-label="t('stats.grafico')" />
        </div>

        <div class="legend">
            <div v-for="(item, key) in config" :key="key" class="legend-item" :style="{ borderColor: item.color }">
                <component :is="item.icon" :size="18" :color="item.color" />
                <span :style="{ color: item.color }">{{ t(item.label) }}</span>
            </div>
        </div>

        <div class="chart-wrapper">
            <Chart 
                :key="tipoGrafico"
                :type="tipoGrafico" 
                :data="chartData" 
                :options="chartOptions" 
            />
        </div>
    </div>
</template>

<style scoped>
.stats-container {
    background: white;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem; 
}

.text-center { text-align: center; margin: 0; }

.controls {
    display: flex;
    justify-content: center;
}

.legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    border: 1px solid #ddd;
    background: #f8fafc;
    font-weight: 600;
    font-size: 0.9rem;
}

.chart-wrapper {
    height: 400px; 
    width: 100%;
    position: relative;
    flex-shrink: 0; 
}

.chart-wrapper :deep(canvas) {
    width: 100% !important;
    height: 100% !important;
    
    max-height: 400px;
    object-fit: contain;
}
</style>