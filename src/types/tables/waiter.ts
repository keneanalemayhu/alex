// @/types/tables/waiter.ts

import { FullEntity } from "@/types/base";

export type Waiter = FullEntity & {
  name: string;
  serves_coffee: boolean;
};
