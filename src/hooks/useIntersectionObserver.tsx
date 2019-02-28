import * as React from 'react';

const MAKE_INVISIBLE_DELAY = 200;

export function useIntersectionObserver({
  root,
  rootMargin,
  target,
  isEnabled,
}: {
  root: HTMLElement | null;
  rootMargin?: string;
  target: React.RefObject<HTMLElement>;
  isEnabled: boolean;
}) {
  const timeout = React.useRef<NodeJS.Timeout | null>(null);
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    if (isEnabled) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (timeout.current) {
              clearTimeout(timeout.current);
            }
            setIntersecting(true);
          } else {
            timeout.current = setTimeout(() => {
              setIntersecting(false);
            }, MAKE_INVISIBLE_DELAY);
          }
        },
        {
          root,
          ...(rootMargin ? { rootMargin } : {}),
        },
      );

      if (target.current) {
        observer.observe(target.current);
      }

      return () => {
        observer.disconnect();
      };
    }
    return () => {};
  }, [isEnabled, root, rootMargin, target]);

  return isIntersecting;
}
