import classnames from 'classnames';
import * as React from 'react';

import { useHoverState } from '../hooks/useHoverState';
import { Column, Datum } from '../types';

import { Cell } from './Cell';
import { RowOverlay } from './RowOverlay';

import styles from './Row.scss';

export type RowClickHandler = (
  e: React.MouseEvent | React.KeyboardEvent,
  o: { rowIndex: number; datum: Datum },
) => void;

export interface RowOverlayChildProps {
  isVisible: boolean;
  datum: Datum;
  rowIndex: number;
}

export type RowOverlayChild = (o: RowOverlayChildProps) => React.ReactNode;

interface Props {
  cellRefs: React.RefObject<Map<string, HTMLElement[]>>;
  columns: Column[];
  columnVisibility: boolean[] | null;
  datum: Datum;
  draggingKey: string | null;
  isLastRow: boolean;
  isSelected: boolean;
  onClick?: RowClickHandler;
  rowIndex: number;
  rowOverlay?: RowOverlayChild;
}

export const Row = React.memo(
  ({
    cellRefs,
    columns,
    columnVisibility,
    datum,
    draggingKey,
    isLastRow,
    isSelected,
    onClick,
    rowIndex,
    rowOverlay,
  }: Props) => {
    const [isHovering, hoverBind] = useHoverState();

    const handleRowClick = React.useCallback(
      (e: React.MouseEvent) => {
        if (onClick) {
          onClick(e, { rowIndex, datum });
        }
      },
      [onClick, rowIndex, datum],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && onClick) {
          onClick(e, { rowIndex, datum });
        }
      },
      [datum, onClick, rowIndex],
    );

    return (
      <div
        {...hoverBind}
        className={classnames(styles.Row, {
          [styles.isSelected]: isSelected,
          [styles.isClickable]: Boolean(onClick),
        })}
        onClick={handleRowClick}
        role="row"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {columns.map((column, columnIndex) => {
          const { key } = column;
          return (
            <Cell
              column={column}
              datum={datum}
              isColumnVisible={Boolean(
                !columnVisibility || columnVisibility[columnIndex],
              )}
              isDragging={key === draggingKey}
              isLastRow={isLastRow}
              key={key}
              ref={(node) => {
                if (!cellRefs.current || !node) {
                  return;
                }
                if (!cellRefs.current.has(key)) {
                  cellRefs.current.set(key, []);
                }
                const columnNodeArray = cellRefs.current.get(key);
                if (columnNodeArray) {
                  columnNodeArray[rowIndex] = node;
                }
              }}
              columnIndex={columnIndex}
              rowIndex={rowIndex}
            />
          );
        })}
        {rowOverlay && (
          <RowOverlay
            columnsLength={columns.length}
            isHoveringRow={isHovering}
            rowIndex={rowIndex}
          >
            {rowOverlay({
              datum,
              isVisible: isHovering,
              rowIndex,
            })}
          </RowOverlay>
        )}
      </div>
    );
  },
);
