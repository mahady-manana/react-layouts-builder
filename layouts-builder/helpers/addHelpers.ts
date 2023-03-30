import {
  EnumBlockType,
  EnumPosition,
  LayoutType,
  OptionsDrop,
} from "../interfaces/types";
import { v4 } from "uuid";

export const addChildren = (
  data: LayoutType[],
  children: LayoutType,
  targetId: string,
  postion?: string
) => {
  return data.map((item) => {
    return {
      ...item,
      children: item.children?.reduce((childs, nextChild) => {
        if (nextChild.id === targetId) {
          if (postion === "top") {
            return [...childs, children, nextChild];
          }
          return [...childs, nextChild, children];
        }
        return childs.concat(nextChild);
      }, [] as LayoutType[]),
    };
  });
};
export const addBlockItem = (
  data: LayoutType[],
  block: LayoutType,
  destinationId: string,
  position?: string
): LayoutType[] => {
  return data.map((item) => {
    return {
      ...item,
      children: item.children?.map((it) => ({
        ...it,
        children: it.children?.reduce((acc, next) => {
          if (next.id.toString() === destinationId) {
            if (position === "top") {
              return [...acc, block, next];
            }
            return [...acc, next, block];
          }
          return acc.concat(next);
        }, [] as LayoutType[]),
      })),
    };
  });
};

export const addBlockToChildren = (
  data: LayoutType[],
  block: LayoutType,
  options: OptionsDrop
) => {
  const create: LayoutType = {
    id: v4(),
    type: EnumBlockType.CHILDREN,
    properties: {},
    children: [block],
  };
  return data.map((item) => {
    return {
      ...item,
      children: item.children?.reduce((childs, nextChild) => {
        if (nextChild.id === options.targetItemId) {
          if (options.position === EnumPosition.LEFT) {
            return [...childs, create, nextChild];
          }
          return [...childs, nextChild, create];
        }
        return childs.concat(nextChild);
      }, [] as LayoutType[]),
    };
  });
};
