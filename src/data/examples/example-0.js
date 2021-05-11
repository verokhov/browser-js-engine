import { ACTIONS_TYPES, QUEUES_TYPES } from '@/constants';

export default {
  code: `function foo(b) {
  const a = 10;
  return a + b + 11;
}

function bar(x) {
  const y = 3;
  return foo(x * y);
}

console.log(bar(7));`,
  steps: [
    {
      lines: '1-11',
    },
    {
      lines: '1-11',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Script' },
      ],
    },
    {
      lines: '11',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'bar(7)' },
      ],
    },
    {
      lines: '6-9',
    },
    {
      lines: '7',
    },
    {
      lines: '8',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'foo(7 * 3)' },
      ],
    },
    {
      lines: '1-4',
    },
    {
      lines: '2',
    },
    {
      lines: '3',
    },
    {
      lines: '8',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '11',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '11',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'console.log(42)' },
      ],
    },
    {
      lines: '11',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: '42' },
      ],
    },
    {
      lines: '1-11',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
      ],
    },
  ],
};
