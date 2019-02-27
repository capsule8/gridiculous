import isNumber from 'lodash-es/isNumber';

import { Column } from '../types';

export function applyColumnWidthDefaults(column: Column): Column {
  const { defaultWidth, width } = column;
  if (isNumber(width)) {
    // column has width exactly specified
    return column;
  }
  if (isNumber(defaultWidth)) {
    // no width, fallback to column's default width
    return { ...column, width: defaultWidth };
  }
  return column;
}

// assumes applyColumnWithDefaults has been called first and all widths are exactly specified
export function applyColumnMaxWidth(column: Column) {
  const { maxWidth, width } = column as { width: number; maxWidth?: number };
  if (isNumber(maxWidth)) {
    return { ...column, width: Math.min(maxWidth, width) };
  }
  return column;
}

// assumes applyColumnWithDefaults has been called first and all widths are exactly specified
export function applyColumnMinWidth(column: Column) {
  const { minWidth, width } = column as { width: number; minWidth?: number };
  if (isNumber(minWidth)) {
    return { ...column, width: Math.max(minWidth, width) };
  }
  return column;
}
