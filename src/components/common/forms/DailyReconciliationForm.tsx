// @/components/common/forms/DailyReconciliationForm.tsx

"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DailyReconciliation, Waiter } from "@/types";

type DailyReconciliationFormProps = {
    waiters: Waiter[];
    existing?: DailyReconciliation[];
    onAddReconciliation: (data: Omit<DailyReconciliation, "id" | "created_at" | "updated_at">[]) => void;
    closeDialog?: () => void;
};

export function DailyReconciliationForm({
    waiters,
    existing,
    onAddReconciliation,
    closeDialog,
}: DailyReconciliationFormProps) {

    const fields: (keyof Omit<DailyReconciliation, "id" | "waiter_id" | "date" | "rolled_over" | "extra_paid" | "created_at" | "updated_at">)[] = [
        "total_cash_expected",
        "total_cash_collected",
        "absent",
    ];

    const [records, setRecords] = useState<Record<number, Partial<DailyReconciliation>>>({});

    useEffect(() => {
        const initial: Record<number, Partial<DailyReconciliation>> = {};
        waiters.forEach((w) => {
            const existingRecord = existing?.find((r) => r.waiter_id === w.id);
            initial[w.id] = {
                waiter_id: w.id,
                date: new Date().toISOString().split("T")[0],
                total_cash_expected: existingRecord?.total_cash_expected ?? 0,
                total_cash_collected: existingRecord?.total_cash_collected ?? 0,
                absent: existingRecord?.absent ?? 0,
            };
        });
        setRecords(initial);
    }, [waiters, existing]);

    const handleChange = (waiterId: number, field: keyof Omit<DailyReconciliation, "waiter_id" | "date" | "rolled_over" | "extra_paid">, value: number) => {
        setRecords((prev) => ({
            ...prev,
            [waiterId]: { ...prev[waiterId], [field]: value },
        }));
    };

    const handleSubmit = () => {
        onAddReconciliation(Object.values(records) as Omit<DailyReconciliation, "id" | "created_at" | "updated_at">[]);
        closeDialog?.();
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">Waiter</th>
                        <th className="border px-2 py-1">Total Cash Expected</th>
                        <th className="border px-2 py-1">Total Cash Collected</th>
                        <th className="border px-2 py-1">Absent</th>
                    </tr>
                </thead>
                <tbody>
                    {waiters.map((w) => (
                        <tr key={w.id}>
                            <td className="border px-2 py-1">{w.name}</td>
                            {fields.map((field) => (
                                <td key={field} className="border px-2 py-1">
                                    <input
                                        type="number"
                                        min={0}
                                        className="w-full border px-1 py-0.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        value={records[w.id]?.[field] ?? 0}
                                        onChange={(e) => handleChange(w.id, field, Number(e.target.value))}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" onClick={closeDialog}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
}
