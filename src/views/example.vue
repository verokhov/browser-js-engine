<template>
  <div class="example">
    <div class="back">
      <v-control-arrow title="Back" @click.prevent="routerToHome" />
    </div>
    <div class="row">
      <v-code :code="example.code" :lines="currentStep.lines" highlight />
      <the-engine :steps="steps" :active-step-index="activeStepIndex" />
    </div>
    <div
      class="controls-arrow"
      @click="prev"
    ></div>
    <div
      class="controls-arrow controls-arrow--right"
      @click="next"
    ></div>
    <div class="row row--justify-center row--align-center">
      <v-control-arrow
        :disabled="isFirstStep"
        title="Prev"
        @click.prevent="prev"
      />
      <v-control-points
        :count="steps.length"
        :active-index="activeStepIndex"
        @point-click="goTo"
      />
      <v-control-arrow
        :disabled="isLastStep"
        title="Next"
        right
        @click.prevent="next"
      />
    </div>
  </div>
</template>

<script>
import { ROUTES } from '@/config';
import EXAMPLES from '@/data/examples';

import TheEngine from '@/components/engine/the-engine.vue';
import VCode from '@/components/common/code/v-code.vue';
import VControlArrow from '@/components/common/controls/v-control-arrow.vue';
import VControlPoints from '@/components/common/controls/v-control-points.vue';

export default {
  components: {
    TheEngine,
    VCode,
    VControlArrow,
    VControlPoints,
  },
  props: {
    number: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      activeStepIndex: 0,
    };
  },
  computed: {
    example() {
      return EXAMPLES[parseInt(this.number, 10)] || {};
    },

    steps() {
      return this.example.steps || [];
    },

    currentStep() {
      return this.steps[this.activeStepIndex] || {};
    },

    isFirstStep() {
      return !this.activeStepIndex;
    },

    isLastStep() {
      return this.activeStepIndex === this.steps.length - 1;
    },
  },
  watch: {
    example() {
      this.activeStepIndex = 0;
    },
  },
  methods: {
    goTo(index) {
      if (index >= 0 && index < this.steps.length && index !== this.activeStepIndex) {
        this.activeStepIndex = index;
      }
    },

    next() {
      if (!this.isLastStep) {
        this.activeStepIndex += 1;
      }
    },

    prev() {
      if (!this.isFirstStep) {
        this.activeStepIndex -= 1;
      }
    },

    routerToHome() {
      this.$router.push({ name: ROUTES.home });
    },
  },
};
</script>

<style lang="scss" scoped>
.example {
  padding: 0 50px;
}
.back {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
