import isEqual from 'lodash-es/isEqual';
import pick from 'lodash-es/pick';
import * as React from 'react';

import { GridNodeContext } from '../context';

import { GridWrapped, Props as GridProps } from './GridWrapped';

export const Grid = React.memo(
  React.forwardRef(
    (
      props: GridProps,
      externalRef: React.MutableRefObject<HTMLElement | null>,
    ) => {
      console.log('this will generate new built files');
      const gridRef = React.useRef<HTMLElement | null>(null);
      return (
        <GridNodeContext.Provider value={gridRef.current}>
          <GridWrapped {...props} ref={externalRef} gridRef={gridRef} />
        </GridNodeContext.Provider>
      );
    },
  ),
  (prevProps, nextProps) => {
    const {
      columns: prevColumns,
      data: prevData,
      ...restPrevProps
    } = prevProps;
    const {
      columns: nextColumns,
      data: nextData,
      ...restNextProps
    } = nextProps;
    if (!isEqual(restPrevProps, restNextProps)) {
      return false;
    }
    if (!isEqual(prevColumns, nextColumns)) {
      return false;
    }
    const columnKeys = nextColumns.map(({ key }) => key);
    const filteredPrevData = prevData.map((datum) => pick(datum, columnKeys));
    const filteredNextData = nextData.map((datum) => pick(datum, columnKeys));
    if (!isEqual(filteredPrevData, filteredNextData)) {
      return false;
    }
    return true;
  },
);
