"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Sparkles, User } from 'lucide-react';
import { smartSuggestionChatbot, type SmartSuggestionChatbotInput, type SmartSuggestionChatbotOutput } from '@/ai/flows/smart-suggestion-chatbot';
import { useLanguage } from '@/contexts/language-context';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Sample translations (replace with a proper i18n system)
const translations: Record<string, Record<string, string>> = {
  en: {
    title: "AI Smart Suggestions",
    description: "Chat with our AI to get personalized smart home automation suggestions.",
    inputPlaceholder: "Ask for a smart home suggestion...",
    send: "Send",
    welcomeMessage: "Hello! How can I help you automate your smart home today?",
    loading: "Thinking...",
    error: "Sorry, I couldn't get a suggestion right now. Please try again.",
  },
  fr: {
    title: "Suggestions Intelligentes IA",
    description: "Discutez avec notre IA pour obtenir des suggestions personnalisées d'automatisation de maison intelligente.",
    inputPlaceholder: "Demandez une suggestion domotique...",
    send: "Envoyer",
    welcomeMessage: "Bonjour ! Comment puis-je vous aider à automatiser votre maison connectée aujourd'hui ?",
    loading: "Réflexion en cours...",
    error: "Désolé, je n'ai pas pu obtenir de suggestion pour le moment. Veuillez réessayer.",
  },
  ar: {
    title: "اقتراحات ذكية بالذكاء الاصطناعي",
    description: "تحدث مع الذكاء الاصطناعي الخاص بنا للحصول على اقتراحات مخصصة لأتمتة المنزل الذكي.",
    inputPlaceholder: "اطلب اقتراحًا للمنزل الذكي...",
    send: "إرسال",
    welcomeMessage: "مرحباً! كيف يمكنني مساعدتك في أتمتة منزلك الذكي اليوم؟",
    loading: "أفكر...",
    error: "عذراً، لم أتمكن من الحصول على اقتراح الآن. يرجى المحاولة مرة أخرى.",
  },
};


export default function SmartSuggestions() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { currentLanguage } = useLanguage();
  const t = (key: string) => translations[currentLanguage.code]?.[key] || key;

  useEffect(() => {
    // Add a welcome message from AI on initial load
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        text: t('welcomeMessage'),
        sender: 'ai',
        timestamp: new Date(),
      }
    ]);
  }, [currentLanguage.code]); // Re-send welcome if language changes

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if(scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: 'user-' + Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Placeholder data for usagePatterns and sensorData
      const aiInput: SmartSuggestionChatbotInput = {
        userQuery: userMessage.text,
        usagePatterns: "User often leaves living room lights on after 11 PM. Thermostat is usually set to 20°C.",
        sensorData: "Living room motion sensor: no motion for 1 hour. Outside temperature: 10°C.",
      };
      const result: SmartSuggestionChatbotOutput = await smartSuggestionChatbot(aiInput);
      
      const aiMessage: Message = {
        id: 'ai-' + Date.now(),
        text: result.response,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI suggestion:", error);
      const errorMessage: Message = {
        id: 'error-' + Date.now(),
        text: t('error'),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </div>

      <Card className="flex-grow flex flex-col shadow-lg overflow-hidden">
        <CardHeader className="border-b">
            <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle>{t('title')}</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow flex flex-col">
          <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Sparkles size={18}/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 text-sm shadow ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p>{message.text}</p>
                   <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70 text-left'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                 {message.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User size={18}/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-2 justify-start">
                <Avatar className="h-8 w-8">
                   <AvatarFallback><Sparkles size={18}/></AvatarFallback>
                </Avatar>
                <div className="max-w-[70%] rounded-lg px-4 py-2 text-sm shadow bg-muted text-muted-foreground">
                  <p className="italic">{t('loading')}</p>
                </div>
              </div>
            )}
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t p-4 bg-background">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t('inputPlaceholder')}
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label={t('send')}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
