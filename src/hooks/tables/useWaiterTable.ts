// @/hooks/tables/useWaiterTable.ts

"use client";
import { useState } from "react";
import { Waiter } from "@/types";

const initialWaiters: Waiter[] = [
  { id: 1, name: "Asnaku", serves_coffee: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, name: "Eyerus", serves_coffee: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, name: "Jamal", serves_coffee: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export function useWaiterTable() {
  const [data, setData] = useState<Waiter[]>(initialWaiters);

  const addWaiter = (waiter: Omit<Waiter, "id" | "created_at" | "updated_at">) => {
    setData((prev) => {
      const newId = prev.length ? Math.max(...prev.map((x) => x.id)) + 1 : 1;
      return [
        ...prev,
        { id: newId, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), ...waiter },
      ];
    });
  };

  const updateWaiter = (updated: Waiter) => {
    setData((prev) =>
      prev.map((w) => (w.id === updated.id ? { ...w, ...updated, updated_at: new Date().toISOString() } : w))
    );
  };

  const deleteWaiter = (id: number) => {
    setData((prev) => prev.filter((w) => w.id !== id));
  };

  return { data, rawWaiters: data, addWaiter, updateWaiter, deleteWaiter };
}
