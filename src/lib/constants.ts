import type { NavItem, Language } from '@/types';
import {
  LayoutDashboard,
  ToggleRight,
  BellRing,
  LineChart,
  Sparkles,
  Users,
  Settings,
  Languages,
  Hexagon
} from 'lucide-react';

export const APP_NAME = "Nexus Hub";
export const APP_LOGO_ICON = Hexagon;

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Device Control',
    href: '/devices',
    icon: ToggleRight,
  },
  {
    title: 'Alert System',
    href: '/alerts',
    icon: BellRing,
  },
  {
    title: 'Sensor Data',
    href: '/sensors',
    icon: LineChart,
  },
  {
    title: 'Smart Suggestions',
    href: '/suggestions',
    icon: Sparkles,
  },
  {
    title: 'User Management',
    href: '/users',
    icon: Users,
    adminOnly: true, // Example: This item would only be shown to admins
  },
];

export const SETTINGS_NAV_ITEM: NavItem = {
  title: 'Settings',
  href: '/settings',
  icon: Settings,
};

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];
