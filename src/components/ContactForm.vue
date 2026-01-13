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
    const phoneRegex = /^[0-9]{9}$/; 
    const cpRegex = /^[0-9]{5}$/;    

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
            <label for="email">
                <Mail :size="16" aria-hidden="true" /> 
                {{ t('contacto.formulario.campoMail') }}
            </label>
            <InputText 
                id="email"
                v-model="form.email" 
                :class="{ 'p-invalid': errores.email }"
                aria-describedby="error-email"
            />
            <small id="error-email" class="error-text" role="alert">{{ errores.email }}</small>
        </div>

        <div class="field-group">
            <label for="telefono">
                <Phone :size="16" aria-hidden="true" /> 
                {{ t('contacto.formulario.campoTelefono') }}
            </label>
            <InputText 
                id="telefono"
                v-model="form.telefono" 
                placeholder="600123456" 
                type="tel" 
                :class="{ 'p-invalid': errores.telefono }" 
                aria-describedby="error-telefono"
            />
            <small id="error-telefono" class="error-text" role="alert">{{ errores.telefono }}</small>
        </div>

        <div class="field-group">
            <label for="cp">
                <MapPin :size="16" aria-hidden="true" /> 
                {{ t('contacto.formulario.campoCP') }}
            </label>
            <InputText 
                id="cp"
                v-model="form.cp" 
                placeholder="04001" 
                inputmode="numeric"
                :class="{ 'p-invalid': errores.cp }" 
                aria-describedby="error-cp"
            />
            <small id="error-cp" class="error-text" role="alert">{{ errores.cp }}</small>
        </div>

        <div class="field-group">
            <label for="mensaje">
                <MessageSquare :size="16" aria-hidden="true" /> 
                {{ t('contacto.formulario.campoConsulta') }}
            </label>
            <Textarea 
                id="mensaje"
                v-model="form.mensaje" 
                rows="3" 
                :class="{ 'p-invalid': errores.mensaje }" 
                class="w-full" 
                aria-describedby="error-mensaje"
            />
            <small id="error-mensaje" class="error-text" role="alert">{{ errores.mensaje }}</small>
        </div>

        <Button 
            :aria-label="t('contacto.formulario.accion')" 
            :label="t('contacto.formulario.accion')" 
            @click="validarYEnviar" 
            class="w-full mt-2" 
        />

        <div class="emergency-box" role="region" aria-label="Información de urgencias">
            <div class="icon-pulse">
                <Siren color="white" aria-hidden="true"/>
            </div>
            <div>
                <strong>{{ t('contacto.urgencias.titulo') }}</strong>
                <p>
                    {{ t('contacto.urgencias.texto') }} 
                    <a href="tel:959112233" class="phone-highlight">959 11 22 33</a>
                </p>
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
    color: #ef4444;
    min-height: 1.2em; 
    font-size: 0.8rem;
    display: block; 
    margin-top: 0.25rem;
}

.emergency-box {
    margin-top: 2rem;
    background-color: #fee2e2;
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
    flex-shrink: 0; 
}

.phone-highlight {
    font-weight: bold;
    font-size: 1.1em;
    display: block;
    color: #991b1b;
    text-decoration: none;
}

.phone-highlight:hover {
    text-decoration: underline;
}
</style>