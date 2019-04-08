import * as React from 'react';
import { Column, Datum } from '../types';
import { CellComponent } from './Cell';
export declare type RowClickHandler = (e: React.MouseEvent | React.KeyboardEvent, o: {
    rowIndex: number;
    datum: Datum;
}) => void;
export interface RowOverlayChildProps {
    isVisible: boolean;
    datum: Datum;
    rowIndex: number;
}
export declare type RowOverlayChild = (o: RowOverlayChildProps) => React.ReactNode;
interface Props {
    cellComponent?: CellComponent;
    cellRefs: React.RefObject<Map<string, HTMLElement[]>>;
    columns: Column[];
    columnVisibility: boolean[] | null;
    datum: Datum;
    draggingKey: string | null;
    isLastRow: boolean;
    isSelected: boolean;
    onClick?: RowClickHandler;
    rowIndex: number;
    rowOverlay?: RowOverlayChild;
}
export declare const Row: React.MemoExoticComponent<({ cellComponent, cellRefs, columns, columnVisibility, datum, draggingKey, isLastRow, isSelected, onClick, rowIndex, rowOverlay, }: Props) => JSX.Element>;
export {};
