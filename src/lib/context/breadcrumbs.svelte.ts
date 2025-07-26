import { getContext, setContext } from 'svelte';

const CONTEXT_KEY = 'breadcrumbs';

type Crumb = { name: string; href?: string };
const breadcrumbs = $state({ crumbs: [] as Crumb[] });

export const initCrumbsContext = (crumbs: Crumb[] = []) => {
  breadcrumbs.crumbs = crumbs;
  return setContext(Symbol.for(CONTEXT_KEY), breadcrumbs);
};

export const getCrumbs = () => getContext<typeof breadcrumbs>(Symbol.for(CONTEXT_KEY));

export const pushCrumb = (crumb: Crumb) => {
  breadcrumbs.crumbs = [...breadcrumbs.crumbs, crumb];
};

export const popCrumb = () => {
  breadcrumbs.crumbs = breadcrumbs.crumbs.slice(0, -1);
};
