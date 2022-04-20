import { CSSProperties } from 'react';

export interface IRenderableLayout {
  id: any;
  className?: string;
  order: number;
  columns: IRenderableColumn[][];
  width?: string | number;
  contentWidth?: string | number;
  backgroundColor?: string;
  spacing?: number;
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
