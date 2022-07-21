import { IRenderableColumn, IRenderableLayout } from 'layouts-builder/interface/renderableInterface';
export declare const useContainerIdentifier: () => {
    isSectionContainer: (section: IRenderableLayout) => boolean;
    isColumnContainer: (cols: IRenderableColumn) => boolean;
};
