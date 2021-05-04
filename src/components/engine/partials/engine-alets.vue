<template>
  <div class="alert-wrapper">
    <transition-group name="slide-y-fade">
      <div v-for="alert in alerts" :key="alert.key" class="alert">{{ alert.content }}</div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    alerts: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.alert-wrapper {
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  .alert {
    margin: -50px 5px 5px 5px;
    padding: 20px;
    font-size: 1.2rem;
    border-radius: 5px;
    background: $colorGray;
    border: 1px solid darken($colorGray, 10);
    position: relative;
  }
}
</style>
