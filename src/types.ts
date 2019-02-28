export interface Column {
  defaultWidth?: number;
  key: string;
  hidden?: boolean;
  label?: React.ReactNode; // optional display label for header
  maxWidth?: number;
  minWidth?: number;
  name: string; // used as default label when 'label' isn't specified
  notDraggable?: boolean;
  notResizable?: boolean;
  width?: number;
  renderer?: (o: {
    datum: Datum;
    rowIndex: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any; // TODO: generics?
  }) => React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Datum {} // TODO ?
