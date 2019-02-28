import * as React from 'react';
import { DragStart, DragUpdate, DropResult } from 'react-beautiful-dnd';

import { GridNodeContext } from '../context';
import { Column } from '../types';
import { columnsToGridTemplate } from '../utils/columnsToGridTemplate';
import { sortColumns } from '../utils/sortColumns';
import { spliceColumnOrder } from '../utils/spliceColumnOrder';
import { useTrackCells } from './useTrackCells';

export function useDragDrop({
  columns,
  defaultColumnMinWidth,
  isColumnDragDisabled,
  onColumnsOrderChange,
}: {
  columns: Column[];
  defaultColumnMinWidth: number;
  isColumnDragDisabled: boolean;
  onColumnsOrderChange?: (
    source: { index: number; key: string },
    destination: { index: number; key: string },
  ) => void;
}) {
  const gridNode = React.useContext(GridNodeContext);
  const [draggingKey, setDraggingKey] = React.useState<string | null>(null);

  const columnOrder = React.useMemo(() => columns.map(({ key }) => key), [
    columns,
  ]);

  const cellRefs = React.useRef<Map<string, HTMLElement[]>>(new Map());
  const headerCellRefs = React.useRef<Map<string, HTMLElement>>(new Map());
  const trackingCellRefs = React.useRef<Map<string, HTMLElement>>(new Map());

  const handleDragEnd = React.useCallback(
    ({ source, destination }: DropResult) => {
      setDraggingKey(null);

      if (isColumnDragDisabled) {
        return;
      }

      if (destination) {
        const sourceColumn = columns[source.index] && columns[source.index];
        const destinationColumn = columns[destination.index];

        if (
          onColumnsOrderChange &&
          source.index !== destination.index &&
          sourceColumn &&
          destinationColumn
        ) {
          onColumnsOrderChange(
            { index: source.index, key: sourceColumn.key },
            { index: destination.index, key: destinationColumn.key },
          );
        }
      }

      columnOrder.forEach((key, i) => {
        const nodesInColumn = cellRefs.current.get(key);
        if (nodesInColumn) {
          nodesInColumn.forEach((cellNode) => {
            cellNode.style.gridColumn = (i + 1).toString();
          });
        }
      });

      if (gridNode) {
        const newColumnOrder = destination
          ? spliceColumnOrder(columnOrder, source.index, destination.index)
          : columns.map(({ key }) => key);

        const sortedColumns = sortColumns(columns, newColumnOrder);

        gridNode.style.gridTemplateColumns = columnsToGridTemplate(
          sortedColumns,
          defaultColumnMinWidth,
        );
      }
    },
    [
      columns,
      columnOrder,
      isColumnDragDisabled,
      onColumnsOrderChange,
      gridNode,
      defaultColumnMinWidth,
    ],
  );

  const trackCells = useTrackCells({
    headerCellRefs,
    trackingCellRefs,
  });

  const handleDragUpdate = React.useCallback(
    ({ source, destination }: DragUpdate) => {
      if (isColumnDragDisabled) {
        return;
      }

      if (destination && gridNode) {
        const newColumnOrder = spliceColumnOrder(
          columnOrder,
          source.index,
          destination.index,
        );

        const sortedColumns = sortColumns(columns, newColumnOrder);

        if (gridNode) {
          gridNode.style.gridTemplateColumns = columnsToGridTemplate(
            sortedColumns,
            defaultColumnMinWidth,
          );
        }

        sortedColumns.forEach(({ key }, i) => {
          const gridColumn = (i + 1).toString();

          const nodesInColumn = cellRefs.current.get(key);
          if (nodesInColumn) {
            nodesInColumn.forEach((cellNode) => {
              cellNode.style.gridColumn = gridColumn;
            });
          }

          const trackingCell = trackingCellRefs.current.get(key);
          if (trackingCell) {
            trackingCell.style.gridColumn = gridColumn;
          }
        });

        trackCells(sortedColumns);
      }
    },
    [
      columnOrder,
      columns,
      defaultColumnMinWidth,
      gridNode,
      isColumnDragDisabled,
      trackCells,
      trackingCellRefs,
    ],
  );

  const handleDragStart = React.useCallback(
    ({ source }: DragStart) => {
      if (isColumnDragDisabled) {
        return;
      }

      setDraggingKey(columns[source.index].key);
    },
    [columns, isColumnDragDisabled],
  );

  return {
    cellRefs,
    draggingKey,
    headerCellRefs,
    onDragEnd: handleDragEnd,
    onDragStart: handleDragStart,
    onDragUpdate: handleDragUpdate,
    trackingCellRefs,
  };
}
