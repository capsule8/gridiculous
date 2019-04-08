import * as React from 'react';
import { ClassNames } from '../context';
import { Props as GridProps } from './GridWrapped';
interface GridOuterProps {
    classNames?: ClassNames;
}
export declare const Grid: React.MemoExoticComponent<React.ForwardRefExoticComponent<GridProps & GridOuterProps & React.RefAttributes<HTMLElement>>>;
export {};
