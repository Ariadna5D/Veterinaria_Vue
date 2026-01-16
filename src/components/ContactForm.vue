<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Toast from 'primevue/toast'; 
import { useToast } from 'primevue/usetoast'; 
import { useI18n } from 'vue-i18n';
import FormGroup from './common/FormGroup.vue'; 

import { Mail, Phone, MapPin, MessageSquare, Siren } from 'lucide-vue-next';

const { t } = useI18n();
const toast = useToast(); 

const form = ref({ email: '', telefono: '', cp: '', mensaje: '' });
const errores = ref({});

// Para probar que un formulario se puede hacer de forma "manual"
const validarYEnviar = () => {
    errores.value = {};
    let esValido = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9}$/;
    const cpRegex = /^[0-9]{5}$/;

    // mensajes de error
    if (!emailRegex.test(form.value.email)) { errores.value.email = t('contacto.errores.formato'); esValido = false; }
    if (!phoneRegex.test(form.value.telefono)) { errores.value.telefono = t('contacto.errores.telefono'); esValido = false; }
    if (!cpRegex.test(form.value.cp)) { errores.value.cp = t('contacto.errores.cp'); esValido = false; }
    if (form.value.mensaje.length < 5) { errores.value.mensaje = t('contacto.errores.longitud'); esValido = false; }

    // en caso de ser valido, mostrar toast
    if (esValido) {
        toast.add({
            severity: 'success',
            summary: t('contacto.formulario.exito'),
            detail: t('contacto.formulario.campoMail') + ': ' + form.value.email,
            life: 4000
        });

        form.value = { email: '', telefono: '', cp: '', mensaje: '' };
    }
};
</script>

<template>
    <div class="w-full">
        <Toast />

        <form @submit.prevent="validarYEnviar" class="flex flex-col gap-6" aria-labelledby="contact-title">
            <h2 id="contact-title" class="sr-only">{{ t('contacto.formulario.accion') }}</h2>

            <div class="grid md:grid-cols-2 gap-6">
                <FormGroup :label="t('contacto.formulario.campoCP')" :error="errores.cp" id="cp" :icon="MapPin">
                    <InputText 
                        id="cp" 
                        v-model="form.cp" 
                        :invalid="!!errores.cp" 
                        aria-required="true"
                        inputmode="numeric"
                        :aria-invalid="!!errores.cp"
                        :aria-describedby="errores.cp ? 'cp-error' : null" 
                    />
                </FormGroup>

                <FormGroup :label="t('contacto.formulario.campoTelefono')" :error="errores.telefono" id="telefono" :icon="Phone">
                    <InputText 
                        id="telefono" 
                        v-model="form.telefono" 
                        type="tel" 
                        inputmode="tel"
                        :invalid="!!errores.telefono"
                        aria-required="true"
                        :aria-invalid="!!errores.telefono"
                        :aria-describedby="errores.telefono ? 'telefono-error' : null" 
                    />
                </FormGroup>
            </div>

            <FormGroup :label="t('contacto.formulario.campoMail')" :error="errores.email" id="email" :icon="Mail">
                <InputText 
                    id="email" 
                    v-model="form.email" 
                    type="email"
                    :invalid="!!errores.email" 
                    aria-required="true"
                    :aria-invalid="!!errores.email"
                    :aria-describedby="errores.email ? 'email-error' : null" 
                />
            </FormGroup>

            <FormGroup :label="t('contacto.formulario.campoConsulta')" :error="errores.mensaje" id="mensaje" :icon="MessageSquare">
                <Textarea 
                    id="mensaje" 
                    v-model="form.mensaje" 
                    :invalid="!!errores.mensaje" 
                    rows="3" 
                    class="w-full"
                    aria-required="true"
                    :aria-invalid="!!errores.mensaje"
                    :aria-describedby="errores.mensaje ? 'mensaje-error' : null" 
                />
            </FormGroup>

            <Button 
                type="submit" 
                :label="t('contacto.formulario.accion')"
                class="w-full !text-xl !font-bold uppercase tracking-widest mt-4" 
                :aria-label="t('contacto.formulario.accion')"
            />

            <div
                role="region"
                :aria-label="t('contacto.urgencias.titulo')"
                class="mt-4 p-4 flex items-center gap-4 border-l-4 border-red-500 rounded-r-lg bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400"
            >
                <div class="p-2 bg-red-500 rounded-full animate-pulse shrink-0" aria-hidden="true">
                    <Siren color="white" :size="24" />
                </div>
                <div class="text-sm">
                    <strong class="block text-base">{{ t('contacto.urgencias.titulo') }}</strong>
                    <p>
                        {{ t('contacto.urgencias.texto') }}
                        <a 
                            href="tel:959112233" 
                            class="font-bold hover:underline focus:outline-dotted focus:outline-2 focus:outline-offset-2"
                            :aria-label="'Llamar a urgencias al 9 5 9 1 1 2 2 3 3'"
                        >
                            959 11 22 33
                        </a>
                    </p>
                </div>
            </div>
        </form>
    </div>
</template>