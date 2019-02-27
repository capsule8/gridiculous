import classnames from 'classnames';
import isUndefined from 'lodash-es/isUndefined';
import * as React from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';

import { Column } from '../types';

import { ResizeDragHandle } from './ResizeDragHandle';

import styles from './HeaderCell.scss';

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

export function HeaderCellWrapped({
  column: { key, width, label, minWidth, name, notResizable },
  dragHandleProps,
  draggableInnerRef,
  draggableProps,
  draggingKey,
  headerCellRefs,
  isLastChild,
  onWidthChange,
  onWidthChangeEnd,
  style,
  transform,
}: Props & DragProps) {
  const ref = React.useRef<HTMLElement | null>(null);

  const isAnyDragging = Boolean(draggingKey);
  const isDragging = key === draggingKey;

  const handleWidthChange = React.useCallback(
    (newWidth: number) => {
      if (onWidthChangeEnd) {
        onWidthChangeEnd(key, newWidth);
      }
    },
    [key, onWidthChangeEnd],
  );
  const handleTransientWidthChange = React.useCallback(
    (newWidth: number) => {
      onWidthChange(key, newWidth);
    },
    [key, onWidthChange],
  );

  const displayLabel = isUndefined(label) ? name : label;

  return (
    <div
      className={classnames(styles.HeaderCell, {
        [styles.isDragging]: isDragging,
        [styles.isAnyDragging]: isAnyDragging,
        [styles.notResizable]: notResizable,
      })}
      ref={(node) => {
        if (draggableInnerRef) {
          draggableInnerRef(node);
        }
        ref.current = node;
        if (node && headerCellRefs.current) {
          headerCellRefs.current.set(key, node);
        }
      }}
      {...draggableProps}
      {...dragHandleProps}
      style={{
        ...style,
        maxWidth: width,
        minWidth: width,
        transform,
        width,
      }}
      title={key}
    >
      <div className={styles.LabelContainer}>
        <div className={styles.Label}>{displayLabel}</div>
      </div>
      {onWidthChangeEnd && !notResizable && (
        <ResizeDragHandle
          isHidden={isAnyDragging}
          minWidth={minWidth}
          shouldMoveLeftToAvoidOverflow={isLastChild}
          targetRef={ref}
          onWidthChange={handleTransientWidthChange}
          onWidthChangeEnd={handleWidthChange}
        />
      )}
    </div>
  );
}
