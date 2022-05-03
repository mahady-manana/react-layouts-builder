import { ILayoutSection } from 'layouts-builder/interface';
export declare const changeColumnWidth: (layouts: ILayoutSection[], container: {
    rowId: any;
    sectionId: any;
}, cols: {
    width: any;
    colId: any;
}[]) => {
    rows: {
        columns: {
            width: any;
            id: any;
            order: number;
            childIds: (string | number)[];
            className?: string | undefined;
        }[];
        id: any;
        width: string | number;
        order: number;
        className?: string | undefined;
        isContainer?: boolean | undefined;
    }[];
    id: any;
    order: number;
    className?: string | undefined;
    width?: string | number | undefined;
    contentWidth?: string | number | undefined;
    backgroundColor?: string | undefined;
    backgroundImage?: string | undefined;
    container?: boolean | undefined;
}[];
