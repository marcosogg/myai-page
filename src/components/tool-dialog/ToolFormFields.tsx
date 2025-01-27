import { Tool } from "@/types/tool";
import { Category } from "@/types/category";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

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
      <div className="grid gap-2">
        <Label>Categories</Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={formData.categories.includes(category.id) ? "default" : "outline"}
              className="cursor-pointer"
              style={{
                backgroundColor: formData.categories.includes(category.id) ? category.color : 'transparent',
                borderColor: category.color,
                color: formData.categories.includes(category.id) ? 'white' : 'inherit',
              }}
              onClick={() => onToggleCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
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
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Status</Label>
          <div className="text-sm text-muted-foreground">
            Tool will be {formData.status === 'active' ? 'visible' : 'hidden'}
          </div>
        </div>
        <Switch
          checked={formData.status === 'active'}
          onCheckedChange={(checked) =>
            onUpdateField("status", checked ? 'active' : 'inactive')
          }
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Featured</Label>
          <div className="text-sm text-muted-foreground">
            Show tool in featured section
          </div>
        </div>
        <Switch
          checked={formData.featured}
          onCheckedChange={(checked) =>
            onUpdateField("featured", checked)
          }
        />
      </div>
    </div>
  );
};

export default ToolFormFields;