// @/components/common/tables/client/MenuItemsTableClient.tsx

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useMenuItemTable } from "@/hooks/tables/useMenuItemTable";
import { useMenuItemColumns } from "@/components/common/tables/columns/menuItems";
import { DataTable } from "@/components/common/tables/data-table";
import { AddDialog } from "@/components/common/dialogs/AddDialog";
import { MenuItemForm } from "@/components/common/forms/MenuItemForm";

export default function MenuItemsTableClient() {
  const { data, addMenuItem, updateMenuItem, deleteMenuItem } = useMenuItemTable();
  const columns = useMenuItemColumns(deleteMenuItem, updateMenuItem);

  const [search, setSearch] = useState("");
  const normalize = (value: string) => value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  const filtered = data.filter((item) => normalize(item.name).includes(normalize(search)));

  return (
    <>
      <div className="flex flex-col items-start gap-1 mb-2 px-2 md:px-4">
        <h2 className="text-2xl font-bold">Menu Items</h2>
        <p className="text-muted-foreground text-sm">Add, edit, and delete menu items for your restaurant.</p>
      </div>

      <div className="flex items-center justify-between px-2 md:px-4">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <AddDialog title="Add Menu Item">
          {(close) => <MenuItemForm onAdd={addMenuItem} closeDialog={close} />}
        </AddDialog>
      </div>

      <div className="px-2 md:px-4">
        <DataTable columns={columns} data={filtered} />
      </div>
    </>
  );
}
