// @/app/dashboard/menu-items/layout.tsx

import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Menu Items | Restaurant Management System",
    description: "Login or register to access the Restaurant Management System by JirehGroup.",
};

export default function MenuItemsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}