<template>
  <div :class="{ queue: true, [`queue--${type}`]: true }">
    <div class="queue--title">{{ label }}</div>
    <event-loop-rects-list
        :items="items"
        :type="type"
        :color="color"
        :item-color="itemColor"
        :transition="transition"
        :active="active"
    ></event-loop-rects-list>
  </div>
</template>

<script>
import EventLoopRectsList from './engine-rects-list.vue';

export default {
  components: { EventLoopRectsList },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    itemColor: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'row',
      validator: (value) => ['row', 'column'].includes(value),
    },
    transition: {
      type: String,
      default: 'fade',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.queue {
  &--column {
    .queue--title {
      text-align: center;
    }
  }

  &--row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
  }

  &--title {
    font-size: 1.2rem;
    font-weight: 700;
  }
}
</style>
