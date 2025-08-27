// @/components/common/AddDialog.tsx

"use client"
import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface AddDialogProps {
  title: string;
  children: (close: () => void) => React.ReactNode;
  contentClassName?: string;
}

export function AddDialog({ title, children, contentClassName }: AddDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white dark:bg-white dark:text-black px-4 py-2 rounded-md text-sm">
          <Plus className="mr-2 h-4 w-4" />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className={contentClassName}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children(() => setOpen(false))}
      </DialogContent>
    </Dialog>
  );
}
