import { CSSProperties, ReactNode } from 'react';
import { SourceType } from './internalType';
export interface ContainerSource {
    sectionId: string;
    rowId?: string;
    colId?: string;
}
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
    styles?: CSSProperties;
    width: number;
}
export interface ILayoutRow {
    id: any;
    width: number | string;
    order: number;
    columns: ILayoutColumn[];
    className?: string;
    isContainer?: boolean;
    styles?: CSSProperties;
}
export interface ILayoutSection {
    id: any;
    order: number;
    rows: ILayoutRow[];
    className?: string;
    width?: string | number;
    contentWidth?: number;
    backgroundColor?: string;
    backgroundImage?: string;
    container?: boolean;
    styles?: CSSProperties;
    defaultWidth?: number | string;
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
    isMobile?: boolean;
    stableDataKey: string;
    staticComponent?: boolean;
    maxWidth?: number | string;
    maxColumns?: number;
    pageWidth?: number;
    colResize?: boolean;
    renderComponent: (data: any, layout: SourceType, index?: number) => ReactNode | any;
    onLayoutChange: (data: ILayoutSection[]) => void;
    layouts?: ILayoutSection[];
    loading?: boolean;
    labels?: ILayoutLabels;
    disableChange?: boolean;
    imageSizeFnLoader?: (items: any) => {
        width?: number;
        height?: number;
    } | undefined;
    onClickSection?: (source: ContainerSource) => void;
    onClickColumn?: (soruce: ContainerSource) => void;
    onFocusItem?: (section: SourceType) => void;
    imageCheckerFn?: (item: any) => boolean;
    onImageResizeFinished?: (items: any, sizes: {
        width?: number;
        height?: number;
    }) => void;
}
