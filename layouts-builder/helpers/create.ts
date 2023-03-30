import { v4 } from "uuid";
import { EnumBlockType, LayoutType } from "../interfaces/types";

export const createContainer = (block: any): LayoutType => {
  return {
    id: v4(),
    type: EnumBlockType.CONTAINER,
    children: [
      {
        id: v4(),
        type: EnumBlockType.CHILDREN,
        children: [
          {
            id: v4(),
            type: EnumBlockType.BLOCK,
            block,
          },
        ],
      },
    ],
  };
};

export const createTopChildren = (block: any): LayoutType => {
  return {
    id: v4(),
    type: EnumBlockType.CHILDREN,
    children: [
      {
        id: v4(),
        type: EnumBlockType.BLOCK,
        block,
      },
    ],
  };
};

export const createLayoutBlock = (block: any): LayoutType => {
  return {
    id: v4(),
    type: EnumBlockType.BLOCK,
    block,
  };
};
