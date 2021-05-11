import { ACTIONS_TYPES, QUEUES_TYPES, POINTER_POSITIONS } from '@/constants';

export default {
  code: `window.requestAnimationFrame(() => {
  console.log('rAF 1');

  window.requestAnimationFrame(() => {
    console.log('rAF 2');
  });
});

window.requestAnimationFrame(() => {
  console.log('rAF 3');

  window.requestAnimationFrame(() => {
    console.log('rAF 4');
  });
});

Promise.resolve()
  .then(() => console.log('Promise 1'))
  .then(() => console.log('Promise 2'));

Promise.resolve()
  .then(() => console.log('Promise 3'));

setTimeout(() => console.log('setTimeout'), 0);

console.log('end');`,
  steps: [
    { lines: '1-26' },
    {
      lines: '1-26',
      pointerPosition: POINTER_POSITIONS.left,
      actions: [
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.add, content: 'Script' },
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Script' },
      ],
    },
    {
      lines: '1',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for rAF 1' },
      ],
    },
    {
      lines: '1',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.renderTasks, type: ACTIONS_TYPES.add, content: 'rAF 1' },
      ],
    },
    {
      lines: '9',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for rAF 3' },
      ],
    },
    {
      lines: '9',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.renderTasks, type: ACTIONS_TYPES.add, content: 'rAF 3' },
      ],
    },
    {
      lines: '17',
    },
    {
      lines: '18',
      actions: [
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.add, content: 'Promise then 1' },
      ],
    },
    {
      lines: '21',
    },
    {
      lines: '22',
      actions: [
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.add, content: 'Promise then 3' },
      ],
    },
    {
      lines: '24',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for setTimeout' },
      ],
    },
    {
      lines: '24',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
        {
          queue: QUEUES_TYPES.tasks,
          type: ACTIONS_TYPES.add,
          content: 'setTimeout',
          outside: true,
        },
      ],
    },
    {
      lines: '26',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'end' },
      ],
    },
    {
      lines: '18',
      pointerPosition: POINTER_POSITIONS.bottom,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.markInside },
      ],
    },
    {
      lines: '18',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Promise then 1 callback' },
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'Promise 1' },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.add, content: 'Promise then 2' },
      ],
    },
    {
      lines: '18',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '22',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Promise then 3 callback' },
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'Promise 3' },
      ],
    },
    {
      lines: '22',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '19',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Promise then 2 callback' },
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'Promise 2' },
      ],
    },
    {
      lines: '19',
      pointerPosition: POINTER_POSITIONS.right,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '1-7',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'rAF 1 callback' },
      ],
    },
    {
      lines: '2',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'rAF 1' },
      ],
    },
    {
      lines: '4',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for rAF 2' },
      ],
    },
    {
      lines: '4',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
        {
          queue: QUEUES_TYPES.renderTasks,
          type: ACTIONS_TYPES.add,
          content: 'rAF 2',
          outside: true,
        },
      ],
    },
    {
      lines: '7',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.renderTasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '9-15',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'rAF 3 callback' },
      ],
    },
    {
      lines: '10',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'rAF 3' },
      ],
    },
    {
      lines: '12',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for rAF 4' },
      ],
    },
    {
      lines: '12',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
        {
          queue: QUEUES_TYPES.renderTasks,
          type: ACTIONS_TYPES.add,
          content: 'rAF 4',
          outside: true,
        },
      ],
    },
    {
      lines: '15',
      pointerPosition: POINTER_POSITIONS.left,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.renderTasks, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.renderTasks, type: ACTIONS_TYPES.markInside },
        { queue: QUEUES_TYPES.renderTasks, type: ACTIONS_TYPES.markInside },
      ],
    },
    {
      lines: '24',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'setTimeout callback' },
      ],
    },
    {
      lines: '24',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'setTimeout' },
      ],
    },
    {
      lines: '24',
      pointerPosition: POINTER_POSITIONS.right,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '4-6',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'rAF 2 callback' },
      ],
    },
    {
      lines: '5',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'rAF 2' },
      ],
    },
    {
      lines: '6',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.renderTasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '12-14',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'rAF 4 callback' },
      ],
    },
    {
      lines: '13',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'rAF 4' },
      ],
    },
    {
      lines: '1-26',
      pointerPosition: POINTER_POSITIONS.infinity,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.renderTasks, type: ACTIONS_TYPES.remove },
      ],
    },
  ],
};
