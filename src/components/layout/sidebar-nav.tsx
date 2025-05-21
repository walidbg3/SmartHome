"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { NAV_ITEMS, SETTINGS_NAV_ITEM, APP_NAME, APP_LOGO_ICON } from "@/lib/constants";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

// Placeholder for role checking, replace with actual Firebase auth logic
const useUserRole = () => {
  return { isAdmin: true }; // Assume admin for scaffold
};

// Sample translations (replace with a proper i18n system)
const translations: Record<string, Record<string, string>> = {
  en: {
    Dashboard: "Dashboard",
    "Device Control": "Device Control",
    "Alert System": "Alert System",
    "Sensor Data": "Sensor Data",
    "Smart Suggestions": "Smart Suggestions",
    "User Management": "User Management",
    Settings: "Settings",
    "Main Navigation": "Main Navigation",
  },
  fr: {
    Dashboard: "Tableau de Bord",
    "Device Control": "Contrôle des Appareils",
    "Alert System": "Système d'Alertes",
    "Sensor Data": "Données Capteurs",
    "Smart Suggestions": "Suggestions IA",
    "User Management": "Gestion Utilisateurs",
    Settings: "Paramètres",
    "Main Navigation": "Navigation Principale",
  },
  ar: {
    Dashboard: "لوحة التحكم",
    "Device Control": "التحكم بالأجهزة",
    "Alert System": "نظام التنبيهات",
    "Sensor Data": "بيانات المستشعرات",
    "Smart Suggestions": "اقتراحات ذكية",
    "User Management": "إدارة المستخدمين",
    Settings: "الإعدادات",
    "Main Navigation": "التنقل الرئيسي",
  },
};

export default function SidebarNav() {
  const pathname = usePathname();
  const { isAdmin } = useUserRole();
  const { currentLanguage } = useLanguage();

  const translate = (key: string) => {
    return translations[currentLanguage.code]?.[key] || key;
  };

  const renderNavItem = (item: NavItem) => {
    if (item.adminOnly && !isAdmin) {
      return null;
    }
    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
    
    return (
      <SidebarMenuItem key={item.title}>
        <Link href={item.href} passHref legacyBehavior prefetch={false}>
          <SidebarMenuButton
            asChild
            isActive={isActive}
            tooltip={{ children: translate(item.title), className: "capitalize" }}
            className="justify-start"
          >
            <a>
              <item.icon className={cn("h-5 w-5", isActive ? "text-sidebar-primary" : "text-sidebar-foreground/80")} />
              <span className="truncate">{translate(item.title)}</span>
            </a>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-sidebar-border group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:py-3.5">
        <APP_LOGO_ICON className="h-7 w-7 text-sidebar-primary flex-shrink-0" />
        <span className="text-xl font-semibold text-sidebar-primary-foreground group-data-[collapsible=icon]:hidden truncate">
          {APP_NAME}
        </span>
      </div>

      <SidebarGroup className="flex-1 overflow-y-auto p-2">
        <SidebarGroupLabel className="group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:h-auto group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:text-center">
          <span className="group-data-[collapsible=icon]:hidden">{translate("Main Navigation")}</span>
        </SidebarGroupLabel>
        <SidebarMenu>
          {NAV_ITEMS.map(renderNavItem)}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup className="p-2 mt-auto border-t border-sidebar-border">
         <SidebarMenu>
          {renderNavItem(SETTINGS_NAV_ITEM)}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
}
