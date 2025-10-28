"use client";
import { SidebarInset, SidebarProvider } from "@aws-ticket/ui/sidebar";
import { AppSidebar } from "@aws-ticket/ui/dashboard/app-sidebar";
import { SiteHeader } from "@aws-ticket/ui/dashboard/site-header";
import { IconDashboard, IconListDetails } from "@tabler/icons-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = {
    user: {
      name: "sandip",
      email: "sandip@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
      },
      {
        title: "Sessions",
        url: "/sessions",
        icon: IconListDetails,
      },
    ],
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar data={data} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="px-4 lg:px-6 pb-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
