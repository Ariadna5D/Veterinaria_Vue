<script setup>
defineProps({
    label: String,
    error: String,
    id: String,
    icon: Object 
});
</script>

<template>
    <div class="flex flex-col gap-2">
        <label :for="id" class="flex items-center gap-2 font-semibold text-sm">
            <component :is="icon" v-if="icon" :size="16" class="text-primary" />
            {{ label }}
        </label>
        
        <slot></slot>

        <small :id="id + '-error'" class="text-red-500 h-4 block text-xs">
            {{ error }}
        </small>
    </div>
</template>