// @/types/tables/daily-reconciliation.ts

import { FullEntity } from "@/types/base";

export type DailyReconciliation = FullEntity & {
  waiter_id: number;
  date: string;
  total_cash_expected: number;
  total_cash_collected: number;
  absent: number;
  rolled_over: number;
  extra_paid: number;
};