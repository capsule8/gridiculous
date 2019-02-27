import * as React from 'react';

export function useHoverState(): [
  boolean,
  {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  }
] {
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseLeave = React.useCallback(() => {
    setIsHovering(false);
  }, []);

  const handleMouseEnter = React.useCallback(() => {
    setIsHovering(true);
  }, []);

  return [
    isHovering,
    {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  ];
}
