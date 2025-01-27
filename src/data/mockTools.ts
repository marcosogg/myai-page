import { Tool } from "@/types/tool";

export const PLACEHOLDER_TOOLS: Tool[] = [
  {
    id: "1",
    name: "ChatGPT",
    description: "Advanced language model for conversation and content generation",
    categories: ["1"], // Text Generation
    url: "https://chat.openai.com",
    logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    status: "active",
    featured: true,
  },
  {
    id: "2",
    name: "Midjourney",
    description: "AI-powered image generation from text descriptions",
    categories: ["2"], // Image Generation
    url: "https://midjourney.com",
    logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    status: "active",
    featured: false,
  },
  {
    id: "3",
    name: "Claude",
    description: "Anthropic's AI assistant for analysis and writing",
    categories: ["1", "4"], // Text Generation, Data Analysis
    url: "https://claude.ai",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    status: "active",
    featured: false,
  },
  {
    id: "4",
    name: "DALL-E",
    description: "OpenAI's text-to-image generation model",
    categories: ["2"], // Image Generation
    url: "https://labs.openai.com",
    logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    status: "active",
    featured: true,
  },
];