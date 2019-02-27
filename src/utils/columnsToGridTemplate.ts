import isNumber from 'lodash-es/isNumber';

import { Column } from '../types';

interface OverrideWidth {
  key: string;
  newWidth: number;
}

const px = (n: number) => `${n}px`;
const minmax = (defaultMinWidth: number) => `minmax(${defaultMinWidth}px, 1fr)`;

export function columnsToGridTemplate(
  columns: Column[],
  defaultColumnMinWidth: number,
  override?: OverrideWidth,
) {
  return columns
    .map(({ key: k, width }, i) => {
      if (override && k === override.key) {
        return px(override.newWidth);
      }
      if (i === columns.length - 1) {
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
