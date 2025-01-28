import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { I18nProvider } from "@/contexts/I18nContext";
import Header from "@/components/Header";
import Routes from "./Routes";

function App() {
  return (
    <I18nProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <AuthProvider>
            <Header />
            <Routes />
            <Toaster />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;