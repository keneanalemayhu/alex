// @/components/common/tables/client/WaitersTableClient.tsx
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useWaiterTable } from "@/hooks/tables/useWaiterTable";
import { useWaiterColumns } from "@/components/common/tables/columns/waiters";
import { DataTable } from "@/components/common/tables/data-table";
import { AddDialog } from "@/components/common/dialogs/AddDialog";
import { WaiterForm } from "@/components/common/forms/WaiterForm";

export default function WaitersTableClient() {
  const { data, addWaiter, updateWaiter, deleteWaiter } = useWaiterTable();
  const columns = useWaiterColumns(deleteWaiter, updateWaiter);

  const [search, setSearch] = useState("");
  const normalize = (value: string) => value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  const filtered = data.filter((w) => normalize(w.name).includes(normalize(search)));

  return (
    <>
      <div className="flex flex-col items-start gap-1 mb-2 px-2 md:px-4">
        <h2 className="text-2xl font-bold">Waiters</h2>
        <p className="text-muted-foreground text-sm">Add, edit, and delete waiters for your restaurant.</p>
      </div>

      <div className="flex items-center justify-between px-2 md:px-4">
        <Input placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />

        <AddDialog title="Add Waiter">
          {(close) => <WaiterForm onAdd={addWaiter} closeDialog={close} />}
        </AddDialog>
      </div>

      <div className="px-2 md:px-4">
        <DataTable columns={columns} data={filtered} />
      </div>
    </>
  );
}
