import { useState } from "react";
import { Tool } from "@/types/tool";
import { Category } from "@/types/category";
import { useToast } from "@/components/ui/use-toast";
import { PLACEHOLDER_TOOLS } from "@/data/mockTools";
import { PLACEHOLDER_CATEGORIES } from "@/data/mockCategories";

export const useTools = () => {
  const { toast } = useToast();
  const [tools, setTools] = useState<Tool[]>(PLACEHOLDER_TOOLS);
  const [categories, setCategories] = useState<Category[]>(PLACEHOLDER_CATEGORIES);
  const [isToolDialogOpen, setIsToolDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const filteredTools = tools.filter((tool) => {
    const searchTerm = searchQuery.toLowerCase();
    const matchesSearch = 
      tool.status === 'active' &&
      (tool.name.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm));
    
    const matchesCategories = 
      selectedCategoryIds.length === 0 || 
      tool.categories.some(catId => selectedCategoryIds.includes(catId));

    return matchesSearch && matchesCategories;
  });

  const handleSaveTool = (toolData: Omit<Tool, 'id'>) => {
    if (selectedTool) {
      // Edit existing tool
      setTools(tools.map(tool => 
        tool.id === selectedTool.id 
          ? { ...toolData, id: tool.id }
          : tool
      ));
      toast({
        title: "Success",
        description: "Tool has been updated successfully.",
      });
    } else {
      // Add new tool
      const tool: Tool = {
        ...toolData,
        id: Date.now().toString(),
      };
      setTools([...tools, tool]);
      toast({
        title: "Success",
        description: "Tool has been added successfully.",
      });
    }
  };

  const handleSaveCategory = (categoryData: Omit<Category, 'id'>) => {
    if (selectedCategory) {
      // Edit existing category
      setCategories(categories.map(category => 
        category.id === selectedCategory.id 
          ? { ...categoryData, id: category.id }
          : category
      ));
      toast({
        title: "Success",
        description: "Category has been updated successfully.",
      });
    } else {
      // Add new category
      const category: Category = {
        ...categoryData,
        id: Date.now().toString(),
      };
      setCategories([...categories, category]);
      toast({
        title: "Success",
        description: "Category has been added successfully.",
      });
    }
  };

  const handleEditTool = (tool: Tool) => {
    setSelectedTool(tool);
    setIsToolDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const handleCloseToolDialog = () => {
    setSelectedTool(undefined);
    setIsToolDialogOpen(false);
  };

  const handleCloseCategoryDialog = () => {
    setSelectedCategory(undefined);
    setIsCategoryDialogOpen(false);
  };

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
    handleSaveTool,
    handleSaveCategory,
    handleEditTool,
    handleEditCategory,
    handleCloseToolDialog,
    handleCloseCategoryDialog,
    toggleCategoryFilter,
  };
};