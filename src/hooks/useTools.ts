import { useToast } from "@/components/ui/use-toast";
import { useToolsState } from "./tools/useToolsState";
import { useCategoriesState } from "./tools/useCategoriesState";
import { useToolsFiltering } from "./tools/useToolsFiltering";

export const useTools = () => {
  const { toast } = useToast();
  
  const {
    tools,
    isToolDialogOpen,
    selectedTool,
    searchQuery,
    selectedCategoryIds,
    setSearchQuery,
    setSelectedCategoryIds,
    handleSaveTool,
    handleEditTool,
    handleCloseToolDialog,
    setIsToolDialogOpen,
  } = useToolsState();

  const {
    categories,
    isCategoryDialogOpen,
    selectedCategory,
    handleSaveCategory,
    handleEditCategory,
    handleCloseCategoryDialog,
    setIsCategoryDialogOpen,
  } = useCategoriesState();

  const { filteredTools } = useToolsFiltering(tools, searchQuery, selectedCategoryIds);

  const toggleCategoryFilter = (categoryId: string) => {
    setSelectedCategoryIds(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return {
    tools: filteredTools,
    categories,
    isToolDialogOpen,
    isCategoryDialogOpen,
    selectedTool,
    selectedCategory,
    searchQuery,
    selectedCategoryIds,
    setSearchQuery,
    setSelectedCategoryIds,  // Added this line
    handleSaveTool,
    handleSaveCategory,
    handleEditTool,
    handleEditCategory,
    handleCloseToolDialog,
    handleCloseCategoryDialog,
    setIsToolDialogOpen,
    setIsCategoryDialogOpen,
    toggleCategoryFilter,
  };
};