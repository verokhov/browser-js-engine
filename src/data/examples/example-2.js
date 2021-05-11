import { ACTIONS_TYPES, QUEUES_TYPES, POINTER_POSITIONS } from '@/constants';

export default {
  code: `console.log('script start');

setTimeout(() => console.log('setTimeout'), 0);

Promise.resolve()
  .then(() => console.log('promise1'))
  .then(() => console.log('promise2'));

console.log('script end');`,
  steps: [
    { lines: '1-9' },
    {
      lines: '1',
      pointerPosition: POINTER_POSITIONS.left,
      actions: [
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.add, content: 'Script' },
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Script' },
      ],
    },
    {
      lines: '1',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'script start' },
      ],
    },
    {
      lines: '3',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for setTimeout' },
      ],
    },
    {
      lines: '5',
      actions: [
        {
          queue: QUEUES_TYPES.tasks,
          type: ACTIONS_TYPES.add,
          content: 'setTimeout',
          outside: true,
        },
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '6',
      actions: [
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.add, content: 'Promise then 1' },
      ],
    },
    {
      lines: '7',
    },
    {
      lines: '9',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'script end' },
      ],
    },
    {
      lines: '6',
      pointerPosition: POINTER_POSITIONS.bottom,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.markInside },
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Promise then 1' },
      ],
    },
    {
      lines: '6',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'promise1' },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.add, content: 'Promise then 2' },
      ],
    },
    {
      lines: '6',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '7',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Promise then 2' },
      ],
    },
    {
      lines: '7',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'promise2' },
      ],
    },
    {
      lines: '3',
      pointerPosition: POINTER_POSITIONS.left,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '3',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'setTimeout callback' },
      ],
    },
    {
      lines: '3',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'setTimeout' },
      ],
    },
    {
      lines: '1-9',
      pointerPosition: POINTER_POSITIONS.infinity,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
      ],
    },
  ],
};
