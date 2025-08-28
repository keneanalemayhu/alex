// @/lib/zod/base.ts

import { z } from "zod";

// Base entity fields
export const baseEntitySchema = z.object({
  id: z.number(),
  created_at: z.string(), // ISO timestamp
  updated_at: z.string(), // ISO timestamp
});

// Partial base for updates (id required, timestamps optional)
export const baseUpdateSchema = z.object({
  id: z.number(),
});
