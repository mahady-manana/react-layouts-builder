import { ContainerSource, ILayoutSection } from 'layouts-builder/interface';
import { CSSProperties } from 'react';
export declare const useContainerStyles: () => {
    changeSectionContainerStyles: (layouts: ILayoutSection[], source: ContainerSource, styles?: CSSProperties) => ILayoutSection[];
    changeColumnContainerStyles: (layouts: ILayoutSection[], { sectionId, rowId, colId }: ContainerSource, styles?: CSSProperties) => ILayoutSection[];
};
