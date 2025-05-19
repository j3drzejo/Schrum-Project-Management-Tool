import { createContext, useContext } from 'react';
import { useSidebarViewModel } from '../viewModels/sidebarViewModel';

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const sidebarViewModel = useSidebarViewModel();

  return (
    <SidebarContext.Provider value={sidebarViewModel}>
      {children}
    </SidebarContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
