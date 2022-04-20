import { ILayoutSection } from '../interface';
export declare const changeColumnWidth: (layouts: ILayoutSection[], columnId: string, width: number, sibling: {
    colId: string;
    width: number;
}[]) => ILayoutSection[];
