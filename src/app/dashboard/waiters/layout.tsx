// @/app/dashboard/waiters/layout.tsx

import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Waiters | Restaurant Management System",
    description: "Login or register to access the Restaurant Management System by JirehGroup.",
};

export default function WaitersLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}