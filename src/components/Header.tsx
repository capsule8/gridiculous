import classnames from 'classnames';
import * as React from 'react';

import { GridNodeContext } from '../context';
import { useTrackCells } from '../hooks/useTrackCells';
import { Column } from '../types';
import { columnsToGridTemplate } from '../utils/columnsToGridTemplate';

import { HeaderCell } from './HeaderCell';

import styles from './Header.scss';

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

export function Header({
  columns: rawColumns,
  defaultColumnMinWidth,
  draggingKey,
  headerCellRefs,
  isColumnDragDisabled,
  onColumnWidthChange,
  trackingCellRefs,
}: Props) {
  const gridNode = React.useContext(GridNodeContext);

  const columns = rawColumns.map((column) => {
    const trackingCell = trackingCellRefs.current.get(column.key);
    if (!trackingCell) {
      return column;
    }
    return { ...column, width: trackingCell.clientWidth };
  });

  const trackCells = useTrackCells({
    headerCellRefs,
    trackingCellRefs,
  });

  const handleResize = React.useCallback(() => {
    trackCells(rawColumns);
  }, [trackCells, rawColumns]);

  React.useEffect(() => {
    trackCells(rawColumns);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [trackCells, rawColumns, handleResize]);

  const handleColumnWidthChange = React.useCallback(
    (key: string, newWidth: number) => {
      if (gridNode) {
        gridNode.style.gridTemplateColumns = columnsToGridTemplate(
          rawColumns,
          defaultColumnMinWidth,
          {
            key,
            newWidth,
          },
        );
      }
      trackCells(rawColumns);
    },
    [gridNode, trackCells, rawColumns, defaultColumnMinWidth],
  );

  return (
    <>
      <div
        className={classnames(styles.Header, {
          [styles.isAnyDragging]: Boolean(draggingKey),
        })}
      >
        {columns.map((column, i) => (
          <HeaderCell
            key={column.key}
            column={column}
            columnIndex={i}
            draggingKey={draggingKey}
            isDragDisabled={isColumnDragDisabled}
            isLastChild={i === columns.length - 1}
            onWidthChange={handleColumnWidthChange}
            onWidthChangeEnd={onColumnWidthChange}
            headerCellRefs={headerCellRefs}
          />
        ))}
      </div>

      {columns.map(({ key }) => (
        <div
          key={key}
          style={{ gridRowStart: -2, gridRowEnd: -1 }}
          ref={(node) => {
            if (node) {
              trackingCellRefs.current.set(key, node);
            }
          }}
        />
      ))}
    </>
  );
}
