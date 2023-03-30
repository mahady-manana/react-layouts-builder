import { ReactNode } from "react";

export type OptionsDrop = {
  item: LayoutType;
  type?: EnumBlockType;
  targetItemId: string;
  position?: EnumPosition;
  targetType?: EnumBlockType;
};
export type LayoutType = {
  id: string;
  properties?: Record<string, any>;
  type: EnumBlockType;
  children?: LayoutType[];
  block?: Record<string, any>;
};

export type LayoutBuilderProps = {
  layouts: LayoutType[];
  onLayoutChange: (layouts: LayoutType[]) => void;
  loading?: ReactNode;
};
export enum EnumBlockType {
  CONTAINER = "container",
  CHILDREN = "row",
  BLOCK = "block",
}

export enum EnumPosition {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
}
