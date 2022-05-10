import { ILayoutSection } from 'layouts-builder/interface';
export declare const changeColumnWidth: (layouts: ILayoutSection[], container: {
    rowId: any;
    sectionId: any;
}, cols: {
    width: number;
    colId: any;
    init: number;
}) => ILayoutSection[];
