import { useState } from 'react'
import DashboardSidebar from './sidebar';
import DashboardTopBar from './topbar';
import DashboardFooter from './footer';

// dashboard page structure
export default function DashboardPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardSidebar sidebarOpen={false} toggleSidebar={false} />
      <div className="lg:pl-48">
        <DashboardTopBar toggleSidebar={false} />
        <div className="flex flex-col min-h-dvh justify-between">
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <DashboardFooter />
        </div>
      </div>
    </div>
  )
}
