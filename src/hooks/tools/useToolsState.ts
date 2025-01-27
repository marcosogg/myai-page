import { useState } from "react";
import { Tool } from "@/types/tool";
import { PLACEHOLDER_TOOLS } from "@/data/mockTools";

export const useToolsState = () => {
  const [tools, setTools] = useState<Tool[]>(PLACEHOLDER_TOOLS);
  const [isToolDialogOpen, setIsToolDialogOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const handleSaveTool = (toolData: Omit<Tool, 'id'>) => {
    if (selectedTool) {
      setTools(tools.map(tool => 
        tool.id === selectedTool.id 
          ? { ...toolData, id: tool.id }
          : tool
      ));
    } else {
      const tool: Tool = {
        ...toolData,
        id: Date.now().toString(),
      };
      setTools([...tools, tool]);
    }
  };

  const handleEditTool = (tool: Tool) => {
    setSelectedTool(tool);
    setIsToolDialogOpen(true);
  };

  const handleCloseToolDialog = () => {
    setSelectedTool(undefined);
    setIsToolDialogOpen(false);
  };

  return {
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
  };
};