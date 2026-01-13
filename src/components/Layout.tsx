import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import TopNav from './TopNav'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative z-0">
          {children}
        </main>
      </div>
    </div>
  )
}

