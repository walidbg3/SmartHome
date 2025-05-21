import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
  external?: boolean;
  adminOnly?: boolean; // For role-based access control hint
};

export type Language = {
  code: string;
  name: string;
  flag?: string; // Optional: can be emoji or image path
};
