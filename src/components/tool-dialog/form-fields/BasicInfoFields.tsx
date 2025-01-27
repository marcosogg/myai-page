import { Tool } from "@/types/tool";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoFieldsProps {
  formData: Omit<Tool, 'id'>;
  onUpdateField: <K extends keyof Omit<Tool, 'id'>>(
    field: K,
    value: Omit<Tool, 'id'>[K]
  ) => void;
}

const BasicInfoFields = ({ formData, onUpdateField }: BasicInfoFieldsProps) => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onUpdateField("name", e.target.value)}
          placeholder="Tool name"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onUpdateField("description", e.target.value)}
          placeholder="Tool description"
        />
      </div>
    </>
  );
};

export default BasicInfoFields;