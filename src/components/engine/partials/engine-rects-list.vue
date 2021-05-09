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
      validator: (value) => ['row', 'column'].includes(value),
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
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    wrapperClass() {
      return {
        'rect-wrapper': true,
        'rect-wrapper--active': this.active,
        [`rect-wrapper--${this.type}`]: true,
        [`color--${this.color}`]: true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$minHeight: 52px;

.rect-wrapper {
  position: relative;
  display: flex;

  &--row {
    min-height: $minHeight;
    width: 840px;

    &:deep(.rect) {
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
    min-height: $minHeight;

    &:deep(.rect) {
      margin-top: 0;

      &:first-of-type {
        margin-top: 4px;
      }
    }
  }

  &:before {
    content: "";
    position: absolute;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background: $colorRed;
    top: 15px;
    left: -30px;
    z-index: 2;
    opacity: 0;
    transition: opacity .3s ease;
  }

  &--active:before {
    opacity: 1;
  }
}
</style>
