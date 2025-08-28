// @/components/common/tables/client/OrderTableClient.tsx

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/common/tables/data-table";
import { AddDialog } from "@/components/common/dialogs/AddDialog";
import { OrderForm } from "@/components/common/forms/OrderForm";
import { useMenuItemTable } from "@/hooks/tables/useMenuItemTable";
import { useWaiterTable } from "@/hooks/tables/useWaiterTable";
import { useOrderTable } from "@/hooks/tables/useOrderTable";
import { useOrderColumns } from "@/components/common/tables/columns/orders";

export default function OrdersTableClient() {
  const { data: menuItems } = useMenuItemTable();
  const { data: waiters } = useWaiterTable();
  const { data: orders, addOrder, updateOrder } = useOrderTable();

  const [search, setSearch] = useState("");
  const normalize = (value: string) =>
    value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  const filteredMenuItems = menuItems.filter((m) =>
    normalize(m.name).includes(normalize(search))
  );

  const menuItemsWithOrders = filteredMenuItems.filter((m) =>
    orders.some((o) => o.menu_item_id === m.id && o.quantity > 0)
  );

  const columns = useOrderColumns(waiters, orders, addOrder, updateOrder);

  return (
    <>
      <div className="flex flex-col items-start gap-1 mb-2 px-2 md:px-4">
        <h2 className="text-2xl font-bold">Orders</h2>
        <p className="text-muted-foreground text-sm">
          Add and edit orders recorded per menu item and waiter.
        </p>
      </div>

      <div className="flex items-center justify-between px-2 md:px-4">
        <Input
          placeholder="Search menu items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <AddDialog title="Add Orders">
          {(close) => (
            <OrderForm
              menuItems={filteredMenuItems}
              waiters={waiters}
              onAddOrders={(newOrders) => {
                newOrders.forEach((o) => addOrder(o));
                close();
              }}
              closeDialog={close}
            />
          )}
        </AddDialog>
      </div>

      <div className="px-2 md:px-4">
        <DataTable columns={columns} data={menuItemsWithOrders} />
      </div>
    </>
  );
}
