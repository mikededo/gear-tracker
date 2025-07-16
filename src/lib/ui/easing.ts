import type { SlideParams, TransitionConfig } from 'svelte/transition';

import { slide as baseSlide } from 'svelte/transition';

export const fadeSlide = (node: Element, options: SlideParams): TransitionConfig => {
  const slide = baseSlide(node, options);

  return {
    ...options,
    css: (t, u) => `${slide.css!(t, u)}; opacity: ${t}`
  };
};
