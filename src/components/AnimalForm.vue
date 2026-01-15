<script setup>
import { useI18n } from "vue-i18n";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import Select from "primevue/select";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { computed } from "vue";
import FormGroup from './common/FormGroup.vue';

// iconos para los lugares importantes
import { PawPrint, Dog, User, Phone, ClipboardList } from 'lucide-vue-next';

const { t } = useI18n();

// esta es la ventanita de cuando se completa y se envía un formulario
const toast = useToast();
const emit = defineEmits(["alta-animal"]);

// es necesario computed para que tambien cambie dentro del formulario
const especies = computed(() => [
    { label: t("especies.perro"), value: "PERRO" },
    { label: t("especies.gato"), value: "GATO" },
    { label: t("especies.reptil"), value: "REPTIL" },
    { label: t("especies.ave"), value: "AVE" },
    { label: t("especies.otro"), value: "OTRO" },
]);

// se usa computed para que se actualice correctamente el idioma
const esquema = computed(() =>
    yup.object({
        nombre: yup.string().required(t("ingreso.errores.nomReq")),
        especie: yup.string().required(t("ingreso.errores.espReq")),
        dueno: yup.string().required(t("ingreso.errores.dueReq")),
        telefono: yup
            .string()
            .matches(/^[0-9]{9}$/, t("ingreso.errores.num9"))
            .required("Teléfono requerido"),
        notas: yup.string(),
    })
);

// esta es la validacion que se seguirá
const { handleSubmit, resetForm } = useForm({
    validationSchema: esquema,
});

// Los diversos errores
const { value: nombre, errorMessage: errorNombre, handleBlur: blurNombre } = useField("nombre");
const { value: especie, errorMessage: errorEspecie, handleBlur: blurEspecie } = useField("especie");
const { value: dueno, errorMessage: errorDueno, handleBlur: blurDueno } = useField("dueno");
const { value: telefono, errorMessage: errorTelefono, handleBlur: blurTelefono } = useField("telefono");
const { value: notas } = useField("notas");

// Se falsea el envío como tal de los valores ya que no se ha conectado con back
const alEnviar = handleSubmit((values) => {

    toast.add({
        severity: 'success',
        summary: t('ingreso.formulario.exito'),
        detail: t('ingreso.formulario.campos.tNombreMascota') + ': ' + values.nombre,
        life: 3000
    });

    resetForm();
});
</script>

<template>
    <form @submit.prevent="alEnviar" class="flex flex-col gap-6" aria-labelledby="form-title">
        <h2 id="form-title" class="sr-only">{{ t('ingreso.formulario.accion') }}</h2>

        <div class="grid md:grid-cols-2 gap-6">
            <FormGroup 
                :label="t('ingreso.formulario.campos.tNombreMascota')" 
                :error="errorNombre" 
                id="nombre"
                :icon="PawPrint"
            >
                <InputText 
                    id="nombre" 
                    v-model="nombre" 
                    @blur="blurNombre" 
                    :invalid="!!errorNombre" 
                    aria-required="true"
                    :aria-invalid="!!errorNombre"
                    :aria-describedby="errorNombre ? 'nombre-error' : null"
                />
            </FormGroup>

            <FormGroup :label="t('ingreso.formulario.campos.tEspecie')" :error="errorEspecie" id="especie" :icon="Dog">
                <Select 
                    inputId="especie" 
                    v-model="especie" 
                    :options="especies" 
                    optionLabel="label" 
                    optionValue="value"
                    :invalid="!!errorEspecie" 
                    class="w-full"
                    aria-required="true"
                    :aria-describedby="errorEspecie ? 'especie-error' : null"
                    :placeholder="t('ingreso.formulario.campos.tEspecie')"
                />
            </FormGroup>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
            <FormGroup :label="t('ingreso.formulario.campos.tDueno')" :error="errorDueno" id="dueno" :icon="User">
                <InputText 
                    id="dueno" 
                    v-model="dueno" 
                    @blur="blurDueno" 
                    :invalid="!!errorDueno"
                    aria-required="true"
                    :aria-describedby="errorDueno ? 'dueno-error' : null"
                />
            </FormGroup>

            <FormGroup :label="t('ingreso.formulario.campos.tTelefono')" :error="errorTelefono" id="telefono" :icon="Phone">
                <InputText 
                    id="telefono" 
                    v-model="telefono" 
                    @blur="blurTelefono" 
                    type="tel"
                    :invalid="!!errorTelefono" 
                    aria-required="true"
                    inputmode="tel"
                    :aria-describedby="errorTelefono ? 'telefono-error' : null"
                />
            </FormGroup>
        </div>

        <FormGroup :label="t('ingreso.formulario.campos.tNotas')" id="notes-group" :icon="ClipboardList">
            <Textarea 
                id="notas" 
                v-model="notas" 
                rows="3" 
                class="w-full"
                :aria-label="t('ingreso.formulario.campos.tNotas')"
            />
        </FormGroup>

        <Button 
            type="submit" 
            :label="t('ingreso.formulario.accion')"
            class="!w-full text-xl !font-bold uppercase tracking-widest mt-4"
            :aria-label="t('ingreso.formulario.accion')"
        />
    </form>
</template>