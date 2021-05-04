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
            :active="activeQueue === 'tasks'"
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
            :active="activeQueue === 'renderTasks'"
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
            :active="activeQueue === 'microtasks'"
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

import { ACTIONS_TYPES, GO_TO_TYPES, POSITIONS_TO_QUEUES } from '@/constants';

import EventLoopService from '../../services/event-loop';

import EngineQueue from './partials/engine-queue.vue';
import EngineLoop from './partials/engine-loop.vue';
import EngineAlerts from './partials/engine-alets.vue';

const createActionByContent = content => ({ key: uid(), content });

const QUEUES_SPECOAL_REMOVE_METHODS_MAP = {
  callstack: 'pop',
  log: 'pop',
}

const getNearestGoToForStep = (steps, index = 0) => {
  for (let i = index; i >= 0; --i) {
    if (steps[i].goTo) {
      return steps[i].goTo;
    }
  }

  return GO_TO_TYPES.top;
};

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
    currentStep() {
      return this.steps[this.activeStepIndex];
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
    this.removedActions = [];

    this.$eventLoop = new EventLoopService({
      el: this.$refs.loop.$refs.pointer,
      radius: 208,
      center: 206,
    });
  },
  methods: {
    nextProcess(index) {
      const { goTo, actions = [] } = this.steps[index];

      if (goTo && this.$eventLoop) {
        this.goToPosition(goTo);
      }

      actions.forEach((action) => {
        const { type, queue, content } = action;

        if (type === ACTIONS_TYPES.remove) {
          const removedAction = this[queue][QUEUES_SPECOAL_REMOVE_METHODS_MAP[queue] || 'shift']();

          return this.removedActions.push({ action: removedAction, forAction: action });
        }

        this[queue].push(createActionByContent(content));
      });
    },

    prevProcess(index) {
      const { goTo: prevGoTo, actions: prevActions = [] } = this.steps[index + 1];

      if (prevGoTo) {
        const goTo = getNearestGoToForStep(this.steps, index);

        this.goToPosition(goTo, goTo !== GO_TO_TYPES.infinity);
      }

      prevActions.forEach((prevAction) => {
        const { type, queue } = prevAction;

        if (type === ACTIONS_TYPES.add) {
          return this[queue][QUEUES_SPECOAL_REMOVE_METHODS_MAP[queue] || 'shift']();
        }

        const { action: removedAction } = this.removedActions.find(({ forAction }) => forAction === prevAction) || {};

        if (removedAction) {
          this[queue].push(removedAction);
        }
      });
    },

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

    goToPosition(position, reverse = false) {
      setTimeout(() => {
        this.$eventLoop.goToPosition(position, reverse);

        this.activeQueue = POSITIONS_TO_QUEUES[position] || null;
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
