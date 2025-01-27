import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          🇺🇸 {t('language.en')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('pt-BR')}>
          🇧🇷 {t('language.pt-BR')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;