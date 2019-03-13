import * as React from 'react';
import { Column, Datum } from '../types';
interface Props {
    column: Column;
    columnIndex: number;
    datum: Datum;
    isColumnVisible: boolean;
    isDragging: boolean;
    isLastRow: boolean;
    rowIndex: number;
    springProps: any;
}
export declare const Cell: React.MemoExoticComponent<React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>>;
export {};
