"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/language-context';
import LanguageSwitcher from '@/components/layout/language-switcher'; // Re-use for consistency
import { Bell, Palette, Shield, UserCircle } from 'lucide-react';

// Sample translations (replace with a proper i18n system)
const translations: Record<string, Record<string, string>> = {
  en: {
    title: "Settings",
    description: "Manage your account and application preferences.",
    profileSettings: "Profile Settings",
    fullName: "Full Name",
    emailAddress: "Email Address",
    changePassword: "Change Password",
    notificationSettings: "Notification Settings",
    emailNotifications: "Email Notifications",
    pushNotifications: "Push Notifications",
    appearanceSettings: "Appearance Settings",
    darkMode: "Dark Mode",
    language: "Language",
    securitySettings: "Security Settings",
    twoFactorAuth: "Two-Factor Authentication",
    enable2FA: "Enable 2FA",
    saveChanges: "Save Changes",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
  },
  fr: {
    title: "Paramètres",
    description: "Gérez votre compte et les préférences de l'application.",
    profileSettings: "Paramètres du Profil",
    fullName: "Nom Complet",
    emailAddress: "Adresse Email",
    changePassword: "Changer de Mot de Passe",
    notificationSettings: "Paramètres de Notification",
    emailNotifications: "Notifications par Email",
    pushNotifications: "Notifications Push",
    appearanceSettings: "Paramètres d'Apparence",
    darkMode: "Mode Sombre",
    language: "Langue",
    securitySettings: "Paramètres de Sécurité",
    twoFactorAuth: "Authentification à Deux Facteurs",
    enable2FA: "Activer A2F",
    saveChanges: "Enregistrer les Modifications",
    currentPassword: "Mot de Passe Actuel",
    newPassword: "Nouveau Mot de Passe",
    confirmNewPassword: "Confirmer le Nouveau Mot de Passe",
  },
  ar: {
    title: "الإعدادات",
    description: "إدارة حسابك وتفضيلات التطبيق.",
    profileSettings: "إعدادات الملف الشخصي",
    fullName: "الاسم الكامل",
    emailAddress: "البريد الإلكتروني",
    changePassword: "تغيير كلمة المرور",
    notificationSettings: "إعدادات الإشعارات",
    emailNotifications: "إشعارات البريد الإلكتروني",
    pushNotifications: "إشعارات لحظية",
    appearanceSettings: "إعدادات المظهر",
    darkMode: "الوضع الداكن",
    language: "اللغة",
    securitySettings: "إعدادات الأمان",
    twoFactorAuth: "المصادقة الثنائية",
    enable2FA: "تفعيل المصادقة الثنائية",
    saveChanges: "حفظ التغييرات",
    currentPassword: "كلمة المرور الحالية",
    newPassword: "كلمة المرور الجديدة",
    confirmNewPassword: "تأكيد كلمة المرور الجديدة",
  },
};


export default function SettingsPage() {
  const { currentLanguage } = useLanguage();
  const t = (key: string) => translations[currentLanguage.code]?.[key] || key;

  // Placeholder states - in a real app, these would come from user data/settings context
  const [fullName, setFullName] = useState("Nexus User");
  const [email, setEmail] = useState("user@nexushub.com");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Assuming light mode is default

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save logic
    console.log("Settings saved:", { fullName, email, emailNotifications, pushNotifications, isDarkMode });
  };
  
  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    if (typeof document !== 'undefined') {
      if (checked) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };


  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </div>

      <form onSubmit={handleSaveChanges} className="space-y-10">
        {/* Profile Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <UserCircle className="h-6 w-6 text-primary" />
              <CardTitle>{t('profileSettings')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">{t('fullName')}</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t('emailAddress')}</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
            </div>
             <Separator />
             <p className="text-sm font-medium">{t('changePassword')}</p>
             <div className="grid gap-2">
              <Label htmlFor="currentPassword">{t('currentPassword')}</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">{t('newPassword')}</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmNewPassword">{t('confirmNewPassword')}</Label>
              <Input id="confirmNewPassword" type="password" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-primary" />
              <CardTitle>{t('notificationSettings')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">{t('emailNotifications')}</Label>
              <Switch id="emailNotifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pushNotifications">{t('pushNotifications')}</Label>
              <Switch id="pushNotifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Palette className="h-6 w-6 text-primary" />
              <CardTitle>{t('appearanceSettings')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode">{t('darkMode')}</Label>
              <Switch id="darkMode" checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            </div>
            <div className="flex items-center justify-between">
              <Label>{t('language')}</Label>
              <LanguageSwitcher />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle>{t('securitySettings')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="twoFactorAuth">{t('twoFactorAuth')}</Label>
              <Button variant="outline" size="sm">{t('enable2FA')}</Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button type="submit" className="shadow-md">{t('saveChanges')}</Button>
        </div>
      </form>
    </div>
  );
}
