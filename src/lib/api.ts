// @/lib/api.ts

import type { Waiter, MenuItem, Order, DailyReconciliation, ApiResponse } from "@/types/api";
import {
    createWaiterSchema,
    updateWaiterSchema,
    createMenuItemSchema,
    updateMenuItemSchema,
    createOrderSchema,
    reconciliationSchema,
} from "@/lib/zod/api";

const API_BASE = "http://localhost/api";

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
        throw new Error(json.error || `API error: ${res.status}`);
    }
    return json;
}


/* ========================
   Waiters
======================== */
export const WaitersAPI = {
    getAll: () => request<Waiter[]>("/waiters"),
    getById: (id: number) => request<Waiter>(`/waiters/${id}`),
    create: (data: Omit<Waiter, "id">) => {
        const parsed = createWaiterSchema.parse(data);
        return request<ApiResponse<Waiter>>("/waiters", {
            method: "POST",
            body: JSON.stringify(parsed),
        });
    },
    update: (data: Partial<Waiter> & { id: number }) => {
        const parsed = updateWaiterSchema.parse(data);
        return request<ApiResponse<Waiter>>(`/waiters/${parsed.id}`, {
            method: "PUT",
            body: JSON.stringify(parsed),
        });
    },
    delete: (id: number) => request<ApiResponse<null>>(`/waiters/${id}`, { method: "DELETE" }),
};

/* ========================
   Menu Items
======================== */
export const MenuItemsAPI = {
    getAll: () => request<MenuItem[]>("/menu_items"),
    getById: (id: number) => request<MenuItem>(`/menu_items/${id}`),
    create: (data: Omit<MenuItem, "id">) => {
        const parsed = createMenuItemSchema.parse(data);
        return request<ApiResponse<MenuItem>>("/menu_items", {
            method: "POST",
            body: JSON.stringify(parsed),
        });
    },
    update: (data: Partial<MenuItem> & { id: number }) => {
        const parsed = updateMenuItemSchema.parse(data);
        return request<ApiResponse<MenuItem>>(`/menu_items/${parsed.id}`, {
            method: "PUT",
            body: JSON.stringify(parsed),
        });
    },
    delete: (id: number) => request<ApiResponse<null>>(`/menu_items/${id}`, { method: "DELETE" }),
};

/* ========================
   Orders
======================== */
export const OrdersAPI = {
    getAll: () => request<Order[]>("/orders"),
    getById: (id: number) => request<Order>(`/orders/${id}`),
    create: (data: Omit<Order, "id" | "total_price" | "created_at">) => {
        const parsed = createOrderSchema.parse(data);
        return request<ApiResponse<Order>>("/orders", {
            method: "POST",
            body: JSON.stringify(parsed),
        });
    },
    update: (id: number, data: Partial<Pick<Order, "quantity" | "payment_method">>) =>
        request<ApiResponse<Order>>(`/orders/${id}`, {
            method: "PUT",
            body: JSON.stringify({ id, ...data }), // note: include id if backend expects it
        }),
    delete: (id: number) => request<ApiResponse<null>>(`/orders/${id}`, { method: "DELETE" }),
};

/* ========================
   Reconciliation
======================== */
export const ReconciliationAPI = {
    getAll: () => request<DailyReconciliation[]>("/reconciliation"),
    getById: (id: number) => request<DailyReconciliation>(`/reconciliation/${id}`),
    create: (data: Omit<DailyReconciliation, "id">) => {
        const parsed = reconciliationSchema.parse(data);
        return request<ApiResponse<DailyReconciliation>>("/reconciliation", {
            method: "POST",
            body: JSON.stringify(parsed),
        });
    },
    update: (data: Partial<Omit<DailyReconciliation, 'id'>> & { id: number }) =>
        request<ApiResponse<DailyReconciliation>>(`/reconciliation/${data.id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }),
    delete: (id: number) => request<ApiResponse<null>>(`/reconciliation/${id}`, { method: "DELETE" }),
};
