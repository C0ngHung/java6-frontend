export type SidebarState = 'expanded' | 'collapsed';

const STORAGE_KEY = 'sidebar_state';
const DEFAULT_SIDEBAR_STATE: SidebarState = 'expanded';

const isValidSidebarState = (value: string | null): value is SidebarState => {
  return value === 'expanded' || value === 'collapsed';
};

export const getSidebarState = (): SidebarState => {
  if (typeof window === 'undefined') {
    return DEFAULT_SIDEBAR_STATE;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  return isValidSidebarState(stored) ? stored : DEFAULT_SIDEBAR_STATE;
};

export const setSidebarState = (state: SidebarState): void => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEY, state);
};

