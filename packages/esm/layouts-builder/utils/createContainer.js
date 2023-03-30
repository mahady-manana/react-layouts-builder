import { __spreadArray } from '../../node_modules/tslib/tslib.es6.js';
import { createLayoutContainer } from '../helpers/create.js';

var createContainer = function createContainer(options) {
  if (!options) {
    throw new Error('createContainer(options: CreateContainerOptions): No options was found');
  }

  if (!options.layouts || !options.block) {
    throw new Error('createContainer(options: CreateContainerOptions): Missing options: layouts and block  are required');
  }

  var layouts = options.layouts,
      block = options.block,
      targetedContainerId = options.targetedContainerId;
  var container = createLayoutContainer(block);

  if (!targetedContainerId) {
    return layouts.concat(container);
  }

  return layouts.reduce(function (layout, next) {
    if (next.id === targetedContainerId) {
      return __spreadArray(__spreadArray([], layout, true), [next, container], false);
    }

    return layout;
  }, []);
};

export { createContainer };
