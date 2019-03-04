import * as React from 'react';
import { Column } from '../types';
export declare function useTrackCells({ headerCellRefs, trackingCellRefs, }: {
    headerCellRefs: React.MutableRefObject<Map<string, HTMLElement>>;
    trackingCellRefs: React.MutableRefObject<Map<string, HTMLElement>>;
}): (columns: Column[]) => void;
