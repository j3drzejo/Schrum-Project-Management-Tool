import { createContext, useContext } from 'react';
import { useSidebarViewModel } from '../viewModels/sidebarViewModel';

// Create a context for the sidebar view model
const SidebarContext = createContext(null);

// Create a provider component
export function SidebarProvider({ children }) {
  const sidebarViewModel = useSidebarViewModel();

  return (
    <SidebarContext.Provider value={sidebarViewModel}>
      {children}
    </SidebarContext.Provider>
  );
}

// Create a custom hook to use the sidebar context
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
