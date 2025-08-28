// @/hooks/tables/useOrderTable.ts

"use client";
import { useState } from "react";
import { Order } from "@/types";

const initialOrders: Order[] = [
    {
        id: 1, waiter_id: 1, menu_item_id: 2, quantity: 2, total_price: 50, payment_method: "cash",
        created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },
    {
        id: 2, waiter_id: 2, menu_item_id: 1, quantity: 1, total_price: 15, payment_method: "telebirr",
        created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    },
];

export function useOrderTable() {
    const [data, setData] = useState<Order[]>(initialOrders);

    const addOrder = (order: Omit<Order, "id" | "created_at" | "updated_at" | "total_price"> & { total_price: number }) => {
        setData((prev) => {
            const newId = prev.length ? Math.max(...prev.map((x) => x.id)) + 1 : 1;
            return [
                ...prev,
                { id: newId, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), ...order },
            ];
        });
    };

    const updateOrder = (updated: Order) => {
        setData((prev) =>
            prev.map((o) => (o.id === updated.id ? { ...o, ...updated, updated_at: new Date().toISOString() } : o))
        );
    };

    const deleteOrder = (id: number) => {
        setData((prev) => prev.filter((o) => o.id !== id));
    };

    return { data, rawOrders: data, addOrder, updateOrder, deleteOrder };
}
