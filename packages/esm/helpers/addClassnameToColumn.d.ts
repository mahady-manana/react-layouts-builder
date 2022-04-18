import { CSSProperties } from 'react';
import { ILayoutSection } from '../interface';
export declare const addClassnameToColumn: (layouts: ILayoutSection[], columnId: string, cssProps: {
    className: string;
    styles?: CSSProperties;
}, siblingCSSProps?: {
    className?: string | undefined;
    styles?: CSSProperties | undefined;
} | undefined) => ILayoutSection[];
