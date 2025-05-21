"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import LanguageSwitcher from "./language-switcher";
import UserNav from "./user-nav";
import { useLanguage } from "@/contexts/language-context";

interface HeaderProps {
  title: string;
}

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
    Profile: "Profile",
  },
  fr: {
    Dashboard: "Tableau de Bord",
    "Device Control": "Contrôle des Appareils",
    "Alert System": "Système d'Alertes",
    "Sensor Data": "Données Capteurs",
    "Smart Suggestions": "Suggestions IA",
    "User Management": "Gestion Utilisateurs",
    Settings: "Paramètres",
    Profile: "Profil",
  },
  ar: {
    Dashboard: "لوحة التحكم",
    "Device Control": "التحكم بالأجهزة",
    "Alert System": "نظام التنبيهات",
    "Sensor Data": "بيانات المستشعرات",
    "Smart Suggestions": "اقتراحات ذكية",
    "User Management": "إدارة المستخدمين",
    Settings: "الإعدادات",
    Profile: "الملف الشخصي",
  },
};


export default function Header({ title }: HeaderProps) {
  const { currentLanguage } = useLanguage();
  const translate = (key: string) => {
    return translations[currentLanguage.code]?.[key] || key;
  };
  
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
      <SidebarTrigger /> {/* Removed sm:hidden to make it always visible */}
      <h1 className="text-xl font-semibold text-foreground hidden sm:block">{translate(title)}</h1>
      <div className="ml-auto flex items-center gap-2">
        <LanguageSwitcher />
        <UserNav />
      </div>
    </header>
  );
}
