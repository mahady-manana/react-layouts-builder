import React, { SyntheticEvent } from 'react';
export default function DragIcon({ width, height, addClass, addStyle, onClick, }: {
    width?: number;
    height?: number;
    addClass?: string;
    addStyle?: React.CSSProperties;
    onClick?: (e: SyntheticEvent<HTMLDivElement>) => void;
}): JSX.Element;
