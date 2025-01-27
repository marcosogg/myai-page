import { Tool } from "@/types/tool";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UrlFieldsProps {
  formData: Omit<Tool, 'id'>;
  onUpdateField: <K extends keyof Omit<Tool, 'id'>>(
    field: K,
    value: Omit<Tool, 'id'>[K]
  ) => void;
}

const UrlFields = ({ formData, onUpdateField }: UrlFieldsProps) => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="url">URL *</Label>
        <Input
          id="url"
          type="url"
          value={formData.url}
          onChange={(e) => onUpdateField("url", e.target.value)}
          placeholder="https://example.com"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="logo">Logo URL</Label>
        <Input
          id="logo"
          value={formData.logo}
          onChange={(e) => onUpdateField("logo", e.target.value)}
          placeholder="https://example.com/logo.png"
        />
      </div>
    </>
  );
};

export default UrlFields;