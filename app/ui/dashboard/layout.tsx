import { useState } from 'react'
import DashboardSidebar from './sidebar';
import DashboardTopBar from './topbar';

export default function DashboardPageLayout({ children }: { children: React.ReactNode }) {
  // const [sidebarOpen, setSidebarOpen] = useState(false)

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // }

  return (
    <div>
      <DashboardSidebar sidebarOpen={false} toggleSidebar={false} />
      <div className="lg:pl-48">
        <DashboardTopBar toggleSidebar={false} />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
