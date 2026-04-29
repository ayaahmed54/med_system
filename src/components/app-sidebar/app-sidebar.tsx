"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    CalendarCheck,
    LayoutDashboard,
    PlusSquare,
    Settings,
    Stethoscope,
    UserIcon,
    Users
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Appointments", url: "/appointments", icon: CalendarCheck },
    { title: "Patients", url: "/patients", icon: Users },
    { title: "Doctors", url: "/doctors", icon: Stethoscope },
    { title: "Profile", url: "/profile", icon: UserIcon },
    { title: "Settings", url: "/Settings", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="border-r border-[#E7EBF3] bg-white">
            <SidebarHeader className="bg-white p-0">
                <div className="flex flex-row items-center p-6 gap-3 w-full">
                    <div className="flex flex-row justify-center items-center p-[5px_8px] w-11 h-11 bg-[#2B6CEE1A] rounded-xl flex-none">
                        <PlusSquare className="w-7 h-7 text-[#2B6CEE]" />
                    </div>
                    <div className="flex flex-col items-start p-0">
                        <h1 className="font-bold text-[16px] leading-5 text-[#0D121B]">Medical Plus</h1>
                        <p className="font-medium text-[12px] leading-4 text-[#4C669A]">Management System</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="bg-white px-4">
                <SidebarGroup className="bg-white p-0">
                    <SidebarGroupContent className="bg-white">
                        <SidebarMenu className="gap-1 bg-white">
                            {items.map((item) => {
                                const isActive = pathname === item.url;

                                return (
                                    <SidebarMenuItem key={item.title} className="bg-white">
                                        <SidebarMenuButton
                                            asChild
                                            className={`
                                                flex flex-row items-center p-[8px_12px] gap-3 w-full h-11 rounded-2xl transition-all duration-200 group
                                                ${isActive ? "bg-[#2B6CEE1A]" : "bg-white hover:bg-[#2B6CEE0D]"}
                                            `}
                                        >
                                            <Link href={item.url} className="flex items-center w-full">
                                                <div className="w-6 h-7 flex items-center justify-center flex-none">
                                                    <item.icon
                                                        className={`w-5 h-5 transition-colors ${isActive ? "text-[#2B6CEE]" : "text-[#4C669A] group-hover:text-[#2B6CEE]"}`}
                                                    />
                                                </div>
                                                <span className={`
                                                     font-medium text-[14px] leading-5 transition-colors
                                                    ${isActive ? "text-[#2B6CEE]" : "text-[#4C669A] group-hover:text-[#0D121B]"}
                                                `}>
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}


