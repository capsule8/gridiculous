import classnames from 'classnames';
import get from 'lodash-es/get';
import * as React from 'react';

import { Column, Datum } from '../types';
import styles from './Cell.scss';

interface Props {
  cellComponent?: CellComponent;
  column: Column;
  columnIndex: number;
  datum: Datum;
  isColumnVisible: boolean;
  isDragging: boolean;
  isLastRow: boolean;
  rowIndex: number;
}

export interface CellComponentProps {
  children: React.ReactNode;
  className: string;
  style: React.CSSProperties;
}

export type CellComponent = (props: CellComponentProps) => React.ReactNode;

export const Cell = React.memo(
  React.forwardRef(
    (
      {
        cellComponent,
        column,
        columnIndex,
        datum,
        isColumnVisible,
        isDragging,
        isLastRow,
        rowIndex,
      }: Props,
      ref: React.RefObject<HTMLDivElement>,
    ) => {
      const { key, renderer } = column;

      const value: React.ReactNode = React.useMemo<React.ReactNode>(() => {
        if (!isColumnVisible) {
          return null;
        }
        const valueFromKey = get(datum, key, null);
        if (renderer) {
          return renderer({ datum, rowIndex, value: valueFromKey });
        }
        return valueFromKey;
      }, [datum, isColumnVisible, renderer, key, rowIndex]);

      const className = classnames(styles.Cell, {
        [styles.isDragging]: isDragging,
        [styles.isLastRow]: isLastRow,
      });

      const style = {
        gridColumn: columnIndex + 1,
        gridRow: rowIndex + 2,
      };

      const children = <div className={styles.Content}>{value}</div>;

      if (cellComponent) {
        return <>{cellComponent({ children, className, style })}</>;
      }

      return (
        <div className={className} ref={ref} style={style}>
          {children}
        </div>
      );
    },
  ),
);
