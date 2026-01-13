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
        <div class="mb-4" style="text-align: right">
            <InputText v-model="filtros['global'].value" placeholder=". . ." />
        </div>

        <DataTable :value="props.animales" v-model:expandedRows="expandedRows" dataKey="id" :filters="filtros" paginator
            :rows="10" stripedRows>
            <Column expander style="width: 3rem" />

            <Column field="nombre" :header="t('pacientes.campos.nombre')" sortable></Column>
            <Column field="especie" :header="t('pacientes.campos.especie')" sortable></Column>
            <Column field="dueno" :header="t('pacientes.campos.dueno')"></Column>
            <Column field="telefono" :header="t('pacientes.campos.telefono')"></Column>

            <template #expansion="slotProps">
                <div class="expansion-content">
                    <h4>{{ t("pacientes.ficha.titulo") + slotProps.data.nombre }}</h4>
                    <div class="grid-2">
                        <p>
                            <strong>{{ t("pacientes.ficha.notas") }}:</strong>
                            {{ slotProps.data.notas || "Sin notas" }}
                        </p>
                        <p><strong>ID:</strong> #{{ slotProps.data.id }}</p>
                    </div>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<style scoped>
.expansion-content {
    padding: 1rem;
    border-radius: 0.2rem;
    margin-left: 3rem;
}
</style>
