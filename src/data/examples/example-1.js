import { ACTIONS_TYPES, QUEUES_TYPES, POINTER_POSITIONS } from '@/constants';

export default {
  code: `function g() {
  console.log('bar');
}

function h() {
  console.log('blix');
}

function f() {
  console.log('foo');
  setTimeout(g, 0);
  console.log('baz');
  h();
}

f();`,
  steps: [
    { lines: '1-16' },
    {
      lines: '1-16',
      pointerPosition: POINTER_POSITIONS.left,
      actions: [
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.add, content: 'Script' },
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Script' },
      ],
    },
    {
      lines: '16',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'f()' },
      ],
    },
    {
      lines: '10',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'foo' },
      ],
    },
    {
      lines: '11',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for setTimeout' },
      ],
    },
    {
      lines: '12',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'baz' },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.add, content: 'g' },
      ],
    },
    {
      lines: '13',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'h()' },
      ],
    },
    {
      lines: '6',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'blix' },
      ],
    },
    {
      lines: '13',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '16',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '1-16',
      pointerPosition: POINTER_POSITIONS.left,
      actions: [
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '1-3',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'g()' },
      ],
    },
    {
      lines: '2',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'bar' },
      ],
    },
    {
      lines: '1-16',
      pointerPosition: POINTER_POSITIONS.infinity,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
      ],
    },
  ],
};
