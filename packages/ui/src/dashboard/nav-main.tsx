import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@aws-ticket/ui/sidebar";
import type { Icon } from "@tabler/icons-react";

export function NavMain({
  items,
}: {
  items: Array<{
    title: string;
    url: string;
    icon?: Icon;
  }>;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                // onClick={() => navigate({ to: item.url })}
                tooltip={item.title}
              >
                {item.icon && <item.icon />}
                <span className="font-medium">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
