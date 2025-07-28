import * as React from "react"

import { SearchForm } from "@/components/search-form"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  
  navMain: [
    {
      title: "Tags",
      url: "#",
      items: [
        {
          title: "Funny",
          url: "#",
        },
        {
          title: "Coding",
          url: "#",
        },

        {
          title: "Holidays",
          url: "#",
        },
        {
          title: "Hotels",
          url: "#",
          isActive: true,
        },
        {
          title: "Restaurents",
          url: "#",
        },
        {
          title: "Study Material",
          url: "#",
        },
      ],
    },

    ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
