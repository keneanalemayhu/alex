// @/hooks/tables/useDailyReconciliationTable.ts

"use client";
import { useState } from "react";
import { DailyReconciliation } from "@/types";

const initialReconciliations: DailyReconciliation[] = [
    {
        id: 1,
        waiter_id: 1,
        date: "2025-08-27",
        total_cash_expected: 200,
        total_cash_collected: 150,
        absent: 0,
        rolled_over: 50,
        extra_paid: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 2,
        waiter_id: 2,
        date: "2025-08-27",
        total_cash_expected: 300,
        total_cash_collected: 300,
        absent: 0,
        rolled_over: 0,
        extra_paid: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export function useDailyReconciliationTable() {
    const [data, setData] = useState<DailyReconciliation[]>(initialReconciliations);

    const addReconciliation = (reco: Omit<DailyReconciliation, "id" | "created_at" | "updated_at">) => {
        setData((prev) => {
            const newId = prev.length ? Math.max(...prev.map((x) => x.id)) + 1 : 1;
            return [
                ...prev,
                { id: newId, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), ...reco },
            ];
        });
    };

    const updateReconciliation = (updated: DailyReconciliation) => {
        setData((prev) =>
            prev.map((r) => (r.id === updated.id ? { ...r, ...updated, updated_at: new Date().toISOString() } : r))
        );
    };

    const deleteReconciliation = (id: number) => {
        setData((prev) => prev.filter((r) => r.id !== id));
    };

    return { data, rawReconciliations: data, addReconciliation, updateReconciliation, deleteReconciliation };
}
