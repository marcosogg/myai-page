import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, Wrench, PencilLine } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Category } from "@/types/category";

interface ToolCardProps {
  name: string;
  description: string;
  categories: string[];
  availableCategories: Category[];
  url: string;
  logo?: string;
  isFavorite?: boolean;
  onEdit?: () => void;
}

const ToolCard = ({ 
  name, 
  description, 
  categories, 
  availableCategories,
  url, 
  logo, 
  isFavorite = false, 
  onEdit 
}: ToolCardProps) => {
  const { t } = useTranslation();
  const { user, isAdmin } = useAuth();

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  const isUserAdmin = isAdmin();

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="flex-none">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {logo ? (
                <img 
                  src={logo} 
                  alt={`${name} logo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Wrench className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {name}
            </CardTitle>
          </div>
          <div className="flex gap-2">
            {user && isUserAdmin && onEdit && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" 
                onClick={handleEdit}
                type="button"
              >
                <PencilLine className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </Button>
            )}
            {isUserAdmin && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Star className={`h-5 w-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500 dark:text-gray-400'}`} />
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map((categoryId) => {
            const category = availableCategories.find(c => c.id === categoryId);
            if (!category) return null;
            return (
              <Badge
                key={category.id}
                style={{
                  backgroundColor: category.color,
                  color: 'white',
                }}
              >
                {category.name}
              </Badge>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex-none">
        <Button asChild className="w-full gap-2">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {t("tools.openTool")}
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;