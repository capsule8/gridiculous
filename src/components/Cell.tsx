import classnames from 'classnames';
import get from 'lodash-es/get';
import * as React from 'react';
import { animated } from 'react-spring';

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
  springProps: any;
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
        springProps: { dy, rowIndex: animatedRowIndex, ...restSpringProps },
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

      return (
        <animated.div
          className={classnames(styles.Cell, {
            [styles.isDragging]: isDragging,
            [styles.isLastRow]: isLastRow,
          })}
          ref={ref}
          style={{
            gridColumn: columnIndex + 1,
            gridRow: animatedRowIndex.interpolate(
              (i: number) => `${Math.floor(i)}`,
            ),
            ...restSpringProps,
            transform: dy.interpolate((y: any) => `translateY(${y}px)`),
          }}
        >
          <div className={styles.Content}>{value}</div>
        </animated.div>
      );
    },
  ),
);
