import { ACTIONS_TYPES, QUEUES_TYPES, POINTER_POSITIONS } from '@/constants';

export default {
  code: `const loop = () => setTimeout(loop, 0);

loop();`,
  steps: [
    {
      lines: '1-3',
    },
    {
      lines: '1',
      pointerPosition: POINTER_POSITIONS.left,
      actions: [
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.add, content: 'Script' },
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Script' },
      ],
    },
    {
      lines: '3',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'loop' },
      ],
    },
    {
      lines: '1',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for setTimeout' },
      ],
    },
    {
      lines: '3',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.add, content: 'loop' },
      ],
    },
    {
      lines: '1',
      pointerPosition: POINTER_POSITIONS.left,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '1',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'loop' },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.add, content: 'loop' },
      ],
    },
    {
      lines: '1',
      pointerPosition: POINTER_POSITIONS.left,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '1',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'loop' },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.add, content: 'loop' },
      ],
    },
    {
      lines: '1',
      pointerPosition: POINTER_POSITIONS.left,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '1',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'loop' },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.add, content: 'loop' },
      ],
    },
  ],
};
