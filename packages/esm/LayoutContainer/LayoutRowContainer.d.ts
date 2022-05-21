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
    isLastSection?: boolean;
    isFirstSection?: boolean;
    dragActive?: boolean;
    needRowTarget?: {
        top: boolean;
        bottom: boolean;
    };
    imageSizeFnLoader?: (items: any) => {
        width?: number;
        height?: number;
    } | undefined;
    setActualLayout: Dispatch<SetStateAction<ILayoutSection[]>>;
    setDragActive: Dispatch<SetStateAction<boolean>>;
    renderComponent: (item: any, source: SourceType) => ReactNode;
    onFocusItem?: (source: SourceType) => void;
    onLayoutChange: (layouts: ILayoutSection[]) => void;
    imageCheckerFn?: (items: boolean) => boolean;
    onImageResizeFinished?: (items: any, width: number) => void;
}
export declare const LayoutRowContainer: FC<LayoutRowContainerProps>;
export {};
