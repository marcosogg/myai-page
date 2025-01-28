import { useTranslation } from "react-i18next";
import { useTools } from "@/hooks/useTools";
import ToolCard from "@/components/ToolCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Tag, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AITools = () => {
  const { t } = useTranslation();
  const { user, isAdmin } = useAuth();
  const {
    tools,
    categories,
    searchQuery,
    selectedCategoryIds,
    setSearchQuery,
    setSelectedCategoryIds,
    toggleCategoryFilter,
    handleEditTool,
    handleEditCategory,
  } = useTools();

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategoryIds([]);
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder={t("search.placeholder")}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {(selectedCategoryIds.length > 0 || searchQuery) && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                {t("search.clearFilters")}
              </Button>
            )}
            {user && isAdmin() && (
              <>
                <Button
                  onClick={() => handleEditCategory({ id: '', name: '', color: '#000000' })}
                  variant="outline"
                >
                  <Tag className="mr-2 h-4 w-4" />
                  {t("tools.manageCategories")}
                </Button>
                <Button
                  onClick={() => handleEditTool({ 
                    id: '', 
                    name: '', 
                    description: '', 
                    categories: [], 
                    url: '', 
                    status: 'active', 
                    featured: false 
                  })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {t("tools.addTool")}
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategoryIds.includes(category.id) ? "default" : "outline"}
              className="cursor-pointer transition-colors"
              style={{
                backgroundColor: selectedCategoryIds.includes(category.id) ? category.color : 'transparent',
                borderColor: category.color,
                color: selectedCategoryIds.includes(category.id) ? 'white' : 'inherit',
              }}
              onClick={() => toggleCategoryFilter(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              description={tool.description}
              categories={tool.categories}
              availableCategories={categories}
              url={tool.url}
              logo={tool.logo}
              isFavorite={tool.featured}
              onEdit={isAdmin() ? () => handleEditTool(tool) : undefined}
            />
          ))}
        </div>
        {tools.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">{t("search.noResults")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITools;