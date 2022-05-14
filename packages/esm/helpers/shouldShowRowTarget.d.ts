import { IRenderableLayout, IRenderableRow } from 'layouts-builder/interface/renderableInterface';
interface Options {
    rows: IRenderableRow[];
    rowIndex: number;
    sectionIndex: number;
}
export declare const needRowTarget: (layouts: IRenderableLayout[], currentRow: IRenderableRow, { rows, rowIndex, sectionIndex }: Options) => {
    top: boolean;
    bottom: boolean;
};
export {};
