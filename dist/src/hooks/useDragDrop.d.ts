import * as React from 'react';
import { DragStart, DragUpdate, DropResult } from 'react-beautiful-dnd';
import { Column } from '../types';
export declare function useDragDrop({ columns, defaultColumnMinWidth, isColumnDragDisabled, onColumnsOrderChange, }: {
    columns: Column[];
    defaultColumnMinWidth: number;
    isColumnDragDisabled: boolean;
    onColumnsOrderChange?: (source: {
        index: number;
        key: string;
    }, destination: {
        index: number;
        key: string;
    }) => void;
}): {
    cellRefs: React.MutableRefObject<Map<string, HTMLElement[]>>;
    draggingKey: string | null;
    headerCellRefs: React.MutableRefObject<Map<string, HTMLElement>>;
    onDragEnd: ({ source, destination }: DropResult) => void;
    onDragStart: ({ source }: DragStart) => void;
    onDragUpdate: ({ source, destination }: DragUpdate) => void;
    trackingCellRefs: React.MutableRefObject<Map<string, HTMLElement>>;
};
