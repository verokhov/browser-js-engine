<template>
  <div :class="wrapperClass">
    <transition-group :name="transition">
      <event-loop-rect-item
        v-for="item in insideItems"
        :key="item.key"
        :color="itemColor"
      >
        {{ item.content }}
      </event-loop-rect-item>
    </transition-group>
  </div>
  <div class="rect-wrapper--outside">
    <transition-group :name="transition">
      <event-loop-rect-item
          v-for="item in outsideItems"
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
    insideItems() {
      return this.items.filter(({ outside }) => !outside);
    },

    outsideItems() {
      return this.items.filter(({ outside }) => outside);
    },

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
  padding: $rectWrapperPadding;
  margin-bottom: $rectWrapperPadding * 2;

  &--outside {
    padding: 0 5px;
  }

  &--row {
    min-height: $minHeight;
    width: 840px;
  }

  &--column {
    margin-top: 10px;
    flex-direction: column;
    width: 230px;
    min-height: $minHeight;
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
