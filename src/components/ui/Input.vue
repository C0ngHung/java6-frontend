<template>
  <div class="relative w-full">
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="cn(
        'flex h-10 w-full border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent py-2 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-destructive focus:border-destructive',
        className
      )"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur', $event)"
    />
    <p v-if="error" class="mt-1 text-sm text-destructive">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils';

interface Props {
  id?: string;
  type?: string;
  modelValue?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
});

defineEmits<{
  'update:modelValue': [value: string | number];
  blur: [event: FocusEvent];
}>();
</script>

