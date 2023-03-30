import { EnumBlockType, EnumPosition } from "../interfaces/types";
export declare const droppablePosition: (type: EnumBlockType, targetType: EnumBlockType) => EnumPosition[];
export declare const isAcceptedPostion: (type: EnumBlockType, targetType: EnumBlockType) => boolean;
