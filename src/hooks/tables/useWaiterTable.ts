// @/hooks/tables/useWaiterTable.ts

"use client";
import { useState } from "react";
import { Waiter } from "@/types";

const initialWaiters: Waiter[] = [
  { id: 1, name: "Alemayehu Tilahun", serves_coffee: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, name: "Sara Bekele", serves_coffee: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, name: "Daniel Tadesse", serves_coffee: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export function useWaiterTable() {
  const [data, setData] = useState<Waiter[]>(initialWaiters);

  const addWaiter = (waiter: Omit<Waiter, "id" | "created_at" | "updated_at">) => {
    setData((prev) => [
      ...prev,
      { id: prev.length + 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), ...waiter },
    ]);
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
