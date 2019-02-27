import * as React from 'react';

import { GridNodeContext } from '../context';
import { Column } from '../types';
import { useIntersectionObserver } from './useIntersectionObserver';

function ColumnIntersectionObserver({
  columnIndex,
  dataLength,
  onIsIntersectingChange,
  isEnabled,
}: {
  columnIndex: number;
  dataLength: number;
  onIsIntersectingChange: (
    columnIndex: number,
    isIntersecting: boolean,
  ) => void;
  isEnabled: boolean;
}) {
  const gridNode = React.useContext(GridNodeContext);
  const intersectionRef = React.useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver({
    isEnabled,
    root: gridNode,
    rootMargin: `0px 300px`,
    target: intersectionRef,
  });

  React.useEffect(() => {
    if (isEnabled) {
      onIsIntersectingChange(columnIndex, isIntersecting);
    }
  }, [columnIndex, isIntersecting, onIsIntersectingChange]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      ref={intersectionRef}
      style={{
        backgroundColor: 'yellow',
        gridColumn: columnIndex + 1,
        gridRow: dataLength + 2,
      }}
    />
  );
}

export function useColumnsIntersectionObserver({
  columns,
  dataLength,
  isEnabled,
}: {
  columns: Column[];
  dataLength: number;
  isEnabled: boolean;
}): [boolean[] | null, React.ReactNode | null] {
  const [columnVisibility, setColumnVisibility] = React.useState<boolean[]>([
    ...Array(columns.length).fill(false),
  ]);

  const handleColumnIntersectingChange = React.useCallback(
    (columnIndex: number, isIntersecting: boolean) => {
      setColumnVisibility((prevColumnVisibility) => {
        const nextColumnVisibility = [...prevColumnVisibility];
        nextColumnVisibility[columnIndex] = isIntersecting;
        return nextColumnVisibility;
      });
    },
    [],
  );

  if (!isEnabled) {
    return [null, null];
  }

  return [
    columnVisibility,
    <>
      {columnVisibility.map((_c, columnIndex) => (
        <ColumnIntersectionObserver
          columnIndex={columnIndex}
          dataLength={dataLength}
          isEnabled={isEnabled}
          key={columns[columnIndex].key}
          onIsIntersectingChange={handleColumnIntersectingChange}
        />
      ))}
    </>,
  ];
}
