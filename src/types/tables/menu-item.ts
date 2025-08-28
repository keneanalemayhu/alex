// @/types/tables/menu-item.ts

import { FullEntity } from "@/types/base";

export type MenuItem = FullEntity & {
  name: string;
  price: number;
  is_coffee: boolean;
};
