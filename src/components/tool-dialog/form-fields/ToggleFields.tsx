import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>{t("tools.form.status")}</Label>
          <div className="text-sm text-muted-foreground">
            {formData.status === 'active' ? t("tools.form.active") : t("tools.form.inactive")}
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
          <Label>{t("tools.form.featured")}</Label>
          <div className="text-sm text-muted-foreground">
            {t("tools.form.featured")}
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