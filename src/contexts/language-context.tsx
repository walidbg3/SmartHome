"use client";

import type { Language } from '@/types';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  supportedLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<Language>(SUPPORTED_LANGUAGES[0]);

  const setCurrentLanguage = (language: Language) => {
    setCurrentLanguageState(language);
    // Here you would typically also set language in localStorage or cookies
    // and potentially load new translation files with i18n libraries.
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language.code;
      // For Arabic, set text direction to RTL
      if (language.code === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  };
  
  // Set initial lang and dir on mount
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
        document.documentElement.lang = currentLanguage.code;
        if (currentLanguage.code === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
    }
  }, [currentLanguage.code]);


  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
