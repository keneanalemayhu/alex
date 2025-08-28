// @/lib/zod/dailyReconciliation.ts

import { z } from "zod";
import { baseEntitySchema, baseUpdateSchema } from "./base";

export const dailyReconciliationBaseSchema = z.object({
  waiter_id: z.number(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format YYYY-MM-DD"),
  total_cash_expected: z.number().nonnegative(),
  total_cash_collected: z.number().nonnegative(),
  absent: z.number().nonnegative().default(0),
  rolled_over: z.number().nonnegative().default(0),
  extra_paid: z.number().nonnegative().default(0),
});

export const createDailyReconciliationSchema = dailyReconciliationBaseSchema;
export const updateDailyReconciliationSchema = dailyReconciliationBaseSchema.partial().merge(baseUpdateSchema);
export const fullDailyReconciliationSchema = dailyReconciliationBaseSchema.merge(baseEntitySchema);
