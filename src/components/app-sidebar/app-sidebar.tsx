"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    CalendarCheck,
    LayoutDashboard,
    MessageSquare,
    MessageSquareDot,
    PlusSquare,
    Settings,
    Stethoscope,
    UserCircle,
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
    { title: "Doctors", url: "/doctor", icon: Stethoscope },
    { title: "Messages", url: "/message", icon: MessageSquare },
    { title: "Profile", url: "/profile", icon: UserIcon },
    { title: "Settings", url: "/Settings", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="border-none bg-white">
            <SidebarHeader className="p-0">
                <div className="flex flex-row items-center p-6 gap-3 w-63.75 h-23 flex-none">
                    <div className="flex flex-row justify-center items-center p-[5px_8px] w-[44.02px] h-11 bg-[#2B6CEE1A] rounded-xl flex-none">
                        <PlusSquare className="w-[28.02px] h-8.5 text-[#2B6CEE]" />
                    </div>
                    <div className="flex flex-col items-start p-0 w-30.5 h-9 flex-none">
                        <h1 className=" font-bold text-[16px] leading-5 text-[#0D121B]">Medical Plus</h1>
                        <p className=" font-medium text-[12px] leading-4 text-[#4C669A]">Management System</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {items.map((item) => {
                                const isActive = pathname === item.url;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={`
                                                flex flex-row items-center p-[8px_12px] gap-3 w-55.75 h-11 rounded-2xl transition-all duration-200 group
                                                ${isActive ? "bg-[#2B6CEE1A]" : "hover:bg-[#2B6CEE0D]"}
                                            `}
                                        >
                                            <Link href={item.url} className="flex items-center w-full">
                                                <div className="w-[24.02px] h-7 flex items-center justify-center flex-none">
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

