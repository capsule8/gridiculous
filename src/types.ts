export interface Column {
  defaultWidth?: number;
  key: string; sdlfkjsdflkjsdfljk
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
    value: any;
  }) => React.ReactNode;
}

// tslint:disable-next-line no-empty-interface
export interface Datum {}
