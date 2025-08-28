/* eslint-disable @typescript-eslint/no-explicit-any */
// @/components/common/tables/client/DailyReconciliationTableClient.tsx

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/common/tables/data-table";
import { AddDialog } from "@/components/common/dialogs/AddDialog";
import { DailyReconciliationForm } from "@/components/common/forms/DailyReconciliationForm";
import { useWaiterTable } from "@/hooks/tables/useWaiterTable";
import { useDailyReconciliationTable } from "@/hooks/tables/useDailyReconciliationTable";
import { useDailyReconciliationColumns } from "@/components/common/tables/columns/dailyReconciliation";
import { DailyReconciliation } from "@/types/tables/daily-reconciliation";

// Row type for table: either a full record or a placeholder object
type DailyReconciliationRow = Omit<DailyReconciliation, "id" | "created_at" | "updated_at"> & {
    id?: number;
    created_at?: string;
    updated_at?: string;
};

export default function DailyReconciliationTableClient() {
    const { data: waiters } = useWaiterTable();
    const { data: records, addReconciliation } = useDailyReconciliationTable();

    const [search, setSearch] = useState("");

    // Include all waiters, map existing records or placeholder
    const filteredRecords: DailyReconciliationRow[] = waiters
        .filter((w) => w.name.toLowerCase().includes(search.toLowerCase()))
        .map((w) => {
            const existingRecord = records.find((r) => r.waiter_id === w.id);
            return existingRecord ?? {
                waiter_id: w.id,
                date: new Date().toISOString().split("T")[0],
                total_cash_expected: 0,
                total_cash_collected: 0,
                absent: 0,
                rolled_over: 0,
                extra_paid: 0,
            };
        });

    const columns = useDailyReconciliationColumns(waiters) as any; // cast to avoid union issues

    return (
        <>
            <div className="flex flex-col items-start gap-1 mb-2 px-2 md:px-4">
                <h2 className="text-2xl font-bold">Daily Reconciliation</h2>
                <p className="text-muted-foreground text-sm">
                    Record daily cash reconciliations per waiter.
                </p>
            </div>

            <div className="flex items-center justify-between px-2 md:px-4">
                <Input
                    placeholder="Search waiters..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />

                <AddDialog title="Add Daily Reconciliation">
                    {(close) => (
                        <DailyReconciliationForm
                            waiters={waiters}
                            onAddReconciliation={(newRecords) => {
                                newRecords.forEach((r) =>
                                    addReconciliation({
                                        ...r,
                                        rolled_over: 0,
                                        extra_paid: 0,
                                    })
                                );
                                close();
                            }}
                            closeDialog={close}
                        />
                    )}
                </AddDialog>
            </div>

            <div className="px-2 md:px-4">
                <DataTable<DailyReconciliationRow, unknown>
                    columns={columns}
                    data={filteredRecords}
                />
            </div>
        </>
    );
}
