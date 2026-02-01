import { AppContent } from '@/components/auth/app-content';
import { AppHeader } from '@/components/auth/app-header';
import { AppShell } from '@/components/auth/app-shell';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({ children }: AppLayoutProps) {
    return (
        <AppShell>
            <AppHeader />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
