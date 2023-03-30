import { EnumBlockType, EnumPosition } from '../interfaces/types.js';

var droppablePosition = function droppablePosition(type, targetType) {
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
var isAcceptedPostion = function isAcceptedPostion(type, targetType) {
  if (type === EnumBlockType.BLOCK) {
    return targetType === EnumBlockType.BLOCK || targetType === EnumBlockType.CHILDREN;
  }

  if (type === EnumBlockType.CHILDREN) {
    return targetType === EnumBlockType.CHILDREN || targetType === EnumBlockType.CONTAINER;
  }

  return type === targetType;
};

export { droppablePosition, isAcceptedPostion };
