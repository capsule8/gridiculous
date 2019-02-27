import * as React from 'react';
import { Column } from '../types';

export function useTrackCells({
  headerCellRefs,
  trackingCellRefs,
}: {
  headerCellRefs: React.MutableRefObject<Map<string, HTMLElement>>;
  trackingCellRefs: React.MutableRefObject<Map<string, HTMLElement>>;
}) {
  return React.useCallback(
    (columns: Column[]) => {
      columns.forEach(({ key }) => {
        const headerCell = headerCellRefs.current.get(key);
        const trackingCell = trackingCellRefs.current.get(key);
        if (headerCell && trackingCell) {
          const trackedWidth = `${trackingCell.clientWidth}px`;
          headerCell.style.width = trackedWidth;
          headerCell.style.minWidth = trackedWidth;
          headerCell.style.maxWidth = trackedWidth;
        }
      });
    },
    [headerCellRefs, trackingCellRefs],
  );
}
