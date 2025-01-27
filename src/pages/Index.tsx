import { useState } from "react";
import Header from "../components/Header";
import ToolCard from "../components/ToolCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const PLACEHOLDER_TOOLS = [
  {
    id: 1,
    name: "ChatGPT",
    description: "Advanced language model for conversation and content generation",
    category: "Text Generation",
    url: "https://chat.openai.com",
    isFavorite: true,
  },
  {
    id: 2,
    name: "Midjourney",
    description: "AI-powered image generation from text descriptions",
    category: "Image Generation",
    url: "https://midjourney.com",
    isFavorite: false,
  },
  {
    id: 3,
    name: "Claude",
    description: "Anthropic's AI assistant for analysis and writing",
    category: "Text Generation",
    url: "https://claude.ai",
    isFavorite: false,
  },
  {
    id: 4,
    name: "DALL-E",
    description: "OpenAI's text-to-image generation model",
    category: "Image Generation",
    url: "https://labs.openai.com",
    isFavorite: true,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = PLACEHOLDER_TOOLS.filter((tool) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.category.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search AI tools..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              description={tool.description}
              category={tool.category}
              url={tool.url}
              isFavorite={tool.isFavorite}
            />
          ))}
        </div>
        {filteredTools.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No tools found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Index;