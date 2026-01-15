<script setup>
import { ref, computed } from 'vue';
import Chart from 'primevue/chart';
import SelectButton from 'primevue/selectbutton';
import { useI18n } from "vue-i18n";

// Importamos el nuevo componente
import CustomLabel from './common/CustomLabel.vue';

// son los logos importados
import { Dog, Cat, Turtle, Bird, PawPrint, Rabbit } from 'lucide-vue-next';

// esto es para traducir
const { t } = useI18n();

//estos son los animales que entran en el grafico
const props = defineProps(['animales']);

// este es el tipo default
const tipoGrafico = ref('bar');
// los diferentes tipos de gráfico
const opciones = ref(['bar', 'pie', 'doughnut']);

// esta es la configuracion de las etiquetas de colores
const config = {
    perros: { match: 'Perro', icon: Dog, color: '#f59e0b', label: 'especies.perro' },
    gatos: { match: 'Gato', icon: Cat, color: '#10b981', label: 'especies.gato' },
    reptiles: { match: 'Reptil', icon: Turtle, color: '#6366f1', label: 'especies.reptil' },
    aves: { match: 'Ave', icon: Bird, color: '#ec4899', label: 'especies.ave' },
    roedores: { match: 'Roedor', icon: Rabbit, color: '#48c0ec', label: 'especies.roedor' },
    otros: { match: 'Otro', icon: PawPrint, color: '#94a3b8', label: 'especies.otro' }
};

// computed para que se actualice la grafica con los campos en el idioma correspondiente
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

// estas son las opciones de la gráfica, para manejarse tambien en el modo oscuro correctamente
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