import { createLayoutBlock } from 'layouts-builder/helpers/create';
import {
  CreateBlock,
  LayoutType,
} from 'layouts-builder/interfaces/types';
import { createContainer } from './createContainer';

export const createBlock: CreateBlock = (options) => {
  if (!options) {
    throw new Error(
      'createBlock(options: CreateBlockOptions): No options was found',
    );
  }
  if (!options.layouts || !options.block) {
    throw new Error(
      'createBlock(options: CreateBlockOptions): Missing options: layouts and block  are required',
    );
  }
  const { layouts, block, targetedBlockId } = options;
  if (!targetedBlockId) {
    return createContainer({ layouts, block });
  }
  return layouts.map((layout) => ({
    ...layout,
    children: layout.children?.map((child) => ({
      ...child,
      children: child.children?.reduce((acc, next) => {
        if (next?.block?.id === targetedBlockId) {
          return [...acc, next, createLayoutBlock(block)];
        }
        return acc.concat(next);
      }, [] as LayoutType[]),
    })),
  }));
};
