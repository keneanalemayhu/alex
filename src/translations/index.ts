// @/translations/index.ts

import { am } from "./am";
import { en } from "./en";

export const translations = {
  am,
  en,
};

export type SupportedLang = keyof typeof translations;