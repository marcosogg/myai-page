import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b h-14">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('header.title')}
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm font-medium">
                      {user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={signOut}>
                    {t('header.signOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button>{t('header.signIn')}</Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4">
            <div className="flex items-center justify-end mb-2">
              <LanguageSelector />
            </div>
            {user ? (
              <Button onClick={signOut} variant="outline" className="w-full mt-2">
                {t('header.signOut')}
              </Button>
            ) : (
              <Link to="/auth" className="block mt-2">
                <Button className="w-full">{t('header.signIn')}</Button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;