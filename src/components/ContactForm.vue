<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';
import { Mail, Phone, MapPin, MessageSquare, Siren } from 'lucide-vue-next';

const { t } = useI18n();

const form = ref({ email: '', telefono: '', cp: '', mensaje: '' });
const errores = ref({});

const validarYEnviar = () => {
    errores.value = {};
    let esValido = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9}$/; 
    const cpRegex = /^[0-9]{5}$/;    

    if (!emailRegex.test(form.value.email)) { errores.value.email = t('contacto.errores.formato'); esValido = false; }
    if (!phoneRegex.test(form.value.telefono)) { errores.value.telefono = t('contacto.errores.telefono'); esValido = false; }
    if (!cpRegex.test(form.value.cp)) { errores.value.cp = t('contacto.errores.cp'); esValido = false; }
    if (form.value.mensaje.length < 5) { errores.value.mensaje = t('contacto.errores.longitud'); esValido = false; }

    if (esValido) {
        alert(t('contacto.formulario.exito'));
        form.value = { email: '', telefono: '', cp: '', mensaje: '' };
    }
};
</script>

<template>
    <div class="w-full">
        <form @submit.prevent="validarYEnviar" class="flex flex-col gap-6">
            
            <div class="grid md:grid-cols-2 gap-6">

                <div class="flex flex-col gap-2">
                    <label for="cp" class="flex items-center gap-2 font-semibold">
                        <MapPin :size="18" class="text-primary"/> CP
                    </label>
                    <InputText id="cp" v-model="form.cp" :invalid="!!errores.cp" />
                    <small class="text-red-500">{{ errores.cp }}</small>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="telefono" class="flex items-center gap-2 font-semibold">
                        <Phone :size="18" class="text-primary"/> {{ t('contacto.formulario.campoTelefono') }}
                    </label>
                    <InputText id="telefono" v-model="form.telefono" type="tel" :invalid="!!errores.telefono" />
                    <small class="text-red-500">{{ errores.telefono }}</small>
                </div>
            </div>

            <div class="grid md:grid-cols-1 gap-6">
                                <div class="flex flex-col gap-2">
                    <label for="email" class="flex items-center gap-2 font-semibold">
                        <Mail :size="18" class="text-primary"/> {{ t('contacto.formulario.campoMail') }}
                    </label>
                    <InputText id="email" v-model="form.email" :invalid="!!errores.email" />
                    <small class="text-red-500">{{ errores.email }}</small>
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <label for="mensaje" class="flex items-center gap-2 font-semibold">
                    <MessageSquare :size="18" class="text-primary"/> {{ t('contacto.formulario.campoConsulta') }}
                </label>
                <Textarea id="mensaje" v-model="form.mensaje" :invalid="!!errores.mensaje" rows="3" class="w-full" />
                <small class="text-red-500">{{ errores.mensaje }}</small>
            </div>

            <Button type="submit" :label="t('contacto.formulario.accion')" class="w-full" />

            <div class="mt-4 p-4 flex items-center gap-4 border-l-4 border-red-500 rounded-r-lg text-red-500">
                <div class="p-2 bg-red-500 rounded-full animate-pulse shrink-0">
                    <Siren color="white" :size="25"/>
                </div>
                <div class="text-sm">
                    <strong class="block text-base">{{ t('contacto.urgencias.titulo') }}</strong>
                    <p>{{ t('contacto.urgencias.texto') }} 
                        <a href="tel:959112233" class="font-bold text-red-500 hover:underline">959 11 22 33</a>
                    </p>
                </div>
            </div>
        </form>
    </div>
</template>