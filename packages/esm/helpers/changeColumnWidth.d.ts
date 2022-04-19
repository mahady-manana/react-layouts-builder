import { ILayoutColumn, ILayoutSection } from '../interface';
export declare const changeColumnWidth: (layouts: ILayoutSection[], columnId: string, width: number, sibling: {
    colId: string;
    width: number;
}[]) => {
    columns: ILayoutColumn[];
    id: any;
    order: number;
    className: string;
    width?: string | number | undefined;
    contentWidth?: string | number | undefined;
    backgroundColor?: string | undefined;
    spacing?: number | undefined;
}[];
