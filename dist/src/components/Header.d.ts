import * as React from 'react';
import { Column } from '../types';
interface Props {
    cellRefs: React.MutableRefObject<Map<string, HTMLElement[]>>;
    columns: Column[];
    defaultColumnMinWidth: number;
    draggingKey: string | null;
    headerCellRefs: React.MutableRefObject<Map<string, HTMLElement>>;
    isColumnDragDisabled: boolean;
    onColumnWidthChange?: (key: string, newWidth: number) => void;
    trackingCellRefs: React.MutableRefObject<Map<string, HTMLElement>>;
}
export declare function Header({ columns: rawColumns, defaultColumnMinWidth, draggingKey, headerCellRefs, isColumnDragDisabled, onColumnWidthChange, trackingCellRefs, }: Props): JSX.Element;
export {};
