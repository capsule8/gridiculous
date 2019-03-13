import classnames from 'classnames';
// import difference from 'lodash-es/difference';
import isString from 'lodash-es/isString';
import * as React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTransition } from 'react-spring';

import { useColumnsIntersectionObserver } from '../hooks/useColumnIntersectionObserver';
import { useDragDrop } from '../hooks/useDragDrop';
import { usePaneScrollState } from '../hooks/usePaneScrollState';
import { Column, Datum } from '../types';
import { columnsToGridTemplate } from '../utils/columnsToGridTemplate';
import {
  applyColumnMaxWidth,
  applyColumnMinWidth,
  applyColumnWidthDefaults,
} from '../utils/columnWidthHelpers';

import { Header } from './Header';
import { Row, RowClickHandler, RowOverlayChild } from './Row';

import styles from './Grid.scss';

export interface Props {
  data: Datum[];
  defaultColumnMinWidth?: number;
  columns: Column[];
  onColumnsOrderChange?: (
    source: { index: number; key: string },
    destination: { index: number; key: string },
  ) => void;
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

export const GridWrapped = React.forwardRef(
  (
    {
      columns: rawColumns,
      data,
      defaultColumnMinWidth = 200,
      onColumnsOrderChange,
      onColumnWidthChange,
      onRowClick,
      rowKey,
      rowOverlay,
      selectedRowIndexes,
      setGridNode,
      virtualizationEnabled,
    }: Props & WrappedProps,
    externalRef: React.MutableRefObject<HTMLElement | null>,
  ) => {
    const columns: Column[] = React.useMemo(
      () =>
        rawColumns
          .filter(({ hidden }) => !hidden)
          .map(applyColumnWidthDefaults)
          .map(applyColumnMinWidth)
          .map(applyColumnMaxWidth),
      [rawColumns],
    );

    const isColumnDragDisabled = !onColumnsOrderChange;

    const { canScrollLeft, canScrollRight } = usePaneScrollState();

    const {
      cellRefs,
      draggingKey,
      headerCellRefs,
      onDragEnd,
      onDragStart,
      onDragUpdate,
      trackingCellRefs,
    } = useDragDrop({
      columns,
      defaultColumnMinWidth,
      isColumnDragDisabled,
      onColumnsOrderChange,
    });

    const [
      columnVisibility,
      observerComponent,
    ] = useColumnsIntersectionObserver({
      columns,
      dataLength: data.length,
      isEnabled: Boolean(virtualizationEnabled),
    });

    const rowKeyAccessor = React.useCallback(
      (d: Datum) => (isString(rowKey) ? d[rowKey] : rowKey(d)),
      [rowKey],
    );

    const ids = data.map(rowKeyAccessor);
    const prevIds = usePreviousValue(ids) || [];

    const prevIndexes = ids.map((id) => prevIds.indexOf(id));

    const transitionData = data.map((datum, index) => ({
      datum,
      index,
      prevIndex: prevIndexes[index],
    }));

    const transitions = useTransition(transitionData, ids, {
      from: ({ index }) => ({ opacity: 0, dy: -10, rowIndex: index + 2 }),
      leave: { opacity: 0, dy: 10 },
      enter: ({ index }) => ({
        opacity: 1,
        dy: 0,
        rowIndex: index + 2,
      }),
      update: ({ index, prevIndex }) => {
        console.log({ index, prevIndex });
        if (index !== prevIndex) {
          return {
            opacity: 1,
            dy: (index - prevIndex) * 72,
            rowIndex: index + 2,
          };
        }

        return {
          opacity: 1,
          dy: 0,
          rowIndex: index + 2,
        };
      },
    });

    console.log({ transitions });

    return (
      <div className={styles.GridPane}>
        <DragDropContext
          onDragEnd={onDragEnd}
          onDragUpdate={onDragUpdate}
          onDragStart={onDragStart}
        >
          <Droppable droppableId="droppable" direction="horizontal">
            {({ innerRef: droppableInnerRef, droppableProps }) => (
              <div
                className={classnames(styles.Grid, {
                  [styles.canScrollLeft]: canScrollLeft,
                  [styles.canScrollRight]: canScrollRight,
                })}
                ref={(node) => {
                  droppableInnerRef(node);
                  if (externalRef) {
                    externalRef.current = node;
                  }
                  setGridNode(node);
                }}
                {...droppableProps}
                style={{
                  gridTemplateColumns: columnsToGridTemplate(
                    columns,
                    defaultColumnMinWidth,
                  ),
                }}
              >
                <Header
                  cellRefs={cellRefs}
                  columns={columns}
                  defaultColumnMinWidth={defaultColumnMinWidth}
                  draggingKey={draggingKey}
                  headerCellRefs={headerCellRefs}
                  trackingCellRefs={trackingCellRefs}
                  onColumnWidthChange={onColumnWidthChange}
                  isColumnDragDisabled={isColumnDragDisabled}
                />
                {transitions.map(
                  ({ item: { datum }, props: springProps }, rowIndex) => (
                    <Row
                      cellRefs={cellRefs}
                      columns={columns}
                      columnVisibility={columnVisibility}
                      datum={datum}
                      draggingKey={draggingKey}
                      isLastRow={rowIndex === data.length - 1}
                      isSelected={Boolean(
                        selectedRowIndexes && selectedRowIndexes.has(rowIndex),
                      )}
                      key={rowKeyAccessor(datum)}
                      onClick={onRowClick}
                      rowIndex={rowIndex}
                      rowOverlay={rowOverlay}
                      springProps={springProps}
                    />
                  ),
                )}
                {observerComponent}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  },
);

function usePreviousValue<T>(value: T) {
  const ref = React.useRef<null | T>(null);

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
