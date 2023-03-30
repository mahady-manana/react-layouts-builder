import { createLayoutContainer } from '../helpers/create';
import {
  CreateContainer,
  LayoutType,
} from '../interfaces/types';

export const createContainer: CreateContainer = (options) => {
  if (!options) {
    throw new Error(
      'createContainer(options: CreateContainerOptions): No options was found',
    );
  }
  if (!options.layouts || !options.block) {
    throw new Error(
      'createContainer(options: CreateContainerOptions): Missing options: layouts and block  are required',
    );
  }
  const { layouts, block, targetedContainerId } = options;

  const container = createLayoutContainer(block);
  if (!targetedContainerId) {
    return layouts.concat(container);
  }

  return layouts.reduce((layout, next) => {
    if (next.id === targetedContainerId) {
      return [...layout, next, container];
    }
    return layout;
  }, [] as LayoutType[]);
};
