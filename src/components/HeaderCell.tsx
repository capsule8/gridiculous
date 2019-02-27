import * as React from 'react';
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';

import { HeaderCellWrapped, Props as WrappedProps } from './HeaderCellWrapped';

interface Props {
  columnIndex: number;
  isDragDisabled: boolean;
}

export function HeaderCell(props: Props & WrappedProps) {
  const {
    column,
    columnIndex,
    draggingKey,
    headerCellRefs,
    isDragDisabled,
    isLastChild,
    onWidthChange,
    onWidthChangeEnd,
  } = props;
  const { notDraggable, key } = column;

  const wrappedProps = {
    column,
    draggingKey,
    headerCellRefs,
    isLastChild,
    onWidthChange,
    onWidthChangeEnd,
  };

  if (notDraggable) {
    return <HeaderCellWrapped {...wrappedProps} />;
  }

  return (
    <Draggable
      key={key}
      index={columnIndex}
      draggableId={key}
      isDragDisabled={isDragDisabled}
    >
      {({ draggableProps, dragHandleProps, innerRef: draggableInnerRef }) => {
        const { style } = draggableProps;
        const transform = getAxisLockedTransform(style);
        return (
          <HeaderCellWrapped
            {...wrappedProps}
            dragHandleProps={dragHandleProps}
            draggableInnerRef={draggableInnerRef}
            draggableProps={draggableProps}
            style={style}
            transform={transform}
          />
        );
      }}
    </Draggable>
  );
}

function getAxisLockedTransform(
  style: DraggingStyle | NotDraggingStyle | undefined,
) {
  if (!style || !style.transform) {
    return undefined;
  }
  const parts = style.transform.split(',');
  if (parts.length !== 2) {
    return style.transform;
  }
  return `${parts[0]}, 0)`;
}
