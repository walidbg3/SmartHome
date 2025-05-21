"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Edit3, Mail, Shield, UserCircle, CalendarDays, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';

// Sample translations (replace with a proper i18n system)
const translations: Record<string, Record<string, string>> = {
  en: {
    title: "My Profile",
    description: "View and manage your personal information.",
    personalInformation: "Personal Information",
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    memberSince: "Member Since",
    accountSecurity: "Account Security",
    changePassword: "Change Password",
    twoFactorAuthentication: "Two-Factor Authentication",
    status2FA: "Disabled", // Example, make dynamic
    manage2FA: "Manage 2FA",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    cancel: "Cancel",
  },
  fr: {
    title: "Mon Profil",
    description: "Consultez et gérez vos informations personnelles.",
    personalInformation: "Informations Personnelles",
    fullName: "Nom Complet",
    emailAddress: "Adresse Email",
    phoneNumber: "Numéro de Téléphone",
    memberSince: "Membre Depuis",
    accountSecurity: "Sécurité du Compte",
    changePassword: "Changer de Mot de Passe",
    twoFactorAuthentication: "Authentification à Deux Facteurs",
    status2FA: "Désactivée",
    manage2FA: "Gérer A2F",
    editProfile: "Modifier le Profil",
    saveChanges: "Enregistrer",
    cancel: "Annuler",
  },
  ar: {
    title: "ملفي الشخصي",
    description: "عرض وإدارة معلوماتك الشخصية.",
    personalInformation: "المعلومات الشخصية",
    fullName: "الاسم الكامل",
    emailAddress: "البريد الإلكتروني",
    phoneNumber: "رقم الهاتف",
    memberSince: "عضو منذ",
    accountSecurity: "أمان الحساب",
    changePassword: "تغيير كلمة المرور",
    twoFactorAuthentication: "المصادقة الثنائية",
    status2FA: "معطلة",
    manage2FA: "إدارة المصادقة الثنائية",
    editProfile: "تعديل الملف الشخصي",
    saveChanges: "حفظ التغييرات",
    cancel: "إلغاء",
  },
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { currentLanguage } = useLanguage();
  const t = (key: string) => translations[currentLanguage.code]?.[key] || key;

  // Placeholder user data
  const [user, setUser] = useState({
    fullName: "Nexus User",
    email: "user@nexushub.com",
    phoneNumber: "+1 234 567 8900",
    memberSince: "January 1, 2023",
    avatarUrl: "https://placehold.co/128x128.png",
    is2FAEnabled: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to update user profile
    console.log("Profile updated:", user);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-3xl">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('title')}</h1>
          <p className="text-muted-foreground mt-2">{t('description')}</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="shadow-md">
            <Edit3 className="mr-2 h-4 w-4" /> {t('editProfile')}
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col items-center sm:flex-row sm:items-start gap-6 p-6">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-primary shadow-md">
              <AvatarImage src={user.avatarUrl} alt={user.fullName} data-ai-hint="user large_avatar" />
              <AvatarFallback className="text-4xl">{user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow text-center sm:text-left">
              {isEditing ? (
                <Input 
                  name="fullName"
                  value={user.fullName}
                  onChange={handleInputChange}
                  className="text-2xl font-semibold mb-1 w-full"
                />
              ) : (
                <CardTitle className="text-2xl sm:text-3xl">{user.fullName}</CardTitle>
              )}
              <CardDescription className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground">
                <Mail className="h-4 w-4" /> {user.email}
              </CardDescription>
               {isEditing ? (
                 <Input 
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleInputChange}
                  className="text-sm text-muted-foreground mt-1 w-full"
                  placeholder={t('phoneNumber')}
                />
               ) : (
                <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center sm:justify-start gap-1">
                  <Smartphone className="h-4 w-4" /> {user.phoneNumber || 'N/A'}
                </p>
               )}
              <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center sm:justify-start gap-1">
                <CalendarDays className="h-4 w-4" /> {t('memberSince')}: {user.memberSince}
              </p>
            </div>
          </CardHeader>
          
          <Separator />

          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2"><UserCircle className="h-5 w-5 text-primary"/>{t('personalInformation')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullNameStatic" className="text-xs text-muted-foreground">{t('fullName')}</Label>
                  <p id="fullNameStatic" className="text-sm">{user.fullName}</p>
                </div>
                <div>
                  <Label htmlFor="emailStatic" className="text-xs text-muted-foreground">{t('emailAddress')}</Label>
                  <p id="emailStatic" className="text-sm">{user.email}</p>
                </div>
                <div>
                  <Label htmlFor="phoneStatic" className="text-xs text-muted-foreground">{t('phoneNumber')}</Label>
                  <p id="phoneStatic" className="text-sm">{user.phoneNumber || 'N/A'}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2"><Shield className="h-5 w-5 text-primary"/>{t('accountSecurity')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm">{t('changePassword')}</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/settings">{/* Assuming password change is in general settings */}
                      {t('changePassword')}
                    </a>
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">{t('twoFactorAuthentication')}</p>
                    <p className={`text-xs ${user.is2FAEnabled ? 'text-green-600' : 'text-red-600'}`}>
                      {user.is2FAEnabled ? 'Enabled' : t('status2FA')}
                    </p>
                  </div>
                   <Button variant="outline" size="sm" asChild>
                    <a href="/settings">{/* Assuming 2FA management is in general settings */}
                      {t('manage2FA')}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {isEditing && (
          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => { setIsEditing(false); /* TODO: Reset form if needed */ }}>{t('cancel')}</Button>
            <Button type="submit" className="shadow-md">{t('saveChanges')}</Button>
          </div>
        )}
      </form>
    </div>
  );
}
