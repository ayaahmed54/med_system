"use client"
import Navbar from "@/components/Navbar/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";
function LayoutContent({ children }: { children: ReactNode }) {
    const { status } = useSession();
    if (status === "loading") {
        return <div className="h-screen w-full bg-white" />;
    }

    if (status === "unauthenticated") {
        return <main className="h-screen w-full">{children}</main>;
    }

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <AppSidebar />
                <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <header className="flex items-center border-b px-4 h-16 gap-2 bg-white">
                        <SidebarTrigger />
                        <div className="flex-1">
                            <Navbar />
                        </div>
                    </header>
                    <div className="flex-1 overflow-y-auto p-0 bg-[#F8F9FC]">
                        {children}
                        <Toaster richColors closeButton position="top-center" />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}

export default function Provider({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <LayoutContent>
                {children}
                <Toaster richColors closeButton position="top-center" />
            </LayoutContent>
        </SessionProvider>
    );
}