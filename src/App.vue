<template>
  <main>
    <the-header />
    <router-view />
  </main>
</template>

<script>
import TheHeader from '@/components/layout/the-header.vue';

export default {
  components: { TheHeader },
};
</script>
