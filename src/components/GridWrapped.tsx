import classnames from 'classnames';
import { isString } from 'lodash-es';
import * as React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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
  rowKey?: string | ((d: Datum) => string);
  rowOverlay?: RowOverlayChild;
  selectedRowIndexes?: Set<number>;
  virtualizationEnabled?: boolean;
}

interface WrappedProps {
  gridRef: React.MutableRefObject<HTMLElement | null>;
}

export const GridWrapped = React.forwardRef(
  (
    {
      columns: rawColumns,
      data,
      defaultColumnMinWidth = 200,
      gridRef,
      onColumnsOrderChange,
      onColumnWidthChange,
      onRowClick,
      rowKey = 'id',
      rowOverlay,
      selectedRowIndexes,
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
                  gridRef.current = node;
                  if (externalRef) {
                    externalRef.current = node;
                  }
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
                {data.map((datum, rowIndex) => (
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
                  />
                ))}
                {observerComponent}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  },
);
