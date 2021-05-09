<template>
  <router-view />
</template>

<script>

export default {
  created() {
    window.hljs.initLineNumbersOnLoad();
  },
};
</script>
