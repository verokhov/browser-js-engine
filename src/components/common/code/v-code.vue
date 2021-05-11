<template>
  <div class="pre">
    <code ref="code" :class="{ javascript: true, 'has-highlights': this.highlight }">{{ code }}</code>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
      default: '',
    },
    lines: {
      type: String,
      default: '',
    },
    highlight: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    code() {
      this.highlightCode();
    },

    lines() {
      this.highlightLines();
    },
  },
  mounted() {
    this.highlightCode();
  },
  methods: {
    highlightCode() {
      this.$nextTick(() => {
        window.hljs.highlightElement(this.$refs.code);
        window.hljs.lineNumbersBlock(this.$refs.code);

        setTimeout(() => this.highlightLines(), 100);
      });
    },

    highlightLines() {
      const linesNumbers = String(this.lines).split(',')
        .reduce((acc, pattern) => {
          const [from, to] = pattern.split('-');
          const fromNumber = parseInt(from, 10);
          const toNumber = parseInt(to, 10);
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
  },
};
</script>

<style lang="scss">
.pre {
  margin: 1em;
  white-space: pre;
}

code.hljs {
  width: 520px;
  font-size: 1.2em;
  line-height: 1.4em;
  border-radius: 10px;
  padding: 1em;

  tr {
    transition: opacity .2s linear;
  }

  &, * {
    font-family: monospace;
  }

  &.has-highlights tr:not(.highlight-line) {
    opacity: .4;
  }
}
</style>
