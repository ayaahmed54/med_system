"use client";

import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,

    Button,
    Link,
} from "@heroui/react";
import { Search, Bell, Settings, CalendarDays, UserCircle, CalendarCheck, LogOut, ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function App() {
    const { data: session, status } = useSession()

    if (status === "loading" || status === "unauthenticated") {
        return null
    }

    const user = session?.user
    return (
        <Navbar
            position="static"
            maxWidth="full"
            className="w-full bg-white border-b border-[#E7E8EB] h-13 px-6 py-2 justify-between"
            classNames={{
                wrapper: "max-w-full px-0"
            }}
        >
            <NavbarContent justify="start" className="max-w-100">
                <NavbarItem className="w-full">
                    <Input
                        classNames={{
                            base: "w-[250px] h-[32px]", mainWrapper: "h-full", input: "text-sm", inputWrapper: "h-full font-normal text-gray-500 bg-white border border-[#E7E8EB] shadow-sm rounded-md focus-within:border-blue-500",
                        }}
                        placeholder="Search here..."
                        size="sm"
                        startContent={<Search size={14} className="text-[#9DA4B0]" />}
                        type="search"
                    />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end" className="gap-4 grow-0">
                <div className="flex items-center gap-4">
                    <Button as={Link} href="/appointments"
                        isIconOnly
                        variant="light"
                        className="w-8 h-8 rounded-4xl bg-white border border-[#E7E8EB] shadow-sm min-w-0 p-0"
                    >
                        <CalendarCheck size={16} className="text-[#0A1B39]" />
                    </Button>

                    <Button
                        as={Link}
                        href="/notifications"
                        isIconOnly
                        variant="light"
                        className="w-8 h-8 rounded-4xl bg-white border border-[#E7E8EB] shadow-sm min-w-0 p-0 relative"
                    >
                        <Bell size={16} className="text-[#0A1B39]" />
                    </Button>

                    <Button
                        as={Link}
                        href="/Settings"
                        isIconOnly
                        variant="light"
                        className="w-8 h-8 rounded-4xl bg-white border border-[#E7E8EB] shadow-sm min-w-0 p-0"
                    >
                        <Settings size={16} className="text-[#0A1B39]" />
                    </Button>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-10 px-1 py-1 rounded-full flex items-center gap-2 hover:bg-slate-50 transition-all outline-none">
                            <Avatar className="w-8 h-8 border border-slate-100">
                                <AvatarImage src={user?.profilePic?.url} alt={user?.name || "User"} />
                                <AvatarFallback className="text-[10px] bg-slate-100 text-slate-500 font-bold">
                                    {user?.name?.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56 mt-2 bg-white border-[#E7EBF3] shadow-lg rounded-xl">
                        <DropdownMenuLabel className="font-normal p-4">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-bold text-[#0A1B39]">{user?.name}</p>
                                <p className="text-xs text-slate-500 capitalize">{user?.role || "Medical Staff"}</p>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator className="bg-[#E7EBF3]" />
                        <DropdownMenuItem asChild>
                            <Link href="/Settings" className="flex items-center w-full cursor-pointer py-2.5 px-3 hover:bg-slate-50 transition-colors">
                                <Settings className="mr-2 h-4 w-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-700">Settings</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-[#E7EBF3]" />

                        <DropdownMenuItem onClick={() => signOut({
                            callbackUrl: '/login'
                        })}

                            className="flex items-center text-red-600 w-full cursor-pointer py-2.5 px-3 hover:bg-red-50  transition-colors"
                        >
                            <LogOut className="mr-2 h-4 w-4  text-red-600" />
                            <span className="text-sm font-bold">Log Out</span>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </NavbarContent>
        </Navbar>
    );
}
