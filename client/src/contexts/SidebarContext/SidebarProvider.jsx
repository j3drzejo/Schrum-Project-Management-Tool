import { useSidebarViewModel } from '../../viewModels/sidebarViewModel';
import { SidebarContext } from './SidebarContext';

export function SidebarProvider({ children }) {
  const sidebarViewModel = useSidebarViewModel();

  return (
    <SidebarContext.Provider value={sidebarViewModel}>
      {children}
    </SidebarContext.Provider>
  );
}
