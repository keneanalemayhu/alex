// @/lib/translate.ts

import { useLanguage } from "@/components/context/LanguageContext";
import { translations } from "@/translations";

export function useT() {
  const { language } = useLanguage();
  return translations[language];
}