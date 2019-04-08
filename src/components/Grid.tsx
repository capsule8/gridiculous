import isEqual from 'lodash-es/isEqual';
import pick from 'lodash-es/pick';
import * as React from 'react';

import { GridNodeContext, ClassNamesContext, ClassNames } from '../context';

import { GridWrapped, Props as GridProps } from './GridWrapped';

interface GridOuterProps {
  classNames?: ClassNames;
}

export const Grid = React.memo(
  React.forwardRef(
    (
      props: GridProps & GridOuterProps,
      externalRef: React.MutableRefObject<HTMLElement | null>,
    ) => {
      const gridRef = React.useRef<HTMLElement | null>(null);
      return (
        <ClassNamesContext.Provider value={props.classNames || {}}>
          <GridNodeContext.Provider value={gridRef.current}>
            <GridWrapped {...props} ref={externalRef} gridRef={gridRef} />
          </GridNodeContext.Provider>
        </ClassNamesContext.Provider>
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
