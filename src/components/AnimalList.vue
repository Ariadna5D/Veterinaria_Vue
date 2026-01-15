<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { FilterMatchMode } from "@primevue/core/api";
import { useI18n } from "vue-i18n";

// Importamos el componente reutilizable
import CustomLabel from "./common/CustomLabel.vue";

// Importamos los iconos
import {
    Search, FilterX, PawPrint, Dog, User,
    Phone, ClipboardList, Tag, Cat, Turtle, Bird
} from "lucide-vue-next";

const { t } = useI18n();
const props = defineProps(["animales"]);
const expandedRows = ref({});

const especiesConfig = {
    'Perro': { icon: Dog, color: '#f59e0b', label: 'especies.perro' },
    'Gato': { icon: Cat, color: '#10b981', label: 'especies.gato' },
    'Reptil': { icon: Turtle, color: '#6366f1', label: 'especies.reptil' },
    'Ave': { icon: Bird, color: '#ec4899', label: 'especies.ave' },
    'Otro': { icon: PawPrint, color: '#94a3b8', label: 'especies.otro' }
};

const filtros = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const sortField = ref(null);
const sortOrder = ref(null);

const limpiarFiltros = () => {
    filtros.value.global.value = null;
    sortField.value = null;
    sortOrder.value = null;
};
</script>

<template>
    <div>
        <div class="flex flex-wrap justify-end items-center gap-2 mb-4">
            <IconField>
                <InputIcon>
                    <Search :size="16" class="text-surface-400" />
                </InputIcon>
                <InputText v-model="filtros['global'].value" :placeholder="t('pacientes.buscar')" />
            </IconField>

            <Button type="button" severity="secondary" outlined @click="limpiarFiltros"
                :disabled="!filtros.global.value && !sortField"
                :class="{ '!bg-red-500 !text-white !border-red-500': filtros.global.value || sortField }"
                class="flex items-center gap-2">
                <FilterX :size="16" />
            </Button>
        </div>

        <DataTable :value="props.animales" v-model:expandedRows="expandedRows" dataKey="id" :filters="filtros"
            v-model:sortField="sortField" v-model:sortOrder="sortOrder" paginator :rows="10" stripedRows
            class="border border-surface rounded-lg overflow-hidden">
            <Column expander style="width: 3rem" />

            <Column field="nombre" sortable>
                <template #header>
                    <div class="flex items-center gap-2">
                        <PawPrint :size="22" class="text-primary" />
                        <span class="text-lg font-semibold">{{ t('pacientes.campos.nombre') }}</span>
                    </div>
                </template>
            </Column>

            <Column field="especie" sortable>
                <template #header>
                    <div class="flex items-center gap-2">
                        <Dog :size="22" class="text-primary" />
                        <span class="text-lg font-semibold">{{ t('pacientes.campos.especie') }}</span>
                    </div>
                </template>
                <template #body="slotProps">
                    <CustomLabel v-if="especiesConfig[slotProps.data.especie]"
                        :icon="especiesConfig[slotProps.data.especie].icon"
                        :label="t(especiesConfig[slotProps.data.especie].label)"
                        :color="especiesConfig[slotProps.data.especie].color" />
                    <span v-else class="text-sm italic text-muted-color">
                        {{ slotProps.data.especie }}
                    </span>
                </template>
            </Column>

            <Column field="dueno">
                <template #header>
                    <div class="flex items-center gap-2">
                        <User :size="22" class="text-primary" />
                        <span class="text-lg font-semibold">{{ t('pacientes.campos.dueno') }}</span>
                    </div>
                </template>
            </Column>

            <Column field="telefono">
                <template #header>
                    <div class="flex items-center gap-2">
                        <Phone :size="22" class="text-primary" />
                        <span class="text-lg font-semibold">{{ t('pacientes.campos.telefono') }}</span>
                    </div>
                </template>
            </Column>

            <template #expansion="slotProps">
                <div class="p-4 rounded-lg ml-12 bg-emphasis/5 border border-surface">
                    <h4 class="font-bold text-lg mb-4 flex items-center gap-2 text-primary">
                        <ClipboardList :size="20" />
                        {{ t("pacientes.ficha.titulo") }} {{ slotProps.data.nombre }}
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex flex-col gap-1">
                            <span class="text-xs font-bold uppercase text-muted-color tracking-wider">
                                {{ t("pacientes.ficha.notas") }}
                            </span>
                            <p class="text-surface-700 dark:text-surface-300">
                                {{ slotProps.data.notas || "Sin notas registradas" }}
                            </p>
                        </div>
                        <div class="flex flex-col gap-1">
                            <span
                                class="text-xs font-bold uppercase text-muted-color tracking-wider flex items-center gap-1">
                                <Tag :size="12" /> Registro ID
                            </span>
                            <code class="text-sm bg-surface-200 dark:bg-surface-800 px-2 py-1 rounded w-fit">
                                #{{ slotProps.data.id }}
                            </code>
                        </div>
                    </div>
                </div>
            </template>
        </DataTable>
    </div>
</template>