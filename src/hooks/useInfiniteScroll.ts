import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  initialItems?: number;
  increment?: number;
}

export function useInfiniteScroll<T>(
  items: T[],
  options: UseInfiniteScrollOptions = {}
) {
  const {
    threshold = 0.1,
    initialItems = 10,
    increment = 10
  } = options;

  const [visibleItems, setVisibleItems] = useState(initialItems);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && visibleItems < items.length) {
          setVisibleItems(prev => Math.min(prev + increment, items.length));
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [items.length, visibleItems, increment, threshold]);

  return {
    visibleItems: items.slice(0, visibleItems),
    containerRef,
    hasMore: visibleItems < items.length
  };
} 