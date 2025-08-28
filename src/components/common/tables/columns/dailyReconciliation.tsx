// @/components/common/tables/columns/dailyReconciliation.tsx

"use client";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DailyReconciliation, Waiter } from "@/types";

export function useDailyReconciliationColumns(waiters: Waiter[]): ColumnDef<DailyReconciliation>[] {
  return [
    {
      accessorKey: "waiter_id",
      header: "Waiter",
      cell: ({ row }) => {
        const record = row.original;
        const waiter = waiters.find((w) => w.id === record.waiter_id);
        return waiter?.name ?? "Unknown";
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      ),
    },
    { accessorKey: "total_cash_expected", header: "Total Expected" },
    { accessorKey: "total_cash_collected", header: "Total Collected" },
    { accessorKey: "absent", header: "Absent" },
    { accessorKey: "rolled_over", header: "Rolled Over" },
    { accessorKey: "extra_paid", header: "Extra Paid" },
  ];
}
