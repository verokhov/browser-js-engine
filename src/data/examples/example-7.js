import { ACTIONS_TYPES, QUEUES_TYPES, POINTER_POSITIONS } from '@/constants';

export default {
  code: `Promise.resolve()
  .then(() => console.log('Promise 1'));

Promise.resolve()
  .then(() => console.log('Promise 2'));

window.requestAnimationFrame(() => {
  console.log('rAF 1');

  Promise.resolve()
    .then(() => console.log('Promise 3'))
    .then(() => console.log('Promise 4'));
});

window.requestAnimationFrame(() => {
  console.log('rAF 2');

  Promise.resolve()
    .then(() => console.log('Promise 5'));
});`,
  steps: [
    {
      lines: '1-20',
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
      lines: '1-2',
      actions: [
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.add, content: 'Promise 1' },
      ],
    },
    {
      lines: '4-5',
      actions: [
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.add, content: 'Promise 2' },
      ],
    },
    {
      lines: '7-13',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for rAF 1' },
      ],
    },
    {
      lines: '7-13',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.renderTasks, type: ACTIONS_TYPES.add, content: 'rAF 1' },
      ],
    },
    {
      lines: '15-20',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for rAF 2' },
      ],
    },
    {
      lines: '15-20',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.renderTasks, type: ACTIONS_TYPES.add, content: 'rAF 2' },
      ],
    },
    {
      lines: '1-20',
      pointerPosition: POINTER_POSITIONS.bottom,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '2',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Promise 1 callback' },
      ],
    },
    {
      lines: '2',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'Promise 1' },
      ],
    },
    {
      lines: '2',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '5',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Promise 2 callback' },
      ],
    },
    {
      lines: '5',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'Promise 2' },
      ],
    },
    {
      lines: '7-13',
      pointerPosition: POINTER_POSITIONS.right,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'rAF 1 callback' },
      ],
    },
    {
      lines: '8',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'rAF 1' },
      ],
    },
    {
      lines: '10-11',
      actions: [
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.add, content: 'Promise 3' },
      ],
    },
    {
      lines: '7-13',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'Callstack is empty' },
      ],
    },
    {
      lines: '11',
      pointerPosition: POINTER_POSITIONS.bottom,
      pointerPositionReverse: true,
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.renderTasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '11',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Promise 3 callback' },
      ],
    },
    {
      lines: '11',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'Promise 3' },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.add, content: 'Promise 4' },
      ],
    },
    {
      lines: '12',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '12',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Promise 4 callback' },
      ],
    },
    {
      lines: '12',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'Promise 4' },
      ],
    },
    {
      lines: '15-20',
      pointerPosition: POINTER_POSITIONS.right,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '15-20',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'rAF 2 callback' },
      ],
    },
    {
      lines: '16',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'rAF 2' },
      ],
    },
    {
      lines: '18-19',
      actions: [
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.add, content: 'Promise 5' },
      ],
    },
    {
      lines: '15-20',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'Callstack is empty' },
      ],
    },
    {
      lines: '19',
      pointerPosition: POINTER_POSITIONS.bottom,
      pointerPositionReverse: true,
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.renderTasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '19',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Promise 5 callback' },
      ],
    },
    {
      lines: '19',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'Promise 5' },
      ],
    },
    {
      lines: '',
      pointerPosition: POINTER_POSITIONS.right,
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'Style calculation, Layout, Paint' },
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '1-20',
      pointerPosition: POINTER_POSITIONS.infinity,
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
      ],
    },
  ],
};
