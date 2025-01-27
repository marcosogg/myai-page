import Header from "@/components/Header";
import { useTranslation } from "react-i18next";

const Learn = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-3xl font-bold mb-8">{t('learn.title')}</h1>
        <p className="text-gray-600">{t('learn.comingSoon')}</p>
      </div>
    </main>
  );
};

export default Learn;