// @/lib/zod/api.ts

import { z } from "zod";

// Enums
export const paymentMethodSchema = z.enum(["cash", "telebirr", "bank_transfer"]);

// Waiters
export const createWaiterSchema = z.object({
  name: z.string().min(1),
  serves_coffee: z.boolean().default(false),
});

export const updateWaiterSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  serves_coffee: z.boolean().optional(),
});

// Menu Items
export const createMenuItemSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
});

export const updateMenuItemSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  price: z.number().positive().optional(),
});

// Orders
export const createOrderSchema = z.object({
  waiter_id: z.number(),
  menu_item_id: z.number(),
  quantity: z.number().min(1),
  payment_method: paymentMethodSchema,
});

// Daily Reconciliation
export const reconciliationSchema = z.object({
  waiter_id: z.number(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  total_cash_expected: z.number().nonnegative(),
  total_cash_collected: z.number().nonnegative(),
  absent: z.number().nonnegative().default(0),
  rolled_over: z.number().nonnegative().default(0),
  extra_paid: z.number().nonnegative().default(0),
});
