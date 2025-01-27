import { Tool } from "@/types/tool";
import { Category } from "@/types/category";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X } from "lucide-react";

interface CategorySelectorProps {
  categories: Category[];
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
}

const CategorySelector = ({ 
  categories, 
  selectedCategories, 
  onToggleCategory 
}: CategorySelectorProps) => {
  return (
    <div className="grid gap-2">
      <Label>Categories</Label>
      <ScrollArea className="h-[120px] w-full rounded-md border p-4">
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <Badge
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer flex items-center justify-between gap-2 py-2"
                style={{
                  backgroundColor: isSelected ? category.color : 'transparent',
                  borderColor: category.color,
                  color: isSelected ? 'white' : 'inherit',
                }}
                onClick={() => onToggleCategory(category.id)}
              >
                <span className="truncate">{category.name}</span>
                {isSelected ? (
                  <X className="h-3 w-3 shrink-0" />
                ) : (
                  <Check className="h-3 w-3 shrink-0" />
                )}
              </Badge>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategorySelector;