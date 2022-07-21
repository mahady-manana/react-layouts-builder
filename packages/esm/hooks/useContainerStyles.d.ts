import { ContainerSource, ILayoutSection } from 'layouts-builder/interface';
import { CSSProperties } from 'react';
export declare const useContainerStyles: () => {
    changeSectionContainerStyles: (layouts: ILayoutSection[], source: ContainerSource, styles?: CSSProperties | undefined) => ILayoutSection[];
    changeColumnContainerStyles: (layouts: ILayoutSection[], { sectionId, rowId, colId }: ContainerSource, styles?: CSSProperties | undefined) => ILayoutSection[];
};
