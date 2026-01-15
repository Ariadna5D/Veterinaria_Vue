<script setup>

defineProps({
    // nombre de campo
    label: String,
    //error si no es correcto
    error: String,
    // id del campo
    id: String,
    //icono que se muestra
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

        <small 
            v-show="error" 
            class="text-red-500" 
        >
            {{ error }}
        </small>
    </div>
</template>