/**
 * @typedef {'task' | 'microtask' | 'rendertask' | 'log' | 'callstack' | 'alert'} EngineStepActionQueue
 */

/**
 * @typedef {'add' | 'remove'} EngineStepActionType
 */

/**
 * @typedef {'top' | 'left' | 'bottom' | 'right' | 'infinity'} EngineStepPointerPosition
 */

/**
 * @typedef {Object} EngineStepAction
 * @property {EngineStepActionQueue} queue
 * @property {EngineStepActionType} type
 * @property {string} content
 */

/**
 * @typedef {Object} EngineStep
 * @property {string | number} lines
 * @property {EngineStepPointerPosition} [pointerPosition]
 * @property {EngineStepAction[]} [actions]
 */

import { uid } from 'uid';

import { ACTIONS_TYPES, POINTER_POSITIONS } from '@/constants';

/**
 * Create action with uid key and passed content
 *
 * @param {string} content
 * @returns {{key: string, content: string}}
 */
export const createActionByContent = content => ({ key: uid(), content });

/**
 * Get nearest pointer position less then passed step
 *
 * @param {EngineStep[]} steps
 * @param {number} [index = 0]
 * @returns {EngineStepPointerPosition}
 */
export const getNearestPointerPositionForStep = (steps, index = 0) => {
  for (let i = index; i >= 0; --i) {
    if (steps[i].pointerPosition) {
      return steps[i].pointerPosition;
    }
  }

  return POINTER_POSITIONS.top;
};

/**
 * Get copied sorted actions by passed type
 *
 * @param {EngineStepAction[]} actions
 * @param {EngineStepActionType} type
 * @returns {EngineStepAction[]}
 */
export const getSortedActionsByType = (actions = [], type = ACTIONS_TYPES.add) =>
  [...actions].sort((a, b) => a.type !== b.type && a.type === type ? -1 : 0)
