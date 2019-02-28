import * as React from 'react';

import { GridNodeContext } from '../context';

import styles from './RowOverlay.scss';

interface Props {
  children: React.ReactNode;
  columnsLength: number;
  isHoveringRow: boolean;
  rowIndex: number;
}

export function RowOverlay({
  children,
  columnsLength,
  isHoveringRow,
  rowIndex,
}: Props) {
  const gridNode = React.useContext(GridNodeContext);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleResize = React.useCallback(() => {
    if (ref.current && gridNode) {
      ref.current.style.width = `${gridNode.clientWidth}px`;
    }
  }, [gridNode]);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const recalculatePosition = React.useCallback(() => {
    if (gridNode && gridNode.clientWidth > 0 && ref.current) {
      ref.current.style.left = `${gridNode.scrollLeft}px`;
      ref.current.style.width = `${gridNode.clientWidth}px`;
    }
  }, [gridNode]);

  const scrollInterval = React.useRef<NodeJS.Timeout | null>(null);
  const handleScroll = React.useCallback(() => {
    if (!ref.current) {
      return;
    }

    if (scrollInterval.current) {
      clearTimeout(scrollInterval.current);
    }

    ref.current.style.display = 'none';

    recalculatePosition();

    scrollInterval.current = setTimeout(() => {
      if (ref.current) {
        ref.current.style.display = 'block';
      }
    }, 1);
  }, [recalculatePosition]);

  React.useEffect(() => {
    if (gridNode) {
      gridNode.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (gridNode) {
        gridNode.removeEventListener('scroll', handleScroll);
      }
    };
  }, [gridNode, handleScroll]);

  React.useEffect(() => {
    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (isHoveringRow) {
      recalculatePosition();
    }
  }, [isHoveringRow, recalculatePosition]);

  if (!gridNode) {
    return null;
  }

  return (
    <div
      className={styles.RowOverlay}
      ref={ref}
      style={{
        gridColumnEnd: columnsLength,
        gridRowEnd: rowIndex + 3,
        gridRowStart: rowIndex + 2,
      }}
    >
      {children}
    </div>
  );
}
