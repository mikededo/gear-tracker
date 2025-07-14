import { getContext, setContext } from 'svelte';

import { IsMobile } from '$lib/hooks/is-mobile.svelte.js';

import { SIDEBAR_KEYBOARD_SHORTCUT } from './constants.js';

type Getter<T> = () => T;

export type SidebarStateProps = {
  /**
   * A getter function that returns the current open state of the sidebar.
   * We use a getter function here to support `bind:open` on the `Sidebar.Provider`
   * component.
   */
  open: Getter<boolean>;

  /**
   * A function that sets the open state of the sidebar. To support `bind:open`, we need
   * a source of truth for changing the open state to ensure it will be synced throughout
   * the sub-components and any `bind:` references.
   */
  setOpen: (open: boolean) => void;
};

class SidebarState {
  readonly props: SidebarStateProps;

  open = $derived.by(() => this.props.open());

  openMobile = $state(false);

  setOpen: SidebarStateProps['setOpen'];

  state = $derived.by(() => (this.open ? 'expanded' : 'collapsed'));

  get isMobile() {
    return this.#isMobile.current;
  }

  #isMobile: IsMobile;

  constructor(props: SidebarStateProps) {
    this.setOpen = props.setOpen;
    this.#isMobile = new IsMobile();
    this.props = props;
  }

  handleShortcutKeydown = (e: KeyboardEvent) => {
    if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this.toggle();
    }
  };

  setOpenMobile = (value: boolean) => {
    this.openMobile = value;
  };

  toggle = () => this.#isMobile.current
    ? (this.openMobile = !this.openMobile)
    : this.setOpen(!this.open);
}

const SYMBOL_KEY = 'scn-sidebar';

/**
 * Instantiates a new `SidebarState` instance and sets it in the context.
 *
 * @param props The constructor props for the `SidebarState` class.
 * @returns  The `SidebarState` instance.
 */
export const setSidebar = (props: SidebarStateProps): SidebarState =>
  setContext(Symbol.for(SYMBOL_KEY), new SidebarState(props));

/**
 * Retrieves the `SidebarState` instance from the context. This is a class instance,
 * so you cannot destructure it.
 * @returns The `SidebarState` instance.
 */
export const useSidebar = (): SidebarState => getContext(Symbol.for(SYMBOL_KEY));
