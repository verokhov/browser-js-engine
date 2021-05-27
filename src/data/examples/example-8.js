import { ACTIONS_TYPES, QUEUES_TYPES, POINTER_POSITIONS } from '@/constants';

export default {
  code: `document.body.addEventListener('click', () => {
  console.log('click 1');

  Promise.resolve()
    .then(() => console.log('promise'));
});

document.body.addEventListener('click', () => {
  console.log('click 2');
});`,
  steps: [
    {
      lines: '1-10',
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
      lines: '1-6',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for adding listener' },
      ],
    },
    {
      lines: '1-6',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '8-10',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for adding listener' },
      ],
    },
    {
      lines: '8-10',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '',
      pointerPosition: POINTER_POSITIONS.infinity,
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'Waiting click' },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '',
      pointerPosition: POINTER_POSITIONS.left,
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.add, content: 'click' },
      ],
    },
    {
      lines: '1-6',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'click 1 listener' },
      ],
    },
    {
      lines: '2',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'click 1' },
      ],
    },
    {
      lines: '4-5',
      actions: [
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.add, content: 'Promise then' },
      ],
    },
    {
      lines: '1-6',
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'Callstack is empty' },
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '5',
      pointerPosition: POINTER_POSITIONS.bottom,
      actions: [
        { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '5',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Promise then callback' },
      ],
    },
    {
      lines: '5',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'promise' },
      ],
    },
    {
      lines: '8-10',
      pointerPosition: POINTER_POSITIONS.left,
      pointerPositionReverse: true,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.remove },
      ],
    },
    {
      lines: '8-10',
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'click 2 listener' },
      ],
    },
    {
      lines: '9',
      actions: [
        { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'click 2' },
      ],
    },
    {
      lines: '1-10',
      pointerPosition: POINTER_POSITIONS.infinity,
      actions: [
        { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
      ],
    },
  ],
};
