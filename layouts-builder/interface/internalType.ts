export enum TargetPlaceEnum {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  ROW_TOP = 'ROW_TOP',
  ROW_BOTTOM = 'ROW_BOTTOM',
  SECTION_TOP = 'SECTION_TOP',
  SECTION_BOTTOM = 'SECTION_BOTTOM',
}

export enum ILayoutTargetEnum {
  SECTION = 'SECTION',
  ROW = 'ROW',
  COL = 'COL',
  ITEM = 'ITEM',
}

export interface SourceType {
  sectionId: string;
  columnId: string;
  rowId: any;
  itemKey: any;
  isSection?: boolean;
}
export interface DestinationType {
  sectionId: string;
  columnId: string;
  rowId: any;
  itemKey?: any;
  targetPlace: TargetPlaceEnum;
}

export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}
