import classnames from 'classnames';
import get from 'lodash-es/get';
import * as React from 'react';

import { ClassNamesContext } from '../context';
import { Column, Datum } from '../types';
import styles from './Cell.scss';

interface Props {
  column: Column;
  columnIndex: number;
  datum: Datum;
  isColumnVisible: boolean;
  isDragging: boolean;
  isLastRow: boolean;
  rowIndex: number;
}

export const Cell = React.memo(
  React.forwardRef(
    (
      {
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
      const classNames = React.useContext(ClassNamesContext);

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

      return (
        <div
          className={classnames(
            styles.Cell,
            {
              [styles.isDragging]: isDragging,
              [styles.isLastRow]: isLastRow,
            },
            classNames.Cell,
          )}
          ref={ref}
          style={{
            gridColumn: columnIndex + 1,
            gridRow: rowIndex + 2,
          }}
        >
          <div className={styles.Content}>{value}</div>
        </div>
      );
    },
  ),
);
