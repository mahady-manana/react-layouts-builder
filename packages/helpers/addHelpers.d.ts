import { EnumBlockType, LayoutType, OptionsDrop } from "../interfaces/types";
export declare const addChildren: (data: LayoutType[], children: LayoutType, targetId: string, postion?: string) => {
    children: LayoutType[] | undefined;
    id: string;
    properties?: Record<string, any> | undefined;
    type: EnumBlockType;
    block?: Record<string, any> | undefined;
}[];
export declare const addBlockItem: (data: LayoutType[], block: LayoutType, destinationId: string, position?: string) => LayoutType[];
export declare const addBlockToChildren: (data: LayoutType[], block: LayoutType, options: OptionsDrop) => {
    children: LayoutType[] | undefined;
    id: string;
    properties?: Record<string, any> | undefined;
    type: EnumBlockType;
    block?: Record<string, any> | undefined;
}[];
