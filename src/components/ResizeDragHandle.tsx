import classnames from 'classnames';
import * as React from 'react';

import styles from './ResizeDragHandle.scss';

type WidthChangeHandler = (newWidth: number) => void;

interface Props {
  isHidden: boolean;
  maxWidth?: number;
  minWidth?: number;
  onWidthChange: WidthChangeHandler;
  onWidthChangeEnd: WidthChangeHandler;
  shouldMoveLeftToAvoidOverflow: boolean;
  targetRef: React.RefObject<HTMLElement>;
}

export function ResizeDragHandle({
  isHidden,
  maxWidth = 1000,
  minWidth = 50,
  onWidthChange,
  onWidthChangeEnd,
  shouldMoveLeftToAvoidOverflow,
  targetRef,
}: Props) {
  const ownRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef<boolean>(false);

  const handleMouseDown = React.useCallback(
    (e: MouseEvent) => {
      if (e.button === 0) {
        e.preventDefault();
        e.stopPropagation();
        if (targetRef.current) {
          isDragging.current = true;
        }
      }
    },
    [targetRef, isDragging],
  );

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (isDragging.current && targetRef.current) {
        const { left } = targetRef.current.getBoundingClientRect();
        const newWidth = Math.min(maxWidth, Math.max(minWidth, e.x - left));
        onWidthChange(newWidth);
        const newWidthPx = `${newWidth}px`;
        const targetStyle = targetRef.current.style;
        targetStyle.width = newWidthPx;
        targetStyle.minWidth = newWidthPx;
        targetStyle.maxWidth = newWidthPx;
        document.body.classList.add(styles.colResizing);
      }
    },
    [minWidth, targetRef, isDragging, onWidthChange],
  );

  const handleMouseUp = React.useCallback(() => {
    if (isDragging.current && targetRef.current) {
      onWidthChangeEnd(targetRef.current.clientWidth);
    }
    isDragging.current = false;
    document.body.classList.remove(styles.colResizing);
  }, [targetRef, isDragging, onWidthChangeEnd]);

  React.useEffect(() => {
    if (ownRef.current) {
      ownRef.current.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('blur', handleMouseUp);

      return () => {
        if (ownRef.current) {
          ownRef.current.removeEventListener('mousedown', handleMouseDown);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
          window.removeEventListener('blur', handleMouseUp);
        }
      };
    }
    return () => {};
  }, [ownRef, handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={ownRef}
      className={classnames(styles.ResizeDragHandle, {
        [styles.moveLeftToAvoidOverflow]: shouldMoveLeftToAvoidOverflow,
        [styles.isHidden]: isHidden,
      })}
    >
      <div className={styles.ExtraHandle} />
    </div>
  );
}
