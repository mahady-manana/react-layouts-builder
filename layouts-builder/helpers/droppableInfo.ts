import { EnumBlockType, EnumPosition } from "../interfaces/types";

export const droppablePosition = (
  type: EnumBlockType,
  targetType: EnumBlockType
) => {
  if (type === EnumBlockType.BLOCK) {
    if (targetType === EnumBlockType.BLOCK) {
      return [EnumPosition.TOP, EnumPosition.BOTTOM];
    }
    if (targetType === EnumBlockType.CHILDREN) {
      return [EnumPosition.LEFT, EnumPosition.RIGHT];
    }
  }
  if (type === EnumBlockType.CHILDREN) {
    if (targetType === EnumBlockType.CONTAINER) {
      return [EnumPosition.TOP, EnumPosition.BOTTOM];
    }
    return [EnumPosition.LEFT, EnumPosition.RIGHT];
  }
  if (type === EnumBlockType.CONTAINER) {
    return [EnumPosition.TOP, EnumPosition.BOTTOM];
  }
  return [EnumPosition.TOP, EnumPosition.BOTTOM];
};

export const isAcceptedPostion = (
  type: EnumBlockType,
  targetType: EnumBlockType
) => {
  if (type === EnumBlockType.BLOCK) {
    return (
      targetType === EnumBlockType.BLOCK ||
      targetType === EnumBlockType.CHILDREN
    );
  }
  if (type === EnumBlockType.CHILDREN) {
    return (
      targetType === EnumBlockType.CHILDREN ||
      targetType === EnumBlockType.CONTAINER
    );
  }
  return type === targetType;
};
