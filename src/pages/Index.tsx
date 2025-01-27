import { useState } from "react";
import Header from "../components/Header";
import ToolCard from "../components/ToolCard";
import ToolDialog from "../components/ToolDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  logo?: string;
  status: 'active' | 'inactive';
  featured: boolean;
}

const PLACEHOLDER_TOOLS: Tool[] = [
  {
    id: "1",
    name: "ChatGPT",
    description: "Advanced language model for conversation and content generation",
    category: "Text Generation",
    url: "https://chat.openai.com",
    logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    status: "active",
    featured: true,
  },
  {
    id: "2",
    name: "Midjourney",
    description: "AI-powered image generation from text descriptions",
    category: "Image Generation",
    url: "https://midjourney.com",
    logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    status: "active",
    featured: false,
  },
  {
    id: "3",
    name: "Claude",
    description: "Anthropic's AI assistant for analysis and writing",
    category: "Text Generation",
    url: "https://claude.ai",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    status: "active",
    featured: false,
  },
  {
    id: "4",
    name: "DALL-E",
    description: "OpenAI's text-to-image generation model",
    category: "Image Generation",
    url: "https://labs.openai.com",
    logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    status: "active",
    featured: true,
  },
];

const Index = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [tools, setTools] = useState<Tool[]>(PLACEHOLDER_TOOLS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | undefined>(undefined);

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

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search AI tools..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {user && (
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="whitespace-nowrap"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Tool
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                category={tool.category}
                url={tool.url}
                logo={tool.logo}
                isFavorite={tool.featured}
                onEdit={() => handleEditTool(tool)}
              />
            ))}
          </div>
          {filteredTools.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No tools found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <ToolDialog
        open={isDialogOpen}
        onOpenChange={handleCloseDialog}
        tool={selectedTool}
        onSave={handleSaveTool}
      />
    </main>
  );
};

export default Index;