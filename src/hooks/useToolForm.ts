import { useState } from "react";
import { Tool } from "@/types/tool";
import { useToast } from "@/components/ui/use-toast";

interface UseToolFormProps {
  tool?: Tool;
  onSave: (tool: Omit<Tool, 'id'>) => void;
  onClose: () => void;
}

export const useToolForm = ({ tool, onSave, onClose }: UseToolFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Omit<Tool, 'id'>>({
    name: tool?.name ?? '',
    description: tool?.description ?? '',
    categories: tool?.categories ?? [],
    url: tool?.url ?? '',
    logo: tool?.logo ?? '',
    status: tool?.status ?? 'active',
    featured: tool?.featured ?? false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.url) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
    onClose();
  };

  const toggleCategory = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const updateField = <K extends keyof Omit<Tool, 'id'>>(
    field: K,
    value: Omit<Tool, 'id'>[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    handleSubmit,
    toggleCategory,
    updateField,
  };
};