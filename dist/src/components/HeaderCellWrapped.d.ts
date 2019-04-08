import * as React from 'react';
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { Column } from '../types';
interface DragProps {
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
    draggableInnerRef?: (element?: HTMLElement | null | undefined) => void;
    draggableProps?: DraggableProvidedDraggableProps;
    style?: DraggingStyle | NotDraggingStyle;
    transform?: string;
}
export interface Props {
    column: Column;
    draggingKey: string | null;
    headerCellRefs: React.MutableRefObject<Map<string, HTMLElement>>;
    isLastChild: boolean;
    onWidthChange: (key: string, newWidth: number) => void;
    onWidthChangeEnd?: (key: string, newWidth: number) => void;
}
export declare const HeaderCellWrapped: ({ column: { key, width, label, minWidth, name, notResizable }, dragHandleProps, draggableInnerRef, draggableProps, draggingKey, headerCellRefs, isLastChild, onWidthChange, onWidthChangeEnd, style, transform, }: Props & DragProps) => JSX.Element;
export {};
