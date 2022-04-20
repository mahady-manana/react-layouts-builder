import { CSSProperties, ReactNode } from 'react';

export interface ILayoutColumn {
  id: any;
  order: number;
  childIds: (string | number)[];
  className?: string;
  width: number;
}
export interface ILayoutSection {
  id: any;
  order: number;
  columns: ILayoutColumn[][];
  className: string;
  width?: string | number;
  contentWidth?: string | number;
  backgroundColor?: string;
  backgroundImage?: string;
  spacing?: number;
}

export interface ILayoutLabels {
  sectionPlaceholder?: string;
  columnPlaceholder?: string;
  itemsPlaceholder?: string;
  settings?: string;
  sectionSettings?: string;
  sectionSpacing?: string;
  contentWidth?: string;
  maxContentWidth?: string;
}

export interface ILayoutContainer {
  data: any[];
  stableDataKey: string;
  renderComponent: (data: any) => ReactNode | any;
  onLayoutChange: (data: ILayoutSection[]) => void;
  layouts?: ILayoutSection[];
  loading?: boolean;
  labels?: ILayoutLabels;
  disableChange?: boolean;
}
