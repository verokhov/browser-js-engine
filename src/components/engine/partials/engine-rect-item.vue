<template>
  <div :class="rectClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'gray',
    },
  },
  computed: {
    rectClass() {
      return {
        rect: true,
        [`color--${this.color}`]: true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.rect {
  margin: $rectMargin;
  position: relative;
  padding: 8px 12px;
  height: 38px;
  transition: all .2s linear;
  font-family: monospace;
  font-size: 1.1em;
  font-weight: 500;
  text-align: center;
  color: $textColor;
}
</style>
