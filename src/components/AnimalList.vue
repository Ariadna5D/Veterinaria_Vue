<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { FilterMatchMode } from "@primevue/core/api";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps(["animales"]);
const expandedRows = ref({});

// Esta es la opcion del filtro, de manera que cualquier campo CONTENGA lo que le indiquemos
const filtros = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<template>
    <div>
        <div class="mb-4 text-right">
            <InputText v-model="filtros['global'].value" placeholder=". . ." />
        </div>

        <DataTable :value="props.animales" v-model:expandedRows="expandedRows" dataKey="id" :filters="filtros" paginator
            :rows="10" stripedRows class="border border-surface rounded-lg overflow-hidden">
            <Column expander style="width: 3rem" />

            <Column field="nombre" :header="t('pacientes.campos.nombre')" sortable></Column>
            <Column field="especie" :header="t('pacientes.campos.especie')" sortable></Column>
            <Column field="dueno" :header="t('pacientes.campos.dueno')"></Column>
            <Column field="telefono" :header="t('pacientes.campos.telefono')"></Column>

            <template #expansion="slotProps">
                <div class="p-4 rounded-lg ml-12 bg-emphasis/10">
                    <h4 class="font-bold text-lg mb-3 text-primary">
                        {{ t("pacientes.ficha.titulo") + slotProps.data.nombre }}
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p>
                            <strong class="text-muted-color">{{ t("pacientes.ficha.notas") }}:</strong>
                            <span class="block mt-1">{{ slotProps.data.notes || "Sin notas" }}</span>
                        </p>
                        <p>
                            <strong class="text-muted-color">ID:</strong> 
                            <span class="block mt-1">#{{ slotProps.data.id }}</span>
                        </p>
                    </div>
                </div>
            </template>
        </DataTable>
    </div>
</template>