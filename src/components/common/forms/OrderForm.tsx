// @/components/common/forms/OrderForm.tsx

"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MenuItem, Order, Waiter } from "@/types";

type OrderFormProps = {
    menuItems: MenuItem[];
    waiters: Waiter[];
    onAddOrders: (orders: Omit<Order, "id" | "created_at" | "updated_at">[]) => void;
    closeDialog?: () => void;
    existingOrders?: Order[];
};

export function OrderForm({ menuItems, waiters, onAddOrders, closeDialog, existingOrders }: OrderFormProps) {

    const [quantities, setQuantities] = useState<Record<number, Record<number, number>>>({});

    useEffect(() => {
        const initial: Record<number, Record<number, number>> = {};
        menuItems.forEach((item) => {
            initial[item.id] = {};
            waiters.forEach((w) => {
                const existingOrder = existingOrders?.find(
                    (o) => o.menu_item_id === item.id && o.waiter_id === w.id
                );
                initial[item.id][w.id] = existingOrder?.quantity ?? 0;
            });
        });
        setQuantities(initial);
    }, [menuItems, waiters, existingOrders]);

    const handleChange = (menuId: number, waiterId: number, value: number) => {
        setQuantities((prev) => ({
            ...prev,
            [menuId]: { ...prev[menuId], [waiterId]: value },
        }));
    };

    const handleSubmit = () => {
        const ordersToSend: Omit<Order, "id" | "created_at" | "updated_at">[] = [];

        menuItems.forEach((item) => {
            waiters.forEach((w) => {
                const qty = quantities[item.id][w.id] || 0;
                if (qty > 0) {
                    ordersToSend.push({
                        menu_item_id: item.id,
                        waiter_id: w.id,
                        quantity: qty,
                        payment_method: "cash",
                        total_price: qty * item.price,
                    });
                }
            });
        });

        onAddOrders(ordersToSend);
        if (closeDialog) closeDialog();
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">Menu Item (Price)</th>
                        {waiters.map((w) => (
                            <th key={w.id} className="border px-2 py-1">{w.name}</th>
                        ))}
                        <th className="border px-2 py-1">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item) => {
                        const rowTotal = waiters.reduce(
                            (sum, w) => sum + (quantities[item.id]?.[w.id] || 0) * item.price,
                            0
                        );

                        return (
                            <tr key={item.id}>
                                <td className="border px-2 py-1">{item.name} ({item.price}Br)</td>
                                {waiters.map((w) => (
                                    <td key={w.id} className="border px-2 py-1">
                                        <input
                                            type="number"
                                            min={0}
                                            disabled={item.is_coffee && !w.serves_coffee}
                                            className={`w-full border px-1 py-0.5 [appearance:textfield] 
    [&::-webkit-outer-spin-button]:appearance-none 
    [&::-webkit-inner-spin-button]:appearance-none 
    ${item.is_coffee && !w.serves_coffee ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`}
                                            value={
                                                quantities[item.id]?.[w.id] && quantities[item.id]?.[w.id] > 0
                                                    ? quantities[item.id]?.[w.id]
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                handleChange(item.id, w.id, val === "" ? 0 : Number(val));
                                            }}
                                        />
                                    </td>
                                ))}
                                <td className="border px-2 py-1">{rowTotal.toFixed(2)}Br</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" onClick={closeDialog}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit Orders</Button>
            </div>
        </div>
    );
}
