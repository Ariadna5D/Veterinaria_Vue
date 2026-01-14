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

// Importamos los iconos necesarios
import { 
    Search, FilterX, PawPrint, Dog, User, 
    Phone, ClipboardList, Tag, ChevronDown 
} from "lucide-vue-next";

const { t } = useI18n();
const props = defineProps(["animales"]);
const expandedRows = ref({});

// Esta es la opcion del filtro, de manera que cualquier campo CONTENGA lo que le indiquemos
const filtros = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Función para limpiar el buscador
const limpiarFiltros = () => {
    filtros.value.global.value = null;
};
</script>

<template>
    <div>
        <div class="flex flex-wrap justify-end items-center gap-2 mb-4">
            <IconField>
                <InputIcon>
                    <Search :size="16" class="text-surface-400" />
                </InputIcon>
                <InputText v-model="filtros['global'].value" :placeholder="t('pacientes.buscar') || 'Buscar...'" />
            </IconField>
            
            <Button 
                type="button" 
                severity="secondary" 
                outlined 
                @click="limpiarFiltros" 
                :disabled="!filtros.global.value"
                class="flex items-center gap-2"
            >
                <FilterX :size="16" />
                <span class="hidden sm:inline">Limpiar</span>
            </Button>
        </div>

        <DataTable 
            :value="props.animales" 
            v-model:expandedRows="expandedRows" 
            dataKey="id" 
            :filters="filtros" 
            paginator
            :rows="10" 
            stripedRows 
            class="border border-surface rounded-lg overflow-hidden"
        >
            <Column expander style="width: 3rem" />

            <Column field="nombre" sortable>
                <template #header>
                    <div class="flex items-center gap-2">
                        <PawPrint :size="16" class="text-primary" />
                        <span>{{ t('pacientes.campos.nombre') }}</span>
                    </div>
                </template>
            </Column>

            <Column field="especie" sortable>
                <template #header>
                    <div class="flex items-center gap-2">
                        <Dog :size="16" class="text-primary" />
                        <span>{{ t('pacientes.campos.especie') }}</span>
                    </div>
                </template>
            </Column>

            <Column field="dueno">
                <template #header>
                    <div class="flex items-center gap-2">
                        <User :size="16" class="text-primary" />
                        <span>{{ t('pacientes.campos.dueno') }}</span>
                    </div>
                </template>
            </Column>

            <Column field="telefono">
                <template #header>
                    <div class="flex items-center gap-2">
                        <Phone :size="16" class="text-primary" />
                        <span>{{ t('pacientes.campos.telefono') }}</span>
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
                            <span class="text-xs font-bold uppercase text-muted-color tracking-wider flex items-center gap-1">
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