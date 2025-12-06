/**
 * Sidebar state storage utilities
 * Handles persisting sidebar state to localStorage
 */

const STORAGE_KEY = 'sidebar_state';

export const getSidebarState = (): 'expanded' | 'collapsed' => {
  if (typeof window === 'undefined') return 'expanded';

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'collapsed' || stored === 'expanded') {
    return stored;
  }
  return 'expanded';
};

export const setSidebarState = (state: 'expanded' | 'collapsed'): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEY, state);
};

