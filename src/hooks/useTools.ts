import { useState } from "react";
import { Tool } from "@/types/tool";
import { useToast } from "@/components/ui/use-toast";
import { PLACEHOLDER_TOOLS } from "@/data/mockTools";

export const useTools = () => {
  const { toast } = useToast();
  const [tools, setTools] = useState<Tool[]>(PLACEHOLDER_TOOLS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter((tool) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      tool.status === 'active' &&
      (tool.name.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm) ||
        tool.category.toLowerCase().includes(searchTerm))
    );
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

  const handleEditTool = (tool: Tool) => {
    setSelectedTool(tool);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedTool(undefined);
    setIsDialogOpen(false);
  };

  return {
    tools: filteredTools,
    isDialogOpen,
    selectedTool,
    searchQuery,
    setSearchQuery,
    handleSaveTool,
    handleEditTool,
    handleCloseDialog,
  };
};