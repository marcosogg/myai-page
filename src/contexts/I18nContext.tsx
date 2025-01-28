import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import i18n, { initI18n } from '@/i18n';
import { useToast } from '@/components/ui/use-toast';

interface I18nContextType {
  isLoading: boolean;
  changeLanguage: (lng: string) => Promise<void>;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initialize = async () => {
      try {
        // Load the preferred language from localStorage if it exists
        const storedLanguage = localStorage.getItem('preferredLanguage');
        await initI18n();
        
        if (storedLanguage && ['en', 'pt-BR'].includes(storedLanguage)) {
          await i18n.changeLanguage(storedLanguage);
        }
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        toast({
          variant: "destructive",
          description: "Failed to load translations",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [toast]);

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      localStorage.setItem('preferredLanguage', lng);
      toast({
        description: "Language changed successfully",
      });
    } catch (error) {
      console.error('Error changing language:', error);
      toast({
        variant: "destructive",
        description: "Failed to change language",
      });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <I18nContext.Provider value={{ isLoading, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};