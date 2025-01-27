import { Tool } from "@/types/tool";
import { Category } from "@/types/category";
import BasicInfoFields from "./form-fields/BasicInfoFields";
import CategorySelector from "./form-fields/CategorySelector";
import UrlFields from "./form-fields/UrlFields";
import ToggleFields from "./form-fields/ToggleFields";

interface ToolFormFieldsProps {
  formData: Omit<Tool, 'id'>;
  categories: Category[];
  onToggleCategory: (categoryId: string) => void;
  onUpdateField: <K extends keyof Omit<Tool, 'id'>>(
    field: K,
    value: Omit<Tool, 'id'>[K]
  ) => void;
}

const ToolFormFields = ({
  formData,
  categories,
  onToggleCategory,
  onUpdateField,
}: ToolFormFieldsProps) => {
  return (
    <div className="grid gap-4 py-4">
      <BasicInfoFields 
        formData={formData} 
        onUpdateField={onUpdateField} 
      />
      
      <CategorySelector
        categories={categories}
        selectedCategories={formData.categories}
        onToggleCategory={onToggleCategory}
      />
      
      <UrlFields 
        formData={formData} 
        onUpdateField={onUpdateField} 
      />
      
      <ToggleFields 
        formData={formData} 
        onUpdateField={onUpdateField} 
      />
    </div>
  );
};

export default ToolFormFields;