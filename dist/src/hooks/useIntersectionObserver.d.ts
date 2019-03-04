import * as React from 'react';
export declare function useIntersectionObserver({ root, rootMargin, target, isEnabled, }: {
    root: HTMLElement | null;
    rootMargin?: string;
    target: React.RefObject<HTMLElement>;
    isEnabled: boolean;
}): boolean;
