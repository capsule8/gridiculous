import isUndefined from 'lodash-es/isUndefined';
import * as React from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';

import { Column } from '../types';

import { ResizeDragHandle } from './ResizeDragHandle';

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

// &.isAnyDragging:not(.notResizable) {
//   background-color: white;
//   border-right: 1px solid $gray;
// }

// &.notResizable:hover {
//   border: 1px solid rgba(0, 0, 0, 0);
// }

// &.isDragging {
//   box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;
//   transition: 150ms opacity ease-in, 300ms box-shadow ease-in;
//   opacity: 0.7;
// }

// classnames(styles.HeaderCell, {
//   [styles.isDragging]: isDragging,
//   [styles.isAnyDragging]: isAnyDragging,
//   [styles.notResizable]: notResizable,
// })

const isDraggingStyles = css`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;
  transition: 150ms opacity ease-in, 300ms box-shadow ease-in;
  opacity: 0.7;
`;

const isAnyDraggingStyles = css`
  background-color: white;
  border-right: 1px solid $gray;
`;

const notResizableStyles = css`
  &:hover {
    border: 1px solid rgba(0, 0, 0, 0);
  }
`;

const HeaderCellContainer = styled.div<{
  isDragging: boolean;
  isAnyDragging: boolean;
  notResizable?: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  grid-row: 1;
  border: 1px solid rgba(0, 0, 0, 0);
  opacity: 1;
  transition: 150 opacity ease-out, 250ms box-shadow ease-out;

  &:hover {
    transition: 250ms box-shadow ease-out;
    border-right: 1px solid gray;
    border-left: 1px solid gray;
  }

  ${({ isDragging }) => (isDragging ? isDraggingStyles : '')}

  ${({ isAnyDragging, notResizable }) =>
    isAnyDragging && !notResizable ? isAnyDraggingStyles : ''}

  ${({ notResizable }) => (notResizable ? notResizableStyles : '')}
`;

export const HeaderCellWrapped = ({
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
}: Props & DragProps) => {
  const ref = React.useRef<HTMLElement | null>(null);

  const isAnyDragging = Boolean(draggingKey);

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
    <HeaderCellContainer
      isDragging={key === draggingKey}
      isAnyDragging={isAnyDragging}
      notResizable={notResizable}
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
      <LabelContainer>
        <Label>{displayLabel}</Label>
      </LabelContainer>
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
    </HeaderCellContainer>
  );
};

const LabelContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
