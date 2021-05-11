<template>
  <h1>Available examples</h1>
  <div class="codes-wrapper">
    <v-code
      v-for="(code, index) in examplesCodes"
      :key="index"
      :code="code"
      class="code"
      @click="routerToExample(index)"
    />
  </div>
</template>

<script>
import { ROUTES } from '@/config';
import EXAMPLES from '@/data/examples';

import VCode from '@/components/common/code/v-code.vue';

export default {
  components: { VCode },
  computed: {
    examplesCodes() {
      return EXAMPLES.map(({ code }) => code);
    },
  },
  methods: {
    routerToExample(number) {
      this.$router.push({ name: ROUTES.example, params: { number } });
    },
  },
};
</script>

<style lang="scss" scoped>
.codes-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .code {
    position: relative;
    opacity: .7;
    transition: opacity .2s linear;
    align-self: flex-start;

    &:hover {
      opacity: 1;
    }

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
      z-index: 2;
    }
  }
}
</style>
