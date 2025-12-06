<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { type AlertVariants, alertVariants } from "."

interface Props {
  variant?: AlertVariants["variant"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
})
</script>

<template>
  <div
    data-slot="alert"
    :class="cn(alertVariants({ variant }), props.class)"
    role="alert"
  >
    <slot />
  </div>
</template>

