// @/lib/zod/menuItem.ts

import { z } from "zod";
import { baseEntitySchema, baseUpdateSchema } from "./base";

export const menuItemBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be positive"),
  is_coffee: z.boolean().default(false),
});

export const createMenuItemSchema = menuItemBaseSchema;
export const updateMenuItemSchema = menuItemBaseSchema.partial().merge(baseUpdateSchema);
export const fullMenuItemSchema = menuItemBaseSchema.merge(baseEntitySchema);
