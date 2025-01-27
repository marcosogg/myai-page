import { useState } from "react";
import { Category } from "@/types/category";
import { PLACEHOLDER_CATEGORIES } from "@/data/mockCategories";

export const useCategoriesState = () => {
  const [categories, setCategories] = useState<Category[]>(PLACEHOLDER_CATEGORIES);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

  const handleSaveCategory = (categoryData: Omit<Category, 'id'>) => {
    if (selectedCategory) {
      setCategories(categories.map(category => 
        category.id === selectedCategory.id 
          ? { ...categoryData, id: category.id }
          : category
      ));
    } else {
      const category: Category = {
        ...categoryData,
        id: Date.now().toString(),
      };
      setCategories([...categories, category]);
    }
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const handleCloseCategoryDialog = () => {
    setSelectedCategory(undefined);
    setIsCategoryDialogOpen(false);
  };

  return {
    categories,
    isCategoryDialogOpen,
    selectedCategory,
    handleSaveCategory,
    handleEditCategory,
    handleCloseCategoryDialog,
    setIsCategoryDialogOpen,
  };
};