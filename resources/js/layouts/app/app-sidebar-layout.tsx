import { AppContent } from '@/components/auth/app-content';
import { AppShell } from '@/components/auth/app-shell';
import { AppSidebar } from '@/components/auth/app-sidebar';
import { AppSidebarHeader } from '@/components/auth/app-sidebar-header';
import type { AppLayoutProps } from '@/types/ui';

export default function AppSidebarLayout({ children }: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader />
                {children}
            </AppContent>
        </AppShell>
    );
}
