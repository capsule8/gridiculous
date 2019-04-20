/// <reference types="react" />
export interface Column {
    autoWidth?: boolean;
    defaultWidth?: number;
    key: string;
    hidden?: boolean;
    label?: React.ReactNode;
    maxWidth?: number;
    minWidth?: number;
    name: string;
    notDraggable?: boolean;
    notResizable?: boolean;
    width?: number;
    renderer?: (o: {
        datum: Datum;
        rowIndex: number;
        value: any;
    }) => React.ReactNode;
}
export interface Datum {
}
