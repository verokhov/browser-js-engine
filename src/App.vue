<template>
  <router-view />
</template>

<script>

export default {
  created() {
    const { redirect } = sessionStorage;

    window.hljs.initLineNumbersOnLoad();

    if (redirect) {
      delete sessionStorage.redirect;
      this.$router.push(redirect);
    }
  },
};
</script>
