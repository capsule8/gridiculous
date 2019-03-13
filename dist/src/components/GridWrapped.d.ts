import * as React from 'react';
import { Column, Datum } from '../types';
import { RowClickHandler, RowOverlayChild } from './Row';
export interface Props {
    data: Datum[];
    defaultColumnMinWidth?: number;
    columns: Column[];
    onColumnsOrderChange?: (source: {
        index: number;
        key: string;
    }, destination: {
        index: number;
        key: string;
    }) => void;
    onColumnWidthChange?: (key: string, newWidth: number) => void;
    onRowClick?: RowClickHandler;
    rowKey: string | ((d: Datum) => string);
    rowOverlay?: RowOverlayChild;
    selectedRowIndexes?: Set<number>;
    virtualizationEnabled?: boolean;
}
interface WrappedProps {
    setGridNode: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
export declare const GridWrapped: React.ForwardRefExoticComponent<Props & WrappedProps & React.RefAttributes<HTMLElement>>;
export {};
