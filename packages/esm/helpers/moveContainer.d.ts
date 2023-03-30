import { LayoutType, OptionsDrop } from "../interfaces/types";
export declare const moveContainer: (data: LayoutType[], options: OptionsDrop) => LayoutType[];
export declare const moveChildren: (data: LayoutType[], options: OptionsDrop) => LayoutType[];
export declare const moveBlock: (data: LayoutType[], options: OptionsDrop) => LayoutType[];
export declare function removeEmptyLayouts(layouts: LayoutType[]): LayoutType[];
