import { isUndefined } from 'lodash';

import { GO_TO_TYPES, GO_TO_TYPES_TO_DEGREES, DEGREES } from '@/constants';

export default class EventLoop {
  constructor({ el, radius, center, alpha = Math.PI / 180 } = {}) {
    this.el = el;
    this.radius = radius;
    this.center = center;
    this.alpha = alpha;
    this.infinity = false;
    this.currentDegree = 0;

    this.draw(DEGREES.top);
  }

  draw(degree) {
    const { el, radius, center, alpha } = this;
    const value = alpha * degree;

    this.currentDegree = degree;

    el.style.left = `${center - radius * Math.sin(value)}px`;
    el.style.top = `${center - radius * Math.cos(value)}px`;
  }

  goTo(toDegree, reverse = false) {
    const degreeStep = 2;
    const maxDegree = 360 - degreeStep;
    const isDefinedToDegree = !isUndefined(toDegree);

    let currentDegree = this.currentDegree;

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
        window.requestAnimationFrame(drawStep);
      }
    };

    window.requestAnimationFrame(drawStep);
  }

  goToPosition(position, reverse = false) {
    this.infinity = false;

    if (position === GO_TO_TYPES.infinity) {
      return this.goToInfinity()
    }

    return this.goTo(GO_TO_TYPES_TO_DEGREES[position], reverse);
  }

  goToInfinity() {
    this.infinity = true;

    this.goTo();
  }
}
