import * as React from 'react';
declare type WidthChangeHandler = (newWidth: number) => void;
interface Props {
    isHidden: boolean;
    maxWidth?: number;
    minWidth?: number;
    onWidthChange: WidthChangeHandler;
    onWidthChangeEnd: WidthChangeHandler;
    shouldMoveLeftToAvoidOverflow: boolean;
    targetRef: React.RefObject<HTMLElement>;
}
export declare function ResizeDragHandle({ isHidden, maxWidth, minWidth, onWidthChange, onWidthChangeEnd, shouldMoveLeftToAvoidOverflow, targetRef, }: Props): JSX.Element;
export {};
