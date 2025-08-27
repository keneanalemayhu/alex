// @/components/common/forms/WaiterForm.tsx

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormBaseProps } from "@/types/base";
import { WaiterProps } from "@/types/props";
import { Waiter } from "@/types";

export type WaiterFormProps = FormBaseProps<Waiter>;

export function WaiterForm({ onAdd, closeDialog, existing }: WaiterProps) {
  const [name, setName] = useState(existing?.name ?? "");
  const [servesCoffee, setServesCoffee] = useState(existing?.serves_coffee ?? false);

  const handleSubmit = () => {
    if (!name.trim()) return;

    onAdd?.({
      name,
      serves_coffee: servesCoffee,
    });

    if (closeDialog) closeDialog();

    setTimeout(() => {
      setName("");
      setServesCoffee(false);
    }, 100);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="grid gap-3 py-2 px-1 text-sm max-w-lg"
    >
      <div className="flex items-center gap-4">
        <label className="w-36 text-sm font-medium text-right">
          Name <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="Enter name"
          className="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-36 text-sm font-medium text-right">Serves Coffee</label>
        <div className="flex items-center gap-2 w-full">
          <Checkbox
            id="serves_coffee"
            checked={servesCoffee}
            onCheckedChange={(checked) => setServesCoffee(Boolean(checked))}
          />
          <span className="text-muted-foreground">{servesCoffee ? "Yes" : "No"}</span>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-1 pb-1">
        <Button variant="outline" type="button" onClick={closeDialog}>
          Cancel
        </Button>
        <Button type="submit">{existing ? "Update" : "Add"}</Button>
      </div>
    </form>
  );
}
