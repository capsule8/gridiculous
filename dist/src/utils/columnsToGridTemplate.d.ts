import { Column } from '../types';
interface OverrideWidth {
    key: string;
    newWidth: number;
}
export declare function columnsToGridTemplate(columns: Column[], defaultColumnMinWidth: number, override?: OverrideWidth): string;
export {};
