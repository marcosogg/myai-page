import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Your Brand
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Features", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
            {user ? (
              <Button onClick={signOut} variant="outline">
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button>Sign In</Button>
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
            {["Features", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="block py-2 text-gray-600 hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
            {user ? (
              <Button onClick={signOut} variant="outline" className="w-full mt-2">
                Sign Out
              </Button>
            ) : (
              <Link to="/auth" className="block mt-2">
                <Button className="w-full">Sign In</Button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;