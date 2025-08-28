/* eslint-disable @typescript-eslint/no-explicit-any */
// @/components/common/forms/MenuItemForm.tsx

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormBaseProps } from "@/types/base";
import { MenuItem } from "@/types";
import { createMenuItemSchema } from "@/lib/zod/menuItem";

export type MenuItemFormProps = FormBaseProps<MenuItem>;

export function MenuItemForm({ onAdd, closeDialog, existing }: MenuItemFormProps) {
  const [name, setName] = useState(existing?.name ?? "");
  const [price, setPrice] = useState(existing?.price ?? 0);
  const [isCoffee, setIsCoffee] = useState(existing?.is_coffee ?? false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    try {
      const validated = createMenuItemSchema.parse({
        name,
        price,
        is_coffee: isCoffee,
      });

      onAdd?.(validated);

      if (closeDialog) closeDialog();

      setTimeout(() => {
        setName("");
        setPrice(0);
        setIsCoffee(false);
        setError(null);
      }, 100);
    } catch (e: any) {
      setError(e.errors?.[0]?.message ?? "Invalid input");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="grid gap-3 py-2 px-1 text-sm max-w-lg"
    >
      {error && <p className="text-red-500 text-sm">{error}</p>}

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
        <label className="w-36 text-sm font-medium text-right">
          Price <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="Enter price"
          type="number"
          className="w-full"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-36 text-sm font-medium text-right">
          Coffee Item
        </label>
        <Checkbox
          checked={isCoffee}
          onCheckedChange={(val) => setIsCoffee(Boolean(val))}
        />
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
