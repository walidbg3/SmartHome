"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Lightbulb, Thermometer, ShieldCheck, Users, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from '@/contexts/language-context';

// Sample translations (replace with a proper i18n system)
const translations: Record<string, Record<string, string>> = {
  en: {
    welcome: "Welcome to Nexus Hub",
    description: "Your central command for smart living. Manage devices, monitor sensors, and get smart suggestions.",
    systemStatus: "System Status",
    onlineDevices: "Online Devices",
    activeAlerts: "Active Alerts",
    energyUsage: "Energy Usage (This Month)",
    quickActions: "Quick Actions",
    manageDevices: "Manage Devices",
    viewAlerts: "View Alerts",
    viewSensorData: "View Sensor Data",
    getSuggestions: "Get Smart Suggestions",
    userManagement: "User Management",
    adminFeature: "(Admin Feature)"
  },
  fr: {
    welcome: "Bienvenue sur Nexus Hub",
    description: "Votre centre de commande centralisé pour une vie intelligente. Gérez vos appareils, surveillez les capteurs et obtenez des suggestions intelligentes.",
    systemStatus: "État du Système",
    onlineDevices: "Appareils en Ligne",
    activeAlerts: "Alertes Actives",
    energyUsage: "Consommation d'Énergie (Ce Mois-ci)",
    quickActions: "Actions Rapides",
    manageDevices: "Gérer les Appareils",
    viewAlerts: "Voir les Alertes",
    viewSensorData: "Voir Données Capteurs",
    getSuggestions: "Obtenir Suggestions IA",
    userManagement: "Gestion Utilisateurs",
    adminFeature: "(Fonction Admin)"
  },
  ar: {
    welcome: "أهلاً بك في نيكسس هاب",
    description: "مركز التحكم المركزي لحياة ذكية. قم بإدارة الأجهزة ومراقبة المستشعرات واحصل على اقتراحات ذكية.",
    systemStatus: "حالة النظام",
    onlineDevices: "الأجهزة المتصلة",
    activeAlerts: "التنبيهات النشطة",
    energyUsage: "استهلاك الطاقة (هذا الشهر)",
    quickActions: "إجراءات سريعة",
    manageDevices: "إدارة الأجهزة",
    viewAlerts: "عرض التنبيهات",
    viewSensorData: "عرض بيانات المستشعرات",
    getSuggestions: "الحصول على اقتراحات ذكية",
    userManagement: "إدارة المستخدمين",
    adminFeature: "(ميزة المسؤول)"
  },
};


export default function DashboardPage() {
  const { currentLanguage } = useLanguage();
  const t = (key: string) => translations[currentLanguage.code]?.[key] || key;

  // Placeholder data
  const onlineDevices = 8;
  const totalDevices = 12;
  const activeAlerts = 3;
  const energyUsagePercentage = 65;


  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('welcome')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('systemStatus')}</CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{`${onlineDevices}/${totalDevices} ${t('onlineDevices')}`}</div>
            <p className="text-xs text-muted-foreground mt-1">{`${activeAlerts} ${t('activeAlerts')}`}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('energyUsage')}</CardTitle>
            <Lightbulb className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{energyUsagePercentage}%</div>
            <Progress value={energyUsagePercentage} className="mt-2 h-2" />
          </CardContent>
        </Card>
        
        <Card className="shadow-lg md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('quickActions')}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <Button variant="outline" asChild><Link href="/devices" prefetch={false}>{t('manageDevices')}</Link></Button>
            <Button variant="outline" asChild><Link href="/alerts" prefetch={false}>{t('viewAlerts')}</Link></Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
         <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('viewSensorData')}</CardTitle>
            <Thermometer className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Visualize real-time and historical data.</p>
          </CardContent>
          <CardFooter>
            <Button asChild><Link href="/sensors" prefetch={false}>{t('viewSensorData')}</Link></Button>
          </CardFooter>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('getSuggestions')}</CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Get AI-powered smart home automation suggestions.</p>
          </CardContent>
          <CardFooter>
            <Button asChild><Link href="/suggestions" prefetch={false}>{t('getSuggestions')}</Link></Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Example of an admin-only section, actual logic depends on auth state */}
      <div className="mt-8">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('userManagement')} <span className="text-xs text-muted-foreground">{t('adminFeature')}</span></CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Manage users and their roles within the system.</p>
          </CardContent>
          <CardFooter>
            <Button asChild><Link href="/users" prefetch={false}>{t('userManagement')}</Link></Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
