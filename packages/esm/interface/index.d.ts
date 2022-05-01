import { ReactNode } from 'react';
export declare type ISectionStylesProps = {
    className?: string;
    width?: string | number;
    backgroundColor?: string;
    backgroundImage?: string;
};
export interface ILayoutColumn {
    id: any;
    order: number;
    childIds: (string | number)[];
    className?: string;
    width: number;
}
export interface ILayoutRow {
    id: any;
    width: number | string;
    order: number;
    columns: ILayoutColumn[];
    className?: string;
    isContainer?: boolean;
}
export interface ILayoutSection {
    id: any;
    order: number;
    rows: ILayoutRow[];
    className?: string;
    width?: string | number;
    contentWidth?: string | number;
    backgroundColor?: string;
    backgroundImage?: string;
    container?: boolean;
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
    onClickSection?: (section: ILayoutSection) => void;
}
