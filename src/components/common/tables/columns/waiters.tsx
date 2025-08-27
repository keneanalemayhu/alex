// @/components/common/tables/columns/waiters.tsx

"use client";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Waiter } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditDialog } from "@/components/common/dialogs/EditDialog";
import { DeleteDialog } from "@/components/common/dialogs/DeleteDialog";
import { WaiterForm } from "@/components/common/forms/WaiterForm";
import { useCalendar } from "@/hooks/useCalendar";

export function useWaiterColumns(
  onDelete: (id: number) => void,
  onUpdate: (updated: Waiter) => void
): ColumnDef<Waiter>[] {
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
      accessorKey: "serves_coffee",
      header: "Serves Coffee",
      cell: ({ row }) =>
        row.getValue("serves_coffee") ? (
          <Badge className="bg-green-100 text-green-700 border border-green-300 hover:bg-green-200">
            Yes
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-700 border border-red-300 hover:bg-red-200">
            No
          </Badge>
        ),
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const createdAt = new Date(row.getValue("created_at"));
        return toEthiopian(createdAt, { includeTime: false });
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const waiter = row.original;

        return (
          <div className="flex items-center gap-2">
            <EditDialog title="Edit Waiter">
              {(close) => (
                <WaiterForm
                  onAdd={(updated) => {
                    onUpdate({ ...waiter, ...updated });
                    close();
                  }}
                  closeDialog={close}
                  existing={waiter}
                />
              )}
            </EditDialog>
            <DeleteDialog
              title="Delete Waiter"
              message={`Are you sure you want to delete "${waiter.name}"?`}
              onConfirm={() => onDelete(waiter.id)}
            />
          </div>
        );
      },
    },
  ];
}
