<template>
  <div :class="wrapperClass">
    <transition-group :name="transition">
      <event-loop-rect-item
        v-for="item in items"
        :key="item.key"
        :color="itemColor"
      >
        {{ item.content }}
      </event-loop-rect-item>
    </transition-group>
  </div>
</template>

<script>
import EventLoopRectItem from './engine-rect-item.vue';

export default {
  components: { EventLoopRectItem },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'row',
      validator: value => ['row', 'column'].includes(value),
    },
    color: {
      type: String,
      default: '',
    },
    itemColor: {
      type: String,
      default: '',
    },
    transition: {
      type: String,
      default: 'fade',
    },
  },
  computed: {
    wrapperClass() {
      return {
        'rect-wrapper': true,
        [`rect-wrapper--${this.type}`]: true,
        [`color--${this.color}`]: true,
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rect-wrapper {
  position: relative;
  display: flex;

  &--row {
    height: 50px;
    width: 840px;

    & >>> .rect {
      margin-left: 0;

      &:first-of-type {
        margin-left: 4px;
      }
    }
  }

  &--column {
    margin-top: 10px;
    flex-direction: column;
    width: 230px;
    min-height: 50px;

    & >>> .rect {
      margin-top: 0;

      &:first-of-type {
        margin-top: 4px;
      }
    }
  }
}
</style>
