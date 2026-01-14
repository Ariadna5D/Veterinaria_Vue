<script setup>
import { useI18n } from 'vue-i18n';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button'; // Añadimos el componente Button para consistencia
import { computed } from 'vue';

const { t } = useI18n();

const emit = defineEmits(['alta-animal']);
const especies = computed(() => [
    { label: t('especies.perro'), value: 'PERRO' },
    { label: t('especies.gato'), value: 'GATO' },
    { label: t('especies.reptil'), value: 'REPTIL' },
    { label: t('especies.ave'), value: 'AVE' },
    { label: t('especies.otro'), value: 'OTRO' }
]);

// se usa computed para que se actualice correctamente el idioma
const esquema = computed(() => yup.object({
    nombre: yup.string().required(t('ingreso.errores.nomReq')),
    especie: yup.string().required(t('ingreso.errores.espReq')),
    dueno: yup.string().required(t('ingreso.errores.dueReq')),
    telefono: yup.string().matches(/^[0-9]{9}$/, t('ingreso.errores.num9')).required('Teléfono requerido'),
    notas: yup.string()
}));

// esta es la validacion que se seguirá
const { handleSubmit, resetForm } = useForm({
    validationSchema: esquema
});

// Los diversos errores
const { value: nombre, errorMessage: errorNombre, handleBlur: blurNombre } = useField('nombre');
const { value: especie, errorMessage: errorEspecie, handleBlur: blurEspecie } = useField('especie');
const { value: dueno, errorMessage: errorDueno, handleBlur: blurDueno } = useField('dueno');
const { value: telefono, errorMessage: errorTelefono, handleBlur: blurTelefono } = useField('telefono');
const { value: notas } = useField('notas');

// Se falsea el envío como tal de los valores ya que no se ha conectado con back
const alEnviar = handleSubmit((values) => {
    emit('alta-animal', { ...values, id: Date.now() });
    alert(t('ingreso.formulario.exito'));
    resetForm();
});
</script>

<template>
    <div class="w-full">
        <form @submit="alEnviar" class="flex flex-col gap-6">
            <div class="grid md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                    <label for="nombre" class="font-semibold">{{ t('ingreso.formulario.campos.tNombreMascota') }}</label>
                    <InputText id="nombre" v-model="nombre" @blur="blurNombre" :invalid="!!errorNombre" />
                    <small class="text-red-500">{{ errorNombre }}</small>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="especie" class="font-semibold">{{ t('ingreso.formulario.campos.tEspecie') }}</label>
                    <Select inputId="especie" :placeholder="t('ingreso.formulario.seleccionar')" v-model="especie"
                        :options="especies" optionLabel="label" optionValue="value" class="w-full"
                        :invalid="!!errorEspecie" />
                    <small class="text-red-500">{{ errorEspecie }}</small>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                    <label for="dueno" class="font-semibold">{{ t('ingreso.formulario.campos.tDueno') }}</label>
                    <InputText id="dueno" v-model="dueno" @blur="blurDueno" :invalid="!!errorDueno" />
                    <small class="text-red-500">{{ errorDueno }}</small>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="telefono" class="font-semibold">{{ t('ingreso.formulario.campos.tTelefono') }}</label>
                    <InputText id="telefono" v-model="telefono" @blur="blurTelefono" type="tel"
                        :invalid="!!errorTelefono" />
                    <small class="text-red-500">{{ errorTelefono }}</small>
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <label for="notas" class="font-semibold">{{ t('ingreso.formulario.campos.tNotas') }}</label>
                <Textarea id="notas" v-model="notas" rows="3" class="w-full" />
            </div>

            <Button type="submit" :label="t('ingreso.formulario.accion')" class="w-full" />
        </form>
    </div>
</template>