<template>
  <RouterView v-slot="{ Component, route }">
    <component
      :is="getLayoutComponent(route.meta?.layout as string)"
      :key="route.path"
    >
      <component :is="Component" v-if="Component" />
    </component>
  </RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import AuthLayout from '@/components/layouts/AuthLayout.vue';

const getLayoutComponent = (layout: string | undefined) => {
  switch (layout) {
    case 'auth':
      return AuthLayout;
    case 'default':
    default:
      return DefaultLayout;
  }
};
</script>

