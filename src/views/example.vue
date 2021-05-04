<template>
  <h2>Example</h2>
  <div class="row" :key="number">
    <pre><code ref="code" class="javascript has-highlights">{{ example.code }}</code></pre>
    <the-engine :steps="steps" :active-step-index="activeStepIndex" />
  </div>
  <button @click.prevent="prev">Prev</button>
  <button @click.prevent="next">Next</button>
</template>

<script>
import { EXAMPLES } from '@/constants';

import TheEngine from '@/components/engine/the-engine.vue';

export default {
  components: { TheEngine },
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
  },
  watch: {
    example() {
      this.activeStepIndex = 0;
      this.highlightCode();
    },
  },
  mounted() {
    this.highlightCode();
  },
  methods: {
    highlightCode() {
      this.$nextTick(() => {
        window.hljs.highlightElement(this.$refs.code);

        console.log(this.currentStep.lines);
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

    next() {
      if (this.activeStepIndex + 1 < this.steps.length) {
        this.activeStepIndex += 1;

        const { lines } = this.currentStep;

        this.highlightLines(lines);
      }
    },

    prev() {
      if (this.activeStepIndex > 0) {
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
