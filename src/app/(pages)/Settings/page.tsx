"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Settings from "./_Components/setting/setting";


export default function SettingPage() {
    return (
        <div className="min-h-screen bg-[#F6F6F8] p-8">
            <div className="mb-8 flex justify-between items-end">
                <div className="ml-2">
                    <h1 className="text-[30px] font-bold text-[#0D121B] tracking-tight">Settings</h1>
                    <p className="text-[14px] text-[#4C669A] mt-1">
                        Manage your account and customize your medical system preferences
                    </p>
                </div>
                <Button
                    variant="ghost"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="text-[#EF4444] hover:bg-red-50 hover:text-[#DC2626] rounded-xl px-6 gap-2 font-bold transition-all"
                >
                    <LogOut className="w-5 h-5" /> Logout
                </Button>
            </div>
            <Settings />
        </div>
    );
}





