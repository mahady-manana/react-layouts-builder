import { CSSProperties } from 'react';

export interface IRenderableLayout {
  id: any;
  className?: string;
  styles?: CSSProperties
  order: number;
  rows: IRenderableRow[];
  width?: string | number;
  contentWidth?: string | number;
  backgroundColor?: string;
  backgroundImage?: string;
  spacing?: number;
  container?: boolean;
}
export interface IRenderableRow {
  id: any;
  className?: string;
  order: number;
  columns: IRenderableColumn[];
  width: number | string;
  isContainer?: boolean;
  styles?: CSSProperties
}
export interface IRenderableColumn {
  id: any;
  className?: string;
  order: number;
  items: any[];
  styles?: CSSProperties;
  width: number;
}
export interface IRenderableColmumnItem {
  id: any;
  data: any;
}
