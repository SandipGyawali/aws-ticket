import { Outlet } from '@tanstack/react-router'
import { AppSidebar } from '@aws-ticket/ui/dashboard/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@aws-ticket/ui/sidebar'
import { Separator } from '@aws-ticket/ui/separator'
import {
  IconDashboard,
  IconFile,
  IconGitBranch,
  IconListDetails,
} from '@tabler/icons-react'

export function RootLayout() {
  const data = {
    user: {
      name: 'sandip',
      email: 'sandip@gmail.com',
      avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
      {
        title: 'Home',
        url: '/',
        icon: IconDashboard,
      },
      {
        title: 'Attendees',
        url: '/attendees',
        icon: IconListDetails,
      },
      {
        title: 'Sessions',
        url: '/session',
        icon: IconGitBranch,
      },
      {
        title: 'Uploads',
        url: '/uploads',
        icon: IconFile,
      },
    ],
  }

  return (
    <SidebarProvider>
      <AppSidebar data={data} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 border-b items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
