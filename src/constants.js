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
};

export const QUEUES_TYPES = {
  tasks: 'tasks',
  microtasks: 'microtasks',
  renderTasks: 'renderTasks',
  callstack: 'callstack',
  log: 'log',
  alerts: 'alerts',
};

export const POINTER_POSITIONS_TO_QUEUES = {
  [POINTER_POSITIONS.left]: QUEUES_TYPES.tasks,
  [POINTER_POSITIONS.bottom]: QUEUES_TYPES.microtasks,
  [POINTER_POSITIONS.right]: QUEUES_TYPES.renderTasks,
};

export const ACTIONS_TYPES = {
  add: 'add',
  remove: 'remove',
  markInside: 'markInside',
};

export const GITHUB_LINK = 'https://github.com/verokhov/browser-js-engine';
