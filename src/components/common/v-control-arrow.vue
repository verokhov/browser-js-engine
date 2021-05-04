<template>
  <div :class="arrowClass" />
</template>

<script>
export default {
  props: {
    right: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    arrowClass() {
      return {
        'controls-arrow': true,
        'controls-arrow--right': this.right,
        'controls-arrow--disabled': this.disabled,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.controls-arrow {
  cursor: pointer;
  position: relative;
  width: 3.6em;
  height: 3.6em;
  opacity: .4;
  transition: opacity .15s ease;

  &:before, &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2.6em;
    height: .5em;
    border-radius: .25em;
    background-color: currentColor;
    transition: all .15s ease,background-color .8s ease;
    transform-origin: .2em 50%;
    will-change: transform;
  }

  &:before {
    transform: translateX(.5em) translateY(1.55em) rotate(45deg);
  }

  &:after {
    transform: translateX(.5em) translateY(1.55em) rotate(-45deg);
  }

  &:hover {
    opacity: .7;

    &:before {
      transform: translateX(.5em) translateY(1.55em) rotate(40deg);
    }
    &:after {
      transform: translateX(.5em) translateY(1.55em) rotate(-40deg);
    }
  }

  &:active {
    &:before {
      transform: translateX(.5em) translateY(1.55em) rotate(36deg);
    }
    &:after {
      transform: translateX(.5em) translateY(1.55em) rotate(-36deg);
    }
  }

  &.controls-arrow--right {
    transform: rotate(180deg);
  }

  &.controls-arrow--disabled {
    pointer-events: none;
    opacity: .1;
  }
}
</style>
