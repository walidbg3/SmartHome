import type { ReactNode } from 'react';
import { Sidebar, SidebarInset } from '@/components/ui/sidebar';
import SidebarNav from '@/components/layout/sidebar-nav';
import Header from '@/components/layout/header'; // To be created
import { LanguageProvider } from '@/contexts/language-context'; // To be created

// This layout will apply to all routes within the (app) group
export default function AppLayout({ children }: { children: ReactNode }) {
  // Placeholder for current page title, this would ideally come from route metadata
  // For now, we'll pass a generic title or derive it if possible.
  // For simplicity, let's assume Header component can determine its title or receives it.
  // We'll pass a placeholder title here.
  
  return (
    <LanguageProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar collapsible="icon" side="left" variant="sidebar">
          <SidebarNav />
        </Sidebar>
        <SidebarInset className="flex flex-col">
          {/* The Header title will be dynamic based on the page, handled within Header or passed */}
          {/* For now, a placeholder. This needs a more robust solution for dynamic titles. */}
          <Header title="Dashboard" /> 
          <main className="flex-1 overflow-auto p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </LanguageProvider>
  );
}
