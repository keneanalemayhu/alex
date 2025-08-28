// @/components/common/tables/columns/menuItems.tsx

"use client";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { MenuItem } from "@/types";
import { Button } from "@/components/ui/button";
import { EditDialog } from "@/components/common/dialogs/EditDialog";
import { DeleteDialog } from "@/components/common/dialogs/DeleteDialog";
import { MenuItemForm } from "@/components/common/forms/MenuItemForm";
import { useCalendar } from "@/hooks/useCalendar";

export function useMenuItemColumns(
  onDelete: (id: number) => void,
  onUpdate: (updated: MenuItem) => void
): ColumnDef<MenuItem>[] {
  const { toEthiopian } = useCalendar();

  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const value = row.getValue("price");
        if (typeof value !== "number") return "-";
        return `${value.toFixed(2)}Br`;
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const value = row.getValue("created_at");
        if (typeof value !== "string") return "-";
        const createdAt = new Date(value);
        return toEthiopian(createdAt, { includeTime: false });
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const menuItem = row.original;

        return (
          <div className="flex items-center gap-2">
            <EditDialog title="Edit Menu Item">
              {(close) => (
                <MenuItemForm
                  onAdd={(updated) => {
                    onUpdate({ ...menuItem, ...updated });
                    close();
                  }}
                  closeDialog={close}
                  existing={menuItem}
                />
              )}
            </EditDialog>
            <DeleteDialog
              title="Delete Menu Item"
              message={`Are you sure you want to delete "${menuItem.name}"?`}
              onConfirm={() => onDelete(menuItem.id)}
            />
          </div>
        );
      },
    },
  ];
}
