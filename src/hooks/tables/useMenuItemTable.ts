// @/hooks/tables/useMenuItemTable.ts

"use client";
import { useState } from "react";
import { MenuItem } from "@/types";

const initialMenuItems: MenuItem[] = [
    { id: 1, name: "Bunna (Coffee)", price: 15.0, is_coffee: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 2, name: "Macchiato", price: 25.0, is_coffee: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 3, name: "Tea", price: 10.0, is_coffee: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export function useMenuItemTable() {
    const [data, setData] = useState<MenuItem[]>(initialMenuItems);

    const addMenuItem = (item: Omit<MenuItem, "id" | "created_at" | "updated_at">) => {
        setData((prev) => {
            const newId = prev.length ? Math.max(...prev.map((x) => x.id)) + 1 : 1;
            return [
                ...prev,
                { id: newId, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), ...item },
            ];
        });
    };

    const updateMenuItem = (updated: MenuItem) => {
        setData((prev) =>
            prev.map((m) => (m.id === updated.id ? { ...m, ...updated, updated_at: new Date().toISOString() } : m))
        );
    };

    const deleteMenuItem = (id: number) => {
        setData((prev) => prev.filter((m) => m.id !== id));
    };

    return { data, rawMenuItems: data, addMenuItem, updateMenuItem, deleteMenuItem };
}
