import * as React from 'react';

import { GridNodeContext } from '../context';

export function usePaneScrollState() {
  const gridNode = React.useContext(GridNodeContext);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    if (gridNode) {
      const { scrollLeft, scrollWidth, clientWidth } = gridNode;
      const canScroll = scrollWidth > clientWidth;

      const nextCanScrollLeft = canScroll && scrollLeft > 0;
      const nextCanScrollRight =
        canScroll && scrollWidth - scrollLeft > clientWidth + 4;

      if (nextCanScrollLeft !== canScrollLeft) {
        setCanScrollLeft(nextCanScrollLeft);
      }
      if (nextCanScrollRight !== canScrollRight) {
        setCanScrollRight(nextCanScrollRight);
      }
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, [gridNode, canScrollLeft, canScrollRight]);

  React.useEffect(() => {
    window.addEventListener('resize', checkScroll);
    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  React.useEffect(() => {
    if (gridNode) {
      gridNode.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => {
      if (gridNode) {
        gridNode.removeEventListener('scroll', checkScroll);
      }
    };
  }, [gridNode, checkScroll]);

  return { canScrollLeft, canScrollRight };
}
