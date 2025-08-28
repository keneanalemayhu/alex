// @/lib/zod/waiter.ts

import { z } from "zod";
import { baseEntitySchema, baseUpdateSchema } from "./base";

export const waiterBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  serves_coffee: z.boolean().default(false),
});

export const createWaiterSchema = waiterBaseSchema;
export const updateWaiterSchema = waiterBaseSchema.partial().merge(baseUpdateSchema);
export const fullWaiterSchema = waiterBaseSchema.merge(baseEntitySchema);
