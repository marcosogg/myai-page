import Header from "../components/Header";
import ToolCard from "../components/ToolCard";
import ToolDialog from "../components/ToolDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTools } from "@/hooks/useTools";

const Index = () => {
  const { user } = useAuth();
  const {
    tools,
    isDialogOpen,
    selectedTool,
    searchQuery,
    setSearchQuery,
    handleSaveTool,
    handleEditTool,
    handleCloseDialog,
  } = useTools();

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
                onClick={() => handleEditTool({ 
                  id: '', 
                  name: '', 
                  description: '', 
                  category: '', 
                  url: '', 
                  status: 'active', 
                  featured: false 
                })}
                className="whitespace-nowrap"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Tool
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool) => (
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
          {tools.length === 0 && (
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