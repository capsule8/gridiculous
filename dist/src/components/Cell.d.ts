import * as React from 'react';
import { Column, Datum } from '../types';
interface Props {
    cellComponent?: CellComponent;
    column: Column;
    columnIndex: number;
    datum: Datum;
    isColumnVisible: boolean;
    isDragging: boolean;
    isLastRow: boolean;
    rowIndex: number;
}
export interface CellComponentProps {
    children: React.ReactNode;
    className: string;
    style: React.CSSProperties;
}
export declare type CellComponent = (props: CellComponentProps) => React.ReactNode;
export declare const Cell: React.MemoExoticComponent<React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>>;
export {};
