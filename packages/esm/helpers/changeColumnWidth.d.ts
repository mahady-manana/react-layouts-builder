import { IColumn, ISection } from "../interface";
export declare const changeColumnWidth: (layouts: ISection[], columnId: string, width: number, sibling: {
    colId: string;
    width: number;
}[]) => {
    columns: IColumn[];
    id: any;
    order: number;
    className: string;
}[];
