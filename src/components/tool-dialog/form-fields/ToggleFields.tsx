import { Tool } from "@/types/tool";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ToggleFieldsProps {
  formData: Omit<Tool, 'id'>;
  onUpdateField: <K extends keyof Omit<Tool, 'id'>>(
    field: K,
    value: Omit<Tool, 'id'>[K]
  ) => void;
}

const ToggleFields = ({ formData, onUpdateField }: ToggleFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default ToggleFields;