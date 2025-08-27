// @/components/common/dialogs/DeleteDialog.tsx

"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteDialogProps {
  title?: string;
  message?: string;
  onConfirm: () => void;
  trigger?: React.ReactNode;
}

export function DeleteDialog({
  title = "Delete Item",
  message = "Are you sure you want to delete this? This action cannot be undone.",
  onConfirm,
  trigger,
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">{message}</p>
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
