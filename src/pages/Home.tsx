import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Home = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-20">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-2xl text-gray-600">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/ai-tools">
              <Button size="lg" className="min-w-[200px]">
                {t('home.exploreTools')}
              </Button>
            </Link>
            <Link to="/learn">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                {t('home.exploreCourses')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;