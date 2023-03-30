import { EnumBlockType, LayoutType, OptionsDrop } from "../interfaces/types";
import { addBlockItem, addBlockToChildren, addChildren } from "./addHelpers";
import { removeBlockLayout, removeItemFirstChildren } from "./removeHelpers";

export const moveContainer = (data: LayoutType[], options: OptionsDrop) => {
  if (!options.item.id || !options.targetItemId) return data;

  const newData = data.reduce((acc, next) => {
    if (next.id === options.item.id) {
      return acc;
    }
    if (next.id === options.targetItemId) {
      if (options.position === "top") {
        return [...acc, options.item, next];
      }
      return [...acc, next, options.item];
    }
    return acc.concat(next);
  }, [] as LayoutType[]);

  return removeEmptyLayouts(newData);
};

export const moveChildren = (data: LayoutType[], options: OptionsDrop) => {
  if (!options.item.id || !options.targetItemId) return data;
  const { item, targetItemId, position } = options;
  const removedItem = removeItemFirstChildren(data, item.id);

  const addToTarget = addChildren(removedItem, item, targetItemId, position);
  return removeEmptyLayouts(addToTarget);
};

export const moveBlock = (data: LayoutType[], options: OptionsDrop) => {
  if (!options.item.id || !options.targetItemId) return data;
  const { item, targetItemId, position } = options;
  const removedItem = removeBlockLayout(data, item.id);

  if (options.targetType === EnumBlockType.CHILDREN) {
    const newData = addBlockToChildren(removedItem, options.item, options);
    return removeEmptyLayouts(newData);
  }
  const addToTarget = addBlockItem(removedItem, item, targetItemId, position);
  return removeEmptyLayouts(addToTarget);
};

export function removeEmptyLayouts(layouts: LayoutType[]): LayoutType[] {
  return layouts
    .map((layout) => {
      if (!layout.children || layout.children.length === 0) {
        if (!layout.block) {
          // layout is empty, return undefined to remove it
          return undefined;
        } else {
          // layout has a block, keep it
          return layout;
        }
      } else {
        // recursively check children
        const newChildren = removeEmptyLayouts(layout.children).filter(
          (child) => child !== undefined
        ) as LayoutType[];
        if (newChildren.length === 0 && !layout.block) {
          // all children were empty, and layout has no block, return undefined to remove it
          return undefined;
        } else {
          // keep layout with non-empty children (and possibly block)
          return {
            ...layout,
            children: newChildren,
          };
        }
      }
    })
    .filter((layout) => layout !== undefined) as LayoutType[];
}
