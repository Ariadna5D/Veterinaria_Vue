<script setup>
import Tag from 'primevue/tag';

defineProps({
    icon: {
        type: Object, // Componente de Lucide
        required: true
    },
    label: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#94a3b8'
    }
});
</script>

<template>
    <Tag :style="{ '--label-color': color }" 
         class="px-4 py-1.5 border-2 !rounded-full transition !bg-transparent border-[var(--label-color)] !text-[var(--label-color)] dark:!bg-[var(--label-color)] dark:!text-surface-950 dark:!border-transparent">
        <div class="flex items-center gap-2">
            <component :is="icon" :size="18" />
            <span class="text-base font-semibold leading-none">{{ label }}</span>
        </div>
    </Tag>
</template>