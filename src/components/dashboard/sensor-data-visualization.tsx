"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useMemo } from 'react';
import { Thermometer, Droplets, Lightbulb, Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

const generateHistoricalData = (numPoints = 30, minValue = 10, maxValue = 30) => {
  return Array.from({ length: numPoints }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (numPoints - 1 - i));
    return {
      date: date.toLocaleDateString('en-CA'), // YYYY-MM-DD for easier sorting/display
      value: Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue,
    };
  });
};

const temperatureData = generateHistoricalData(30, 15, 28); // degrees C
const humidityData = generateHistoricalData(30, 30, 70); // %
const lightLevelData = generateHistoricalData(30, 100, 800); // lux
const energyConsumptionData = generateHistoricalData(30, 1, 5); // kWh

const chartConfig = {
  value: {
    label: "Value",
  },
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--chart-1))",
  },
  humidity: {
    label: "Humidity (%)",
    color: "hsl(var(--chart-2))",
  },
  lightLevel: {
    label: "Light Level (lux)",
    color: "hsl(var(--chart-3))",
  },
  energy: {
    label: "Energy (kWh)",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type SensorType = 'temperature' | 'humidity' | 'lightLevel' | 'energy';

// Sample translations (replace with a proper i18n system)
const translations: Record<string, Record<string, string>> = {
  en: {
    title: "Sensor Data Visualization",
    description: "View real-time and historical sensor data via interactive charts.",
    selectSensor: "Select Sensor",
    temperature: "Temperature",
    humidity: "Humidity",
    lightLevel: "Light Level",
    energyConsumption: "Energy Consumption",
    last30Days: "Last 30 Days",
    realTime: "Real-time",
    overview: "Sensor Overview",
  },
  fr: {
    title: "Visualisation des Données Capteurs",
    description: "Visualisez les données des capteurs en temps réel et l'historique via des graphiques interactifs.",
    selectSensor: "Sélectionner un Capteur",
    temperature: "Température",
    humidity: "Humidité",
    lightLevel: "Niveau de Luminosité",
    energyConsumption: "Consommation d'Énergie",
    last30Days: "30 Derniers Jours",
    realTime: "Temps Réel",
    overview: "Aperçu des Capteurs",
  },
  ar: {
    title: "عرض بيانات المستشعرات",
    description: "عرض بيانات المستشعرات في الوقت الفعلي والبيانات التاريخية عبر الرسوم البيانية التفاعلية.",
    selectSensor: "اختر المستشعر",
    temperature: "درجة الحرارة",
    humidity: "الرطوبة",
    lightLevel: "مستوى الإضاءة",
    energyConsumption: "استهلاك الطاقة",
    last30Days: "آخر 30 يومًا",
    realTime: "الوقت الحقيقي",
    overview: "نظرة عامة على المستشعرات",
  },
};


export default function SensorDataVisualization() {
  const [selectedSensor, setSelectedSensor] = useState<SensorType>('temperature');
  const { currentLanguage } = useLanguage();
  const t = (key: string) => translations[currentLanguage.code]?.[key] || key;

  const currentData = useMemo(() => {
    switch (selectedSensor) {
      case 'temperature': return temperatureData;
      case 'humidity': return humidityData;
      case 'lightLevel': return lightLevelData;
      case 'energy': return energyConsumptionData;
      default: return [];
    }
  }, [selectedSensor]);

  const currentChartConfigKey = selectedSensor === 'energy' ? 'energy' : selectedSensor;


  const sensorCards = [
    { type: 'temperature' as SensorType, icon: Thermometer, value: `${temperatureData[temperatureData.length-1].value}°C` },
    { type: 'humidity' as SensorType, icon: Droplets, value: `${humidityData[humidityData.length-1].value}%` },
    { type: 'lightLevel' as SensorType, icon: Lightbulb, value: `${lightLevelData[lightLevelData.length-1].value} lux` },
    { type: 'energy' as SensorType, icon: Activity, value: `${energyConsumptionData[energyConsumptionData.length-1].value} kWh` },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </div>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle>{t('overview')}</CardTitle>
          <CardDescription>{t('realTime')} values from key sensors.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sensorCards.map(sensor => (
            <Card key={sensor.type} className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg shadow-sm">
              <sensor.icon className={`h-10 w-10 mb-2 ${
                sensor.type === 'temperature' ? 'text-red-500' :
                sensor.type === 'humidity' ? 'text-blue-500' :
                sensor.type === 'lightLevel' ? 'text-yellow-500' :
                'text-green-500' // energy
              }`} />
              <p className="text-sm font-medium text-muted-foreground">{t(sensor.type)}</p>
              <p className="text-2xl font-semibold text-foreground">{sensor.value}</p>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>{chartConfig[currentChartConfigKey].label} - {t('last30Days')}</CardTitle>
            <CardDescription>Historical data for the selected sensor.</CardDescription>
          </div>
          <Select value={selectedSensor} onValueChange={(value) => setSelectedSensor(value as SensorType)}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder={t('selectSensor')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="temperature">{t('temperature')}</SelectItem>
              <SelectItem value="humidity">{t('humidity')}</SelectItem>
              <SelectItem value="lightLevel">{t('lightLevel')}</SelectItem>
              <SelectItem value="energy">{t('energyConsumption')}</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart data={currentData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString(currentLanguage.code === 'ar' ? 'ar-EG' : currentLanguage.code, { month: 'short', day: 'numeric' })} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Line
                dataKey="value"
                type="monotone"
                stroke={`var(--color-${currentChartConfigKey})`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
