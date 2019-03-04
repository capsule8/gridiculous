import { Column } from '../types';
interface ColumnLocation {
    index: number;
    key: string;
}
export declare function useColumnOrderState(columns: Column[]): [string[], (source: ColumnLocation, destination: ColumnLocation) => void];
export {};
