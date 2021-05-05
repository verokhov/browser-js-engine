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
    <div v-if="hasPointerPositions" class="content">
      <div class="row">
        <engine-queue
            :items="tasks"
            :active="isTasksActive"
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
            :active="isRenderTasksActive"
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
            :active="isMicrotasksActive"
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
import {
  ACTIONS_TYPES,
  QUEUES_TYPES,
  POINTER_POSITIONS,
  POINTER_POSITIONS_TO_QUEUES,
  QUEUES_TYPES_TO_REMOVE_METHODS,
} from '@/constants';

import EventLoopPointerService from '../../services/event-loop-pointer';

import { createActionByContent, getNearestPointerPositionForStep } from '@/helpers/engine';

import EngineQueue from './partials/engine-queue.vue';
import EngineLoop from './partials/engine-loop.vue';
import EngineAlerts from './partials/engine-alets.vue';

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
      activeQueue: null,
    }
  },
  computed: {
    hasPointerPositions() {
      return this.steps.some(step => step.pointerPosition);
    },

    isTasksActive() {
      return this.activeQueue === QUEUES_TYPES.tasks;
    },

    isRenderTasksActive() {
      return this.activeQueue === QUEUES_TYPES.renderTasks;
    },

    isMicrotasksActive() {
      return this.activeQueue === QUEUES_TYPES.microtasks;
    },
  },
  watch: {
    activeStepIndex(value, oldValue) {
      const diff = value - oldValue;
      if (diff === -1) {
        return this.prevProcess(value);
      } else if (diff === 1) {
        return this.nextProcess(value);
      }

      this.goToProcess(diff);
    },
  },
  mounted() {
    /**
     * We don't need reactivity here
     */
    this.$removedActions = [];

    this.$eventLoopPointer = new EventLoopPointerService({
      el: this.$refs.loop.$refs.pointer,
      radius: 208, // Matched imperatively
      center: 206, // Matched imperatively
    });
  },
  beforeUnmount() {
    this.$eventLoopPointer.stopInfinity();
  },
  methods: {
    /**
     * Process method for go to next step
     *
     * @param {number} index
     */
    nextProcess(index) {
      const { pointerPosition, actions = [] } = this.steps[index];

      if (pointerPosition) {
        this.pointerGoToPosition(pointerPosition);
      }

      actions.forEach((action) => {
        const { type, queue, content } = action;

        if (type === ACTIONS_TYPES.remove) {
          const removedAction = this[queue][QUEUES_TYPES_TO_REMOVE_METHODS[queue]]();

          return this.$removedActions.push({ action: removedAction, forAction: action });
        }

        this[queue].push(createActionByContent(content));
      });
    },

    /**
     * Process method for go to previous step
     *
     * @param {number} index
     */
    prevProcess(index) {
      const { pointerPosition: prevPointerPosition, actions: prevActions = [] } = this.steps[index + 1];

      if (prevPointerPosition) {
        const pointerPosition = getNearestPointerPositionForStep(this.steps, index);

        this.pointerGoToPosition(pointerPosition, pointerPosition !== POINTER_POSITIONS.infinity);
      }

      prevActions.forEach((prevAction) => {
        const { type, queue } = prevAction;

        if (type === ACTIONS_TYPES.add) {
          return this[queue][QUEUES_TYPES_TO_REMOVE_METHODS[queue]]();
        }

        const { action: removedAction } = this.$removedActions
          .find(({ forAction }) => forAction === prevAction) || {};

        if (removedAction) {
          const method = [QUEUES_TYPES.callstack, QUEUES_TYPES.log].includes(queue) ? 'push' : 'unshift';

          this[queue][method](removedAction);
        }
      });
    },

    /**
     * Process method for go to special step by diff
     *
     * @param {number} diff
     */
    goToProcess(diff) {
      if (diff < 0) {
        while (diff <= 0) {
          this.prevProcess(this.activeStepIndex - diff);
          ++diff;
        }
      } else {
        while (diff >= 0) {
          this.nextProcess(this.activeStepIndex - diff);
          --diff;
        }
      }
    },

    /**
     * Call pointer go to special position with reverse parameter
     *
     * @param {EngineStepPointerPosition} position
     * @param {boolean} [reverse = false]
     */
    pointerGoToPosition(position, reverse = false) {
      clearTimeout(this.pointerTimer);

      this.pointerTimer = setTimeout(async () => {
        this.activeQueue = null;

        await this.$eventLoopPointer.goToPosition(position, reverse);

        this.activeQueue = POINTER_POSITIONS_TO_QUEUES[position] || null;
      }, 100);
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
