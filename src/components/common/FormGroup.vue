<script setup>
defineProps({
    // campo
    label: String,
    // error si está mal completo
    error: String,
    // id del campo
    id: String,
    // icono del campo
    icon: Object
});
</script>

<template>
    <div class="flex flex-col gap-2">
        <label :for="id" class="flex items-center gap-2 font-semibold text-lg">
            <component :is="icon" v-if="icon" :size="24" class="text-primary" />
            {{ label }}
        </label>

        <slot></slot>

        <small v-if="error" :id="`${id}-error`" class="text-red-500" role="alert">
            {{ error }}
        </small>
    </div>
</template>