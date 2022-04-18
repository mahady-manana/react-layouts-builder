import { CSSProperties, ReactNode } from 'react';

export interface ILayoutColumn {
  sectionKey: string;
  columnCount: number;
  dataKey: string;
  data: any;
}
export interface ILayout {
  sectionKey: string;
  sectionOrder: number;
  columnsDataKeys: string[];
  dataKey: string;
}

export interface ILayoutColumn {
  id: any;
  order: number;
  childIds: (string | number)[];
  className?: string;
  styles?: CSSProperties;
  width: number;
}
export interface ILayoutSection {
  id: any;
  order: number;
  columns: ILayoutColumn[];
  className: string;
}

export interface ILayoutContainer {
  data: any[];
  stableDataKey: string;
  renderComponent: (data: any) => ReactNode | JSX.Element;
  onLayoutChange: (data: ILayoutSection[]) => void;
  layouts?: ILayoutSection[];
  loading?: boolean;
}
