import { isUndefined } from 'lodash';

import { POINTER_POSITIONS, POINTER_POSITIONS_TO_DEGREES, DEGREES } from '@/constants';

export default class EventLoopPointer {
  constructor({ el, radius, center, alpha = Math.PI / 180 } = {}) {
    this.el = el;
    this.radius = radius;
    this.center = center;
    this.alpha = alpha;
    this.infinity = false;
    this.currentDegree = 0;

    this.draw(DEGREES.top);
  }

  /**
   * Draw method
   *
   * @param {number} degree
   */
  draw(degree) {
    const { el, radius, center, alpha } = this;
    const value = alpha * degree;

    this.currentDegree = degree;

    el.style.left = `${center - radius * Math.sin(value)}px`;
    el.style.top = `${center - radius * Math.cos(value)}px`;
  }

  /**
   * Got to method which runs rAF for drawing
   *
   * @param {number} [toDegree]
   * @param {boolean} [reverse = false]
   */
  goTo(toDegree, reverse = false) {
    const degreeStep = 2;
    const maxDegree = 360 - degreeStep;
    const isDefinedToDegree = !isUndefined(toDegree);

    let currentDegree = this.currentDegree;

    return new Promise((resolve) => {
      const drawStep = () => {
        if (reverse) {
          currentDegree = currentDegree <= 0 ? 360 : currentDegree - degreeStep;
        } else {
          currentDegree = currentDegree >= maxDegree ? 0 : currentDegree + degreeStep;
        }

        this.draw(currentDegree);

        if (
          (isDefinedToDegree && currentDegree !== toDegree)
          || (!isDefinedToDegree && this.infinity)
        ) {
          return window.requestAnimationFrame(drawStep);
        }

        return resolve();
      };

      window.requestAnimationFrame(drawStep);
    });
  }

  /**
   * Run infinity draw method
   */
  goToInfinity() {
    this.infinity = true;

    return this.goTo();
  }

  /**
   * Stop infinity drawing
   */
  stopInfinity() {
    this.infinity = false;
  }

  /**
   * Go to special position method with reverse parameter
   *
   * @param {EngineStepPointerPosition} position
   * @param {boolean} [reverse = false]
   */
  goToPosition(position, reverse = false) {
    this.stopInfinity();

    if (position === POINTER_POSITIONS.infinity) {
      return this.goToInfinity()
    }

    return this.goTo(POINTER_POSITIONS_TO_DEGREES[position], reverse);
  }
}
