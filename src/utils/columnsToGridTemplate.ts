import isNumber from 'lodash-es/isNumber';

import { Column } from '../types';

interface OverrideWidth {
  key: string;
  newWidth: number;
}

const px = (n: number) => `${n}px`;
const minmax = (defaultMinWidth: number) =>
  `minmax(${px(defaultMinWidth)}, 1fr)`;

export function columnsToGridTemplate(
  columns: Column[],
  defaultColumnMinWidth: number,
  override?: OverrideWidth,
) {
  const isThereAnAutoWidthColumn = columns.some(({ autoWidth }) =>
    Boolean(autoWidth),
  );

  return columns
    .map(({ autoWidth, key: k, width }, i) => {
      if (override && k === override.key) {
        return px(override.newWidth);
      }
      if (
        autoWidth ||
        (!isThereAnAutoWidthColumn && i === columns.length - 1)
      ) {
        if (isNumber(width)) {
          return minmax(width);
        }
        return minmax(defaultColumnMinWidth);
      }
      if (isNumber(width)) {
        return px(width);
      }
      return minmax(defaultColumnMinWidth);
    })
    .join(' ');
}
