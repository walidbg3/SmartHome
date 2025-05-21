"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Edit, Trash2, BellRing, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Badge } from '@/components/ui/badge';

interface Alert {
  id: string;
  name: string;
  condition: string; // e.g., "Temperature > 25°C"
  device: string; // e.g., "Living Room Thermostat"
  severity: 'low' | 'medium' | 'high';
  isEnabled: boolean;
  lastTriggered?: string;
}

const initialAlerts: Alert[] = [
  { id: '1', name: 'High Temperature Alert', condition: 'Temperature > 28°C', device: 'Bedroom Thermostat', severity: 'high', isEnabled: true, lastTriggered: '2023-10-25 14:30' },
  { id: '2', name: 'Front Door Open', condition: 'Door Sensor == Open for > 5min', device: 'Front Door Sensor', severity: 'medium', isEnabled: true },
  { id: '3', name: 'Low Humidity', condition: 'Humidity < 30%', device: 'Living Room Sensor', severity: 'low', isEnabled: false, lastTriggered: '2023-10-20 09:15' },
];

// Sample translations (replace with a proper i18n system)
const translations: Record<string, Record<string, string>> = {
  en: {
    title: "Customizable Alert System",
    description: "Configure and manage custom alerts for your smart home.",
    addAlert: "Add New Alert",
    alertName: "Alert Name",
    condition: "Condition",
    device: "Device/Sensor",
    severity: "Severity",
    status: "Status",
    actions: "Actions",
    enabled: "Enabled",
    disabled: "Disabled",
    low: "Low",
    medium: "Medium",
    high: "High",
    lastTriggered: "Last Triggered",
    notTriggered: "Not triggered yet",
    saveAlert: "Save Alert",
    cancel: "Cancel",
    editAlert: "Edit Alert",
    confirmDelete: "Are you sure you want to delete this alert?",
    delete: "Delete",
  },
  fr: {
    title: "Système d'Alertes Personnalisées",
    description: "Configurez et gérez les alertes personnalisées pour votre maison intelligente.",
    addAlert: "Ajouter une Alerte",
    alertName: "Nom de l'Alerte",
    condition: "Condition",
    device: "Appareil/Capteur",
    severity: "Sévérité",
    status: "Statut",
    actions: "Actions",
    enabled: "Activée",
    disabled: "Désactivée",
    low: "Faible",
    medium: "Moyenne",
    high: "Élevée",
    lastTriggered: "Dernier Déclenchement",
    notTriggered: "Pas encore déclenchée",
    saveAlert: "Enregistrer l'Alerte",
    cancel: "Annuler",
    editAlert: "Modifier l'Alerte",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer cette alerte ?",
    delete: "Supprimer",
  },
  ar: {
    title: "نظام التنبيهات القابل للتخصيص",
    description: "قم بتكوين وإدارة التنبيهات المخصصة لمنزلك الذكي.",
    addAlert: "إضافة تنبيه جديد",
    alertName: "اسم التنبيه",
    condition: "الشرط",
    device: "الجهاز/المستشعر",
    severity: "الخطورة",
    status: "الحالة",
    actions: "الإجراءات",
    enabled: "مفعل",
    disabled: "معطل",
    low: "منخفضة",
    medium: "متوسطة",
    high: "عالية",
    lastTriggered: "آخر تفعيل",
    notTriggered: "لم يتم التفعيل بعد",
    saveAlert: "حفظ التنبيه",
    cancel: "إلغاء",
    editAlert: "تعديل التنبيه",
    confirmDelete: "هل أنت متأكد أنك تريد حذف هذا التنبيه؟",
    delete: "حذف",
  },
};

export default function AlertSystem() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const { currentLanguage } = useLanguage();
  const t = (key: string) => translations[currentLanguage.code]?.[key] || key;

  const handleToggleEnable = (id: string) => {
    setAlerts(prev => prev.map(alert => alert.id === id ? { ...alert, isEnabled: !alert.isEnabled } : alert));
    // TODO: API call to update status
  };

  const handleSaveAlert = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newAlertData = {
      name: formData.get('name') as string,
      condition: formData.get('condition') as string,
      device: formData.get('device') as string,
      severity: formData.get('severity') as Alert['severity'],
    };

    if (editingAlert) {
      setAlerts(prev => prev.map(a => a.id === editingAlert.id ? { ...a, ...newAlertData } : a));
    } else {
      setAlerts(prev => [...prev, { ...newAlertData, id: String(Date.now()), isEnabled: true }]);
    }
    // TODO: API call to save/update alert
    setIsDialogOpen(false);
    setEditingAlert(null);
  };

  const openEditDialog = (alert: Alert) => {
    setEditingAlert(alert);
    setIsDialogOpen(true);
  };
  
  const openNewDialog = () => {
    setEditingAlert(null);
    setIsDialogOpen(true);
  };

  const handleDeleteAlert = (id: string) => {
    // Basic confirm, ideally use an AlertDialog
    if (confirm(t('confirmDelete'))) {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
      // TODO: API call to delete alert
    }
  };

  const severityBadge = (severity: Alert['severity']) => {
    switch (severity) {
      case 'low': return <Badge variant="outline" className="text-green-600 border-green-600">{t('low')}</Badge>;
      case 'medium': return <Badge variant="outline" className="text-yellow-600 border-yellow-600">{t('medium')}</Badge>;
      case 'high': return <Badge variant="destructive">{t('high')}</Badge>;
      default: return <Badge variant="secondary">{severity}</Badge>;
    }
  }


  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('title')}</h1>
            <p className="text-muted-foreground mt-2">{t('description')}</p>
        </div>
        <Button onClick={openNewDialog} className="shadow-md">
          <PlusCircle className="mr-2 h-5 w-5" /> {t('addAlert')}
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] hidden md:table-cell"><BellRing className="h-5 w-5 text-muted-foreground"/></TableHead>
                <TableHead>{t('alertName')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('condition')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('device')}</TableHead>
                <TableHead>{t('severity')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="hidden md:table-cell">
                     <AlertTriangle className={`h-5 w-5 ${alert.isEnabled && alert.severity === 'high' ? 'text-destructive' : alert.isEnabled && alert.severity === 'medium' ? 'text-yellow-500' : 'text-muted-foreground' }`} />
                  </TableCell>
                  <TableCell className="font-medium">{alert.name}</TableCell>
                  <TableCell className="hidden lg:table-cell">{alert.condition}</TableCell>
                  <TableCell className="hidden md:table-cell">{alert.device}</TableCell>
                  <TableCell>{severityBadge(alert.severity)}</TableCell>
                  <TableCell>
                    <Switch
                      checked={alert.isEnabled}
                      onCheckedChange={() => handleToggleEnable(alert.id)}
                      aria-label={`Toggle ${alert.name}`}
                    />
                     <span className="ml-2 text-xs text-muted-foreground">{alert.isEnabled ? t('enabled') : t('disabled')}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(alert)} className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAlert(alert.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { setIsDialogOpen(isOpen); if (!isOpen) setEditingAlert(null); }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingAlert ? t('editAlert') : t('addAlert')}</DialogTitle>
            <DialogDescription>
              {editingAlert ? `Modify the details for '${editingAlert.name}'.` : "Create a new alert for your system."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveAlert} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">{t('alertName')}</Label>
              <Input id="name" name="name" defaultValue={editingAlert?.name} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="condition" className="text-right">{t('condition')}</Label>
              <Input id="condition" name="condition" defaultValue={editingAlert?.condition} placeholder="e.g. Temperature > 25" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="device" className="text-right">{t('device')}</Label>
              <Input id="device" name="device" defaultValue={editingAlert?.device} placeholder="e.g. Living Room Sensor" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="severity" className="text-right">{t('severity')}</Label>
              <Select name="severity" defaultValue={editingAlert?.severity || 'medium'}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{t('low')}</SelectItem>
                  <SelectItem value="medium">{t('medium')}</SelectItem>
                  <SelectItem value="high">{t('high')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>{t('cancel')}</Button>
              <Button type="submit">{t('saveAlert')}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
