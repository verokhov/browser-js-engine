export const POINTER_POSITIONS = {
  top: 'top',
  left: 'left',
  bottom: 'bottom',
  right: 'right',
  infinity: 'infinity',
};

export const DEGREES = {
  top: 0,
  left: 90,
  bottom: 180,
  right: 270,
};

export const POINTER_POSITIONS_TO_DEGREES = {
  [POINTER_POSITIONS.top]: DEGREES.top,
  [POINTER_POSITIONS.left]: DEGREES.left,
  [POINTER_POSITIONS.bottom]: DEGREES.bottom,
  [POINTER_POSITIONS.right]: DEGREES.right,
}

export const QUEUES_TYPES = {
  tasks: 'tasks',
  microtasks: 'microtasks',
  renderTasks: 'rendertasks',
  callstack: 'callstack',
  log: 'log',
  alerts: 'alerts',
}

export const QUEUES_TYPES_TO_REMOVE_METHODS = {
  [QUEUES_TYPES.tasks]: 'shift',
  [QUEUES_TYPES.microtasks]: 'shift',
  [QUEUES_TYPES.renderTasks]: 'shift',
  [QUEUES_TYPES.callstack]: 'pop',
  [QUEUES_TYPES.log]: 'pop',
  [QUEUES_TYPES.alerts]: 'shift',
}

export const POINTER_POSITIONS_TO_QUEUES = {
  [POINTER_POSITIONS.left]: QUEUES_TYPES.tasks,
  [POINTER_POSITIONS.bottom]: QUEUES_TYPES.microtasks,
  [POINTER_POSITIONS.right]: QUEUES_TYPES.renderTasks,
}

export const ACTIONS_TYPES = {
  add: 'add',
  remove: 'remove',
};

export const EXAMPLES = {
  12: {
    code: `let a;

const p = new Promise((resolve) => {
  console.log('A1', a);
  a = 25;
  setTimeout(() => {
    console.log('A2', a);
    resolve();
  }, 1000);
});

setTimeout(() => {
  a = 10;
  console.log('A3', a);
}, 1000);

p.then(() => console.log('A4', a));

console.log('A5', a);`,
    steps: [
      {
        lines: '1-19',
      },
      {
        lines: '1',
        pointerPosition: POINTER_POSITIONS.left,
        actions: [
          { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.add, content: 'Script' },
          { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Script' }
        ],
      },
      {
        lines: '4',
        actions: [
          { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Promise constructor' },
          { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'A1 undefined' },
        ],
      },
      {
        lines: '5'
      },
      {
        lines: '6-9',
        actions: [
          { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for setTimeout1' }
        ]
      },
      {
        lines: '6-9',
        actions: [
          { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove }
        ]
      },
      {
        lines: '10',
        actions: [
          { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove }
        ]
      },
      {
        lines: '12-15',
        actions: [
          { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'WebAPI call for setTimeout2' }
        ]
      },
      {
        lines: '12-15',
        actions: [
          { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove }
        ]
      },
      {
        lines: '17'
      },
      {
        lines: '19',
        actions: [
          { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'A5 25' }
        ],
      },
      {
        lines: '1-19',
        pointerPosition: POINTER_POSITIONS.infinity,
        actions: [
          { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
          { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
          { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.add, content: 'Waiting 1 second' },
        ],
      },
      {
        lines: '1-19',
        pointerPosition: POINTER_POSITIONS.left,
        actions: [
          { queue: QUEUES_TYPES.alerts, type: ACTIONS_TYPES.remove },
          { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.add, content: 'setTimeout1' },
          { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.add, content: 'setTimeout2' },
        ],
      },
      {
        lines: '6',
        actions: [
          { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'setTimeout1 callback' },
        ],
      },
      {
        lines: '7',
        actions: [
          { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'A2 25' },
        ],
      },
      {
        lines: '8',
        actions: [
          { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.add, content: 'Promise then callback' },
        ],
      },
      {
        lines: '8',
        actions: [
          { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        ],
      },
      {
        lines: '8',
        pointerPosition: POINTER_POSITIONS.bottom,
        actions: [
          { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
        ],
      },
      {
        lines: '17',
        actions: [
          { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'Promise then callback' },
        ],
      },
      {
        lines: '17',
        actions: [
          { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'A4 25' },
        ],
      },
      {
        lines: '17',
        actions: [
          { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        ],
      },
      {
        lines: '17',
        pointerPosition: POINTER_POSITIONS.left,
        actions: [
          { queue: QUEUES_TYPES.microtasks, type: ACTIONS_TYPES.remove },
        ],
      },
      {
        lines: '12',
        actions: [
          { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.add, content: 'setTimeout2 callback' },
        ],
      },
      {
        lines: '13',
      },
      {
        lines: '14',
        actions: [
          { queue: QUEUES_TYPES.log, type: ACTIONS_TYPES.add, content: 'A3 10' },
        ],
      },
      {
        lines: '15',
        actions: [
          { queue: QUEUES_TYPES.callstack, type: ACTIONS_TYPES.remove },
        ],
      },
      {
        lines: '1-19',
        pointerPosition: POINTER_POSITIONS.infinity,
        actions: [
          { queue: QUEUES_TYPES.tasks, type: ACTIONS_TYPES.remove },
        ],
      },
    ],
  },
};
