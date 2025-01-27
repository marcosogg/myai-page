import { Tool } from "@/types/tool";

export const useToolsFiltering = (
  tools: Tool[],
  searchQuery: string,
  selectedCategoryIds: string[]
) => {
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

  return { filteredTools };
};