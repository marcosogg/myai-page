import { Tool } from "@/types/tool";

export const useToolsFiltering = (
  tools: Tool[],
  searchQuery: string,
  selectedCategoryIds: string[]
) => {
  const filteredTools = tools.filter((tool) => {
    // Only show active tools
    if (tool.status !== 'active') return false;

    // Search query filtering
    const searchTerm = searchQuery.toLowerCase();
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm);
    
    // Category filtering
    const matchesCategories = 
      selectedCategoryIds.length === 0 || // If no categories selected, show all
      selectedCategoryIds.some(catId => tool.categories.includes(catId)); // Show if tool has any of the selected categories

    return matchesSearch && matchesCategories;
  });

  return { filteredTools };
};