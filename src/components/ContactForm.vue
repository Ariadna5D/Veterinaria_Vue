<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

import { Mail, Phone, MapPin, MessageSquare, Siren } from 'lucide-vue-next';

const { t } = useI18n();

const form = ref({ 
    email: '', 
    telefono: '', 
    cp: '', 
    mensaje: '' 
});
const errores = ref({});

const validarYEnviar = () => {
    errores.value = {};
    let esValido = true;

    // --- REGEX ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9}$/; // Valida exactamente 9 números
    const cpRegex = /^[0-9]{5}$/;    // Valida exactamente 5 números

    if (!emailRegex.test(form.value.email)) {
        errores.value.email = t('contacto.errores.formato');
        esValido = false;
    }

    if (!phoneRegex.test(form.value.telefono)) {
        errores.value.telefono = t('contacto.errores.telefono'); 
        esValido = false;
    }

    if (!cpRegex.test(form.value.cp)) {
        errores.value.cp = t('contacto.errores.cp'); 
        esValido = false;
    }

    if (form.value.mensaje.length < 5) {
        errores.value.mensaje = t('contacto.errores.longitud');
        esValido = false;
    }

    if (esValido) {
        alert(t('contacto.formulario.exito'));
        form.value = { email: '', telefono: '', cp: '', mensaje: '' };
    }
};
</script>

<template>
    <div class="card p-4" style="margin-top: 2rem; border: 1px solid #e5e7eb;">
        <h3>{{ t('contacto.formulario.titulo') }}</h3>
        
        <div class="field-group">
            <label>
                <Mail :size="16" /> {{ t('contacto.formulario.campoMail') }}
            </label>
            <InputText v-model="form.email" :class="{ 'p-invalid': errores.email }" />
            <small class="error-text">{{ errores.email }}</small>
        </div>

        <div class="field-group">
            <label>
                <Phone :size="16" /> {{ t('contacto.formulario.campoTelefono') }}
            </label>
            <InputText v-model="form.telefono" placeholder="600123456" :class="{ 'p-invalid': errores.telefono }" />
            <small class="error-text">{{ errores.telefono }}</small>
        </div>

        <div class="field-group">
            <label>
                <MapPin :size="16" /> {{ t('contacto.formulario.campoCP') }}
            </label>
            <InputText v-model="form.cp" placeholder="04001" :class="{ 'p-invalid': errores.cp }" />
            <small class="error-text">{{ errores.cp }}</small>
        </div>

        <div class="field-group">
            <label>
                <MessageSquare :size="16" /> {{ t('contacto.formulario.campoConsulta') }}
            </label>
            <Textarea v-model="form.mensaje" rows="3" :class="{ 'p-invalid': errores.mensaje }" class="w-full" />
            <small class="error-text">{{ errores.mensaje }}</small>
        </div>

        <Button :label="t('contacto.formulario.accion')" @click="validarYEnviar" class="w-full mt-2" />

        <div class="emergency-box">
            <div class="icon-pulse">
                <Siren color="white" />
            </div>
            <div>
                <strong>{{ t('contacto.urgencias.titulo') }}</strong>
                <p>{{ t('contacto.urgencias.texto') }} <span class="phone-highlight">959 11 22 33</span></p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.field-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.error-text {
    color: #ef4444; /* Rojo tailwind */
    min-height: 1.2em; /* Reserva espacio para que no salte el layout */
    font-size: 0.8rem;
}

/* Estilos Urgencias */
.emergency-box {
    margin-top: 2rem;
    background-color: #fee2e2; /* Rojo muy claro */
    border: 1px solid #ef4444;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #991b1b;
}

.icon-pulse {
    background: #ef4444;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.phone-highlight {
    font-weight: bold;
    font-size: 1.1em;
    display: block;
}
</style>