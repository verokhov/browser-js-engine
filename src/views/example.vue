<template>
  <div class="row" :key="number">
    <pre><code ref="code" class="javascript has-highlights">{{ example.code }}</code></pre>
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
      @click.prevent="prev"
    />
    <v-control-points
      :count="steps.length"
      :active-index="activeStepIndex"
      @point-click="goTo"
    />
    <v-control-arrow
      :disabled="isLastStep"
      right
      @click.prevent="next"
    />
  </div>
</template>

<script>
import { EXAMPLES } from '@/constants';

import TheEngine from '@/components/engine/the-engine.vue';
import VControlArrow from '@/components/common/controls/v-control-arrow.vue';
import VControlPoints from '@/components/common/controls/v-control-points.vue';

export default {
  components: { TheEngine, VControlArrow, VControlPoints },
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
      this.highlightCode();
    },

    currentStep(value) {
      const { lines } = value;

      if (lines) {
        this.highlightLines(lines);
      }
    },
  },
  mounted() {
    this.highlightCode();
  },
  methods: {
    highlightCode() {
      this.$nextTick(() => {
        window.hljs.highlightElement(this.$refs.code);

        setTimeout(() => this.highlightLines(this.currentStep.lines), 100);
      });
    },

    highlightLines(lines) {
      const linesNumbers = String(lines).split(',')
        .reduce((acc, pattern) => {
          const [from, to] = pattern.split('-');
          const fromNumber = parseInt(from);
          const toNumber = parseInt(to);
          const result = to
            ? Array.from({ length: toNumber - fromNumber + 1 }, (value, index) => index + fromNumber)
            : [fromNumber];

          acc.push(...result);

          return acc;
        }, []);

      const elements = this.$refs.code.getElementsByTagName('tr');

      elements.forEach((element, index) => {
        if (linesNumbers.includes(index + 1)) {
          element.classList.add('highlight-line');
        } else {
          element.classList.remove('highlight-line');
        }
      });
    },

    goTo(index) {
      if (index > 0 && index < this.steps.length && index !== this.activeStepIndex) {
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
  },
}
</script>
<style lang="scss" scoped>
code {
  width: 500px;
}
</style>
