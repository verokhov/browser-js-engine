<template>
  <div>
    <span
      v-for="(point, index) in points"
      :key="index"
      :class="{ 'control-point': true, 'control-point--active': activeIndex === index }"
      :title="`Step ${index + 1}`"
      @click.prevent.stop="$emit('point-click', index)"
    />
  </div>
</template>

<script>
export default {
  emits: {
    'point-click': null,
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    points() {
      return new Array(this.count).fill(0);
    },
  },
};
</script>

<style lang="scss" scoped>
.control-point {
  cursor: pointer;
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 12px;
  background: white;
  border-radius: 50%;
  opacity: .3;
  transition: opacity .15s linear;

  &--active, &:hover {
    opacity: .7;
  }
}
</style>
