import sortBy from 'lodash-es/sortBy';

import { Column } from '../types';

export function sortColumns(columns: Column[], columnOrder: string[]) {
  return sortBy(columns, ({ key }) => columnOrder.indexOf(key));
}
