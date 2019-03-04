import * as React from 'react';
import { Column } from '../types';
export declare function useColumnsIntersectionObserver({ columns, dataLength, isEnabled, }: {
    columns: Column[];
    dataLength: number;
    isEnabled: boolean;
}): [boolean[] | null, React.ReactNode | null];
