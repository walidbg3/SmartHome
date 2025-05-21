"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lightbulb, Thermometer, Tv, Fan, PlusCircle, Droplets, Power } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input'; // Added import
import { useLanguage } from '@/contexts/language-context';

interface Device {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'tv' | 'fan' | 'custom';
  icon: React.ElementType;
  status: boolean; // true for on, false for off
  brightness?: number; // For lights
  temperature?: number; // For thermostats
  color?: string; // For smart lights
}

const initialDevices: Device[] = [
  { id: '1', name: 'Living Room Light', type: 'light', icon: Lightbulb, status: true, brightness: 75, color: '#FFD700' },
  { id: '2', name: 'Bedroom Thermostat', type: 'thermostat', icon: Thermometer, status: true, temperature: 22 },
  { id: '3', name: 'Smart TV', type: 'tv', icon: Tv, status: false },
  { id: '4', name: 'Ceiling Fan', type: 'fan', icon: Fan, status: true },
  { id: '5', name: 'Kitchen Downlights', type: 'light', icon: Lightbulb, status: false, brightness: 50 },
  { id: '6', name: 'Humidifier', type: 'custom', icon: Droplets, status: false },
];

// Sample translations (replace with a proper i18n system)
const translations: Record<string, Record<string, string>> = {
  en: {
    title: "Device Control Panel",
    description: "Manage and control your smart home devices.",
    addDevice: "Add New Device",
    on: "On",
    off: "Off",
    brightness: "Brightness",
    temperature: "Temperature (°C)",
    color: "Color",
  },
  fr: {
    title: "Panneau de Contrôle des Appareils",
    description: "Gérez et contrôlez vos appareils domestiques intelligents.",
    addDevice: "Ajouter un Appareil",
    on: "Allumé",
    off: "Éteint",
    brightness: "Luminosité",
    temperature: "Température (°C)",
    color: "Couleur",
  },
  ar: {
    title: "لوحة التحكم بالأجهزة",
    description: "إدارة والتحكم في أجهزتك المنزلية الذكية.",
    addDevice: "إضافة جهاز جديد",
    on: "تشغيل",
    off: "إيقاف",
    brightness: "السطوع",
    temperature: "الحرارة (مئوية)",
    color: "اللون",
  },
};


export default function DeviceControlPanel() {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const { currentLanguage } = useLanguage();
  const t = (key: string) => translations[currentLanguage.code]?.[key] || key;

  const toggleDeviceStatus = (id: string) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === id ? { ...device, status: !device.status } : device
      )
    );
    // TODO: Add API call to update device status on backend
  };

  const handleBrightnessChange = (id: string, value: number[]) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === id ? { ...device, brightness: value[0] } : device
      )
    );
  };

  const handleTemperatureChange = (id:string, value: number[]) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === id ? { ...device, temperature: value[0] } : device
      )
    );
  };
  
  const handleColorChange = (id: string, color: string) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === id ? { ...device, color } : device
      )
    );
  };


  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('title')}</h1>
            <p className="text-muted-foreground mt-2">{t('description')}</p>
        </div>
        <Button variant="default" className="shadow-md">
          <PlusCircle className="mr-2 h-5 w-5" />
          {t('addDevice')}
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {devices.map(device => (
          <Card key={device.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
              <div className="flex items-center gap-3">
                <device.icon className={`h-8 w-8 ${device.status ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <CardTitle className="text-lg">{device.name}</CardTitle>
                  <CardDescription className={`text-sm ${device.status ? 'text-green-500' : 'text-red-500'} font-medium`}>
                    {device.status ? t('on') : t('off')}
                  </CardDescription>
                </div>
              </div>
               <Switch
                  id={`switch-${device.id}`}
                  checked={device.status}
                  onCheckedChange={() => toggleDeviceStatus(device.id)}
                  aria-label={`Toggle ${device.name}`}
                />
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              {device.type === 'light' && device.brightness !== undefined && device.status && (
                <div className="space-y-2">
                  <Label htmlFor={`brightness-${device.id}`}>{t('brightness')}: {device.brightness}%</Label>
                  <Slider
                    id={`brightness-${device.id}`}
                    defaultValue={[device.brightness]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleBrightnessChange(device.id, value)}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Brightness"
                  />
                </div>
              )}
              {device.type === 'light' && device.color && device.status && (
                <div className="space-y-2">
                  <Label htmlFor={`color-${device.id}`}>{t('color')}</Label>
                  <Input 
                    type="color" 
                    id={`color-${device.id}`} 
                    value={device.color} 
                    onChange={(e) => handleColorChange(device.id, e.target.value)} 
                    className="w-full h-10 p-1"
                    aria-label="Color picker"
                  />
                </div>
              )}
              {device.type === 'thermostat' && device.temperature !== undefined && device.status && (
                 <div className="space-y-2">
                  <Label htmlFor={`temp-${device.id}`}>{t('temperature')}: {device.temperature}°C</Label>
                  <Slider
                    id={`temp-${device.id}`}
                    defaultValue={[device.temperature]}
                    max={30}
                    min={10}
                    step={0.5}
                    onValueChange={(value) => handleTemperatureChange(device.id, value)}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Temperature"
                  />
                </div>
              )}
              {device.type !== 'light' && device.type !== 'thermostat' && (
                <div className="text-sm text-muted-foreground h-16 flex items-center justify-center">
                  {/* Placeholder for other device specific controls */}
                  {device.status ? `Controlling ${device.name}...` : `${device.name} is off.`}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
