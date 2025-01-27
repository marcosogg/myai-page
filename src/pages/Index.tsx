import Header from "../components/Header";
import ToolCard from "../components/ToolCard";

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
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PLACEHOLDER_TOOLS.map((tool) => (
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
      </div>
    </main>
  );
};

export default Index;