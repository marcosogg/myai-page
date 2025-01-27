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
            <DialogTitle>{tool ? 'Edit Tool' : 'Add New Tool'}</DialogTitle>
          </DialogHeader>
          
          <ToolFormFields
            formData={formData}
            categories={categories}
            onToggleCategory={toggleCategory}
            onUpdateField={updateField}
          />

          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ToolDialog;