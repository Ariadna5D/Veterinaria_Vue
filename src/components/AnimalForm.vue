<script setup>
import { useI18n } from 'vue-i18n';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
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
    <div class="form-wrapper">
        <form @submit="alEnviar" class="flex-col" style="gap: 1.5rem;">

            <div class="grid-2">
                <div class="flex-col">
                    <label for="nombre">{{ t('ingreso.formulario.campos.tNombreMascota') }}</label>
                    <InputText 
                        id="nombre"
                        v-model="nombre" 
                        @blur="blurNombre" 
                        :class="{ 'p-invalid': errorNombre }" 
                        aria-describedby="error-nombre"
                    />
                    <small id="error-nombre" class="error-msg" role="alert">{{ errorNombre }}</small>
                </div>

                <div class="flex-col">
                    <label for="especie">{{ t('ingreso.formulario.campos.tEspecie') }}</label>
                    <Select 
                        inputId="especie"
                        :placeholder="t('ingreso.formulario.seleccionar')" 
                        v-model="especie" 
                        :options="especies"
                        optionLabel="label" 
                        optionValue="value" 
                        class="w-full" 
                        aria-describedby="error-especie"
                    />
                    <small id="error-especie" class="error-msg" role="alert">{{ errorEspecie }}</small>
                </div>
            </div>

            <div class="grid-2">
                <div class="flex-col">
                    <label for="dueno">{{ t('ingreso.formulario.campos.tDueno') }}</label>
                    <InputText 
                        id="dueno"
                        v-model="dueno" 
                        @blur="blurDueno" 
                        :class="{ 'p-invalid': errorDueno }" 
                        aria-describedby="error-dueno"
                    />
                    <small id="error-dueno" class="error-msg" role="alert">{{ errorDueno }}</small>
                </div>

                <div class="flex-col">
                    <label for="telefono">{{ t('ingreso.formulario.campos.tTelefono') }}</label>
                    <InputText 
                        id="telefono"
                        v-model="telefono" 
                        @blur="blurTelefono" 
                        type="tel"
                        :class="{ 'p-invalid': errorTelefono }" 
                        aria-describedby="error-telefono"
                    />
                    <small id="error-telefono" class="error-msg" role="alert">{{ errorTelefono }}</small>
                </div>
            </div>

            <div class="flex-col">
                <label for="notas">{{ t('ingreso.formulario.campos.tNotas') }}</label>
                <Textarea 
                    id="notas"
                    v-model="notas" 
                    rows="3" 
                    class="w-full" 
                />
            </div>

            <button type="submit" class="btn-primary w-full" :aria-label="t('ingreso.formulario.accion')">{{ t('ingreso.formulario.accion') }}</button>
        </form>
    </div>
</template>

<style scoped>
.form-wrapper {
    max-width: 800px;
    margin: 0 auto;
}
</style>