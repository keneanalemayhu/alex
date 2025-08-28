// @/components/common/tables/columns/orders.tsx

"use client";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Order, MenuItem, Waiter } from "@/types";
import { EditDialog } from "@/components/common/dialogs/EditDialog";
import { OrderForm } from "@/components/common/forms/OrderForm";
import { useCalendar } from "@/hooks/useCalendar";

export function useOrderColumns(
  waiters: Waiter[],
  orders: Order[],
  addOrder: (o: Omit<Order, "id" | "created_at" | "updated_at">) => void,
  updateOrder: (updated: Order) => void,
): ColumnDef<MenuItem>[] {
  const { toEthiopian } = useCalendar();

  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Menu Item
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const item = row.original;
        return (
          <span className="font-semibold">
            {item.name}{" "}
            <span className="text-muted-foreground">({item.price} Br)</span>
          </span>
        );
      },
    },
    {
      id: "waiter-quantities",
      header: "Waiters / Quantities",
      cell: ({ row }) => {
        const item = row.original;
        const itemOrders = orders.filter((o) => o.menu_item_id === item.id);

        // only show if there’s at least 1 non-zero qty
        const hasSales = itemOrders.some((o) => o.quantity > 0);
        if (!hasSales) return null;

        return (
          <ul className="list-disc ml-4 space-y-1 text-sm text-muted-foreground">
            {waiters.map((w) => {
              const order = itemOrders.find((o) => o.waiter_id === w.id);
              const qty = order?.quantity ?? 0;
              return (
                <li key={w.id}>
                  {w.name} - <span className="font-semibold">{qty}</span>
                </li>
              );
            })}
          </ul>
        );
      },
    },
    {
      id: "total",
      header: "Total",
      cell: ({ row }) => {
        const item = row.original;
        const total = orders.reduce((sum, o) => {
          if (o.menu_item_id === item.id) {
            return sum + o.quantity * item.price;
          }
          return sum;
        }, 0);

        if (total === 0) return null; // hide rows with no sales
        return <span className="font-semibold">{total.toFixed(2)} Br</span>;
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const item = row.original;
        const itemOrder = orders.find((o) => o.menu_item_id === item.id);
        if (!itemOrder) return null;
        return toEthiopian(new Date(itemOrder.created_at), { includeTime: false });
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;
        const itemOrders = orders.filter((o) => o.menu_item_id === item.id);

        return (
          <EditDialog title={`Edit orders for ${item.name}`}>
            {(close) => (
              <OrderForm
                menuItems={[item]}
                waiters={waiters}
                existingOrders={itemOrders}
                onAddOrders={(updatedOrders) => {
                  updatedOrders.forEach((o) => {
                    const existing = itemOrders.find(
                      (ex) =>
                        ex.menu_item_id === o.menu_item_id &&
                        ex.waiter_id === o.waiter_id
                    );
                    if (existing) {
                      updateOrder({ ...existing, ...o });
                    } else {
                      addOrder(o);
                    }
                  });
                  close();
                }}
                closeDialog={close}
              />
            )}
          </EditDialog>
        );
      },
    },
  ];
}
