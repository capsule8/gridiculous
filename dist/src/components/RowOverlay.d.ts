import * as React from 'react';
interface Props {
    children: React.ReactNode;
    columnsLength: number;
    isHoveringRow: boolean;
    rowIndex: number;
}
export declare function RowOverlay({ children, columnsLength, isHoveringRow, rowIndex, }: Props): JSX.Element | null;
export {};
