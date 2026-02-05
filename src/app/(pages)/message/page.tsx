import React from "react";
import { Search, MoreVertical, MessageCircleMoreIcon, MoreHorizontal, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Smile, Mic, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function message() {
    return (
        <div className="mx-auto max-w-300 px-6 py-2 h-screen flex flex-col">
            <div className="flex w-full flex-col gap-4 mb-6 shrink-0">
                <div className="flex items-center justify-between px-1">
                    <h1 className="text-[24px] font-bold tracking-tight text-[#0A1B39]">Chat</h1>
                    <div className="flex items-center gap-4">
                    </div>
                </div>
                <Separator className="bg-[#E7E8EB]" />
            </div>
            <div className="flex flex-1 gap-6 overflow-hidden min-h-0 mb-4">

                <div className="flex w-90 shrink-0 flex-col rounded-xl border border-[#E7E8EB] bg-white shadow-sm overflow-hidden">

                    <div className="flex h-18 shrink-0 items-center justify-between border-b border-[#E7E8EB] px-5 bg-slate-50/50">
                        <h2 className="text-[18px] font-bold text-[#0A1B39]">Messages</h2>
                        <div className="flex items-center gap-2 text-[#6C7688]">
                            <Search className="h-4 w-4 cursor-pointer hover:text-[#0A1B39] transition-colors" />
                            <MoreVertical className="h-4 w-4 cursor-pointer hover:text-[#0A1B39] transition-colors" />
                        </div>
                    </div>
                    <ScrollArea className="flex-1 w-full overflow-x-hidden">
                        <div className="flex flex-col gap-2 p-3">
                            <div className="flex h-18 w-full cursor-pointer items-center gap-3 rounded-lg bg-[#F5F6F8] p-3 transition-all hover:shadow-sm">
                                <div className="relative shrink-0">
                                    <Avatar className="h-11 w-11 border border-white shadow-sm">
                                        <AvatarImage src="https://github.com" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#27AE60]"></span>
                                </div>

                                <div className="flex flex-1 flex-col overflow-hidden">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-[14px] font-semibold text-[#0A1B39] truncate">John Doe</span>
                                        <span className="text-[11px] font-medium text-[#6C7688]">12:45 PM</span>
                                    </div>
                                    <p className="text-[13px] text-[#6C7688] truncate leading-tight">Can you check the new update?</p>
                                </div>
                            </div>
                            <div className="flex h-18 w-full cursor-pointer items-center gap-3 rounded-lg bg-[#F5F6F8] p-3 transition-all hover:shadow-sm">
                                <div className="relative shrink-0">
                                    <Avatar className="h-11 w-11 border border-white shadow-sm">
                                        <AvatarImage src="https://github.com" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#27AE60]"></span>
                                </div>

                                <div className="flex flex-1 flex-col overflow-hidden">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-[14px] font-semibold text-[#0A1B39] truncate">John Doe</span>
                                        <span className="text-[11px] font-medium text-[#6C7688]">12:45 PM</span>
                                    </div>
                                    <p className="text-[13px] text-[#6C7688] truncate leading-tight">Can you check the new update?</p>
                                </div>
                            </div>
                            <div className="flex h-18 w-full cursor-pointer items-center gap-3 rounded-lg bg-[#F5F6F8] p-3 transition-all hover:shadow-sm">
                                <div className="relative shrink-0">
                                    <Avatar className="h-11 w-11 border border-white shadow-sm">
                                        <AvatarImage src="https://github.com" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#27AE60]"></span>
                                </div>

                                <div className="flex flex-1 flex-col overflow-hidden">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-[14px] font-semibold text-[#0A1B39] truncate">John Doe</span>
                                        <span className="text-[11px] font-medium text-[#6C7688]">12:45 PM</span>
                                    </div>
                                    <p className="text-[13px] text-[#6C7688] truncate leading-tight">Can you check the new update?</p>
                                </div>
                            </div>
                            <div className="flex h-18 w-full cursor-pointer items-center gap-3 rounded-lg bg-[#F5F6F8] p-3 transition-all hover:shadow-sm">
                                <div className="relative shrink-0">
                                    <Avatar className="h-11 w-11 border border-white shadow-sm">
                                        <AvatarImage src="https://github.com" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#27AE60]"></span>
                                </div>

                                <div className="flex flex-1 flex-col overflow-hidden">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-[14px] font-semibold text-[#0A1B39] truncate">John Doe</span>
                                        <span className="text-[11px] font-medium text-[#6C7688]">12:45 PM</span>
                                    </div>
                                    <p className="text-[13px] text-[#6C7688] truncate leading-tight">Can you check the new update?</p>
                                </div>
                            </div>
                            <div className="flex h-18 w-full cursor-pointer items-center gap-3 rounded-lg bg-[#F5F6F8] p-3 transition-all hover:shadow-sm">
                                <div className="relative shrink-0">
                                    <Avatar className="h-11 w-11 border border-white shadow-sm">
                                        <AvatarImage src="https://github.com" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#27AE60]"></span>
                                </div>

                                <div className="flex flex-1 flex-col overflow-hidden">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-[14px] font-semibold text-[#0A1B39] truncate">John Doe</span>
                                        <span className="text-[11px] font-medium text-[#6C7688]">12:45 PM</span>
                                    </div>
                                    <p className="text-[13px] text-[#6C7688] truncate leading-tight">Can you check the new update?</p>
                                </div>
                            </div>

                        </div>
                    </ScrollArea>
                </div>

                <main className="flex-1 rounded-xl border border-[#E7E8EB] bg-white shadow-sm flex flex-col items-center justify-center p-8 text-center">

                    <div className="flex items-center justify-center p-4 pt-100  w-full">
                        <div className="flex items-center gap-3 w-full max-w-lg">
                            <Button size="icon" className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full shrink-0">
                                <MoreHorizontal className="w-5 h-5 text-white" />
                            </Button>
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="w-10 h-10 border-gray-300 hover:bg-gray-100 rounded-full">
                                    <Smile className="w-5 h-5 text-gray-500" />
                                </Button>
                                <Button variant="outline" size="icon" className="w-10 h-10 border-gray-300 hover:bg-gray-100 rounded-full">
                                    <Mic className="w-5 h-5 text-gray-500" />
                                </Button>
                            </div>
                            <div className="flex grow">
                                <Input
                                    type="text"
                                    placeholder="Type your message here..."
                                    className="w-full h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm placeholder-gray-400 p-4"
                                />
                            </div>
                            <Button size="icon" className="w-12 h-12 bg-[#4f46e5] hover:bg-[#4338ca] rounded-lg shadow-md shrink-0">
                                <Send className="w-5 h-5 text-white transform rotate-45 translate-x-px -translate-y-px" />
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}



