import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { ILayoutSection } from '../interface';
import { SourceType } from '../interface/internalType';
import { IRenderableColumn } from '../interface/renderableInterface';
import '../index.css';
interface LayoutRowContainerProps {
    stableKey: string;
    disabled?: boolean;
    columns: IRenderableColumn[];
    layouts: ILayoutSection[];
    sectionId: string;
    rowId: string;
    setActualLayout: Dispatch<SetStateAction<ILayoutSection[]>>;
    renderComponent: (item: any, source: SourceType) => ReactNode;
    onFocusItem?: (source: SourceType) => void;
}
export declare const LayoutRowContainer: FC<LayoutRowContainerProps>;
export {};
