import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tool } from "@/types/tool";
import { Category } from "@/types/category";
import { useToolForm } from "@/hooks/useToolForm";
import ToolFormFields from "./tool-dialog/ToolFormFields";

interface ToolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tool?: Tool;
  categories: Category[];
  onSave: (tool: Omit<Tool, 'id'>) => void;
}

const ToolDialog = ({ open, onOpenChange, tool, categories, onSave }: ToolDialogProps) => {
  const { t } = useTranslation();
  const {
    formData,
    handleSubmit,
    toggleCategory,
    updateField,
  } = useToolForm({
    tool,
    onSave,
    onClose: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {tool ? t("tools.editTool") : t("tools.addTool")}
            </DialogTitle>
          </DialogHeader>
          
          <ToolFormFields
            formData={formData}
            categories={categories}
            onToggleCategory={toggleCategory}
            onUpdateField={updateField}
          />

          <DialogFooter>
            <Button type="submit">{t("tools.form.save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ToolDialog;