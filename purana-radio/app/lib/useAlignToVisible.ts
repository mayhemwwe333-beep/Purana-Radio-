"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

export type Rect = { top: number; left: number; width: number; height: number };

/**
 * Given several candidate elements (e.g. a spacer in the desktop layout and
 * one in the mobile layout), returns the viewport rect of whichever one is
 * currently visible. Lets a single element — like a live YouTube iframe —
 * be positioned "into" whichever of two differently-laid-out blocks is
 * showing, without ever unmounting/remounting it.
 */
export function useAlignToVisible(
  refs: RefObject<HTMLElement | null>[]
): Rect | null {
  const [rect, setRect] = useState<Rect | null>(null);

  useLayoutEffect(() => {
    function measure() {
      for (const ref of refs) {
        const el = ref.current;
        // offsetParent is null when an element (or an ancestor) has
        // `display: none`, i.e. hidden by the `sm:` breakpoint classes.
        if (el && el.offsetParent !== null) {
          const r = el.getBoundingClientRect();
          setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
          return;
        }
      }
      setRect(null);
    }

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    const ro = new ResizeObserver(measure);
    refs.forEach((ref) => {
      if (ref.current) ro.observe(ref.current);
    });

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);

  return rect;
}
