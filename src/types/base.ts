// @/types/base.ts

export interface BaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
}

export type FullEntity = BaseEntity

export type FormBaseProps<T, Extras = unknown> = Extras & {
  onAdd?: (input: Omit<T, "id" | "created_at" | "updated_at">) => void;
  onAddMultiple?: (input: Omit<T, "id" | "created_at" | "updated_at">[]) => void;
  closeDialog?: () => void;
  existing?: T;
};
