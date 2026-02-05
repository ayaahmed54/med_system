"use client";

import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Button,
    Link,
} from "@heroui/react";
import { Search, Bell, Settings, CalendarDays, UserCircle, CalendarCheck } from "lucide-react";

export default function App() {
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

                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Button
                            isIconOnly
                            variant="light"
                            className="w-8 h-8 rounded-4xl bg-white border border-[#E7E8EB] shadow-sm min-w-0 p-0"
                        >
                            <UserCircle size={20} className="text-[#0A1B39]" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem href="/Settings" key="settings">My Settings</DropdownItem>
                        <DropdownItem href="/login" key="logout" color="danger">
                            LogIn
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
