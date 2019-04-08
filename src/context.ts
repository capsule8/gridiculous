import * as React from 'react';

export const GridNodeContext = React.createContext<HTMLElement | null>(null);

export interface ClassNames {
  Cell?: string;
  HeaderCell?: string;
}

export const ClassNamesContext = React.createContext<ClassNames>({});
