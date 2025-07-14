import { Tooltip as TooltipPrimitive } from 'bits-ui';

import Content from './tooltip-content.svelte';
import Trigger from './tooltip-trigger.svelte';

export const Tooltip = {
  Content,
  Portal: TooltipPrimitive.Portal,
  Provider: TooltipPrimitive.Provider,
  Root: TooltipPrimitive.Root,
  Trigger
};
