import * as React from 'react';

import { Column } from '../types';
import { spliceColumnOrder } from '../utils/spliceColumnOrder';
interface ColumnLocation {
  index: number;
  key: string;
}

export function useColumnOrderState(
  columns: Column[],
): [string[], (source: ColumnLocation, destination: ColumnLocation) => void] {
  const [columnOrder, setColumnOrder] = React.useState<string[]>(
    columns.map(({ key }) => key),
  );

  const onColumnOrderChange = React.useCallback(
    (source, destination) => {
      setColumnOrder(
        spliceColumnOrder(columnOrder, source.index, destination.index),
      );
    },
    [columnOrder],
  );

  return [columnOrder, onColumnOrderChange];
}
