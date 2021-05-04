<template>
  <div class="engine">
    <div class="header">
      <engine-queue
          :items="callstack"
          label="Call stack"
          color="gray"
          item-color="gray-darken"
          transition="slide-x-fade"
      />
      <engine-queue
          :items="log"
          label="Log"
          color="gray-darken"
          item-color="gray"
          transition="slide-x-fade"
      />
    </div>
    <div class="content">
      <div class="row">
        <engine-queue
            :items="tasks"
            label="Tasks"
            type="column"
            color="green__border"
            item-color="green"
            class="queue-top-offset"
            transition="slide-y-fade"
        />
        <engine-loop ref="loop" />
        <engine-queue
            :items="renderTasks"
            label="Render tasks"
            type="column"
            color="yellow__border"
            item-color="yellow"
            class="queue-top-offset"
            transition="slide-y-fade"
        />
      </div>
      <div class="row">
        <engine-queue
            :items="microtasks"
            label="Microtasks"
            type="column"
            color="blue__border"
            item-color="blue"
            transition="slide-y-fade"
            bottom
        />
      </div>
    </div>
    <engine-alerts :alerts="alerts" />
  </div>
</template>

<script>
import { uid } from 'uid';

import { ACTIONS_TYPES, QUEUES_TYPES } from '@/constants';

import EventLoopService from '../../services/event-loop';

import EngineQueue from './partials/engine-queue.vue';
import EngineLoop from './partials/engine-loop.vue';
import EngineAlerts from './partials/engine-alets.vue';

const createActionByContent = content => ({ key: uid(), content });

export default {
  components: {
    EngineQueue,
    EngineLoop,
    EngineAlerts,
  },
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    activeStepIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      log: [],
      callstack: [],
      tasks: [],
      microtasks: [],
      renderTasks: [],
      alerts: [],
    }
  },
  computed: {
    currentStep() {
      return this.steps[this.activeStepIndex];
    },
  },
  watch: {
    activeStepIndex(value, oldValue) {
      if (value > oldValue) {
        this.nextProcess();
      } else if (value < oldValue) {
        this.prevProcess();
      }
    },
  },
  mounted() {
    this.$eventLoop = new EventLoopService({
      el: this.$refs.loop.$refs.pointer,
      radius: 208,
      center: 206,
    });
  },
  methods: {
    nextProcess() {
      const { goTo, actions = [] } = this.steps[this.activeStepIndex];

      if (goTo && this.$eventLoop) {
        setTimeout(() => this.$eventLoop.goToPosition(goTo), 100);
      }

      actions.forEach(({ queue, type, content }) => {
        if (type === ACTIONS_TYPES.remove) {
          if (queue === QUEUES_TYPES.callstack) {
            this.callstack.pop();
          } else {
            this[queue].shift();
          }
        } else {
          this[queue].push(createActionByContent(content));
        }
      });
    },

    prevProcess() {
      const { goTo, actions = [] } = this.steps[this.activeStepIndex];

      if (goTo) {
        this.$eventLoop.goToPosition(goTo);
      }

      actions.forEach(({ queue, type, content }) => {
        if (type === ACTIONS_TYPES.remove) {
          if (queue === QUEUES_TYPES.callstack) {
            this.callstack.pop();
          } else {
            this[queue].shift();
          }
        } else {
          this[queue].push(createActionByContent(content));
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.engine {
  position: relative;
  padding: 10px;
  width: 1000px;
  height: 800px;

  .queue-top-offset {
    margin-top: 50px;
  }
}
</style>
