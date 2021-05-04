<template>
  <div class="loop">
    <div class="circle color--green loop--left"></div>
    <div class="circle color--blue loop--bottom"></div>
    <div class="circle color--yellow loop--right"></div>
    <div ref="pointer" class="circle circle--big color--red"></div>
    <div class="circle--loop"></div>
  </div>
</template>

<style lang="scss" scoped>
.circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;

  &--big {
    width: 34px;
    height: 34px;
  }

  &--loop {
    width: 420px;
    height: 420px;
    border-radius: 50%;
    border: 4px solid darken($colorGray, 50%);
  }
}

.loop {
  position: relative;
  padding: 13px;
  margin: 10px;

  .circle {
    position: absolute;
  }

  &--left, &--right {
    top: 50%;
    transform: translateY(-50%);
  }

  &--left {
    left: 6px;
  }

  &--right {
    right: 6px;
  }

  &--bottom {
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
  }

  &--pointer {
    position: absolute;
    top: $pointerStartTop;
    left: $pointerStartLeft;
  }
}
</style>
