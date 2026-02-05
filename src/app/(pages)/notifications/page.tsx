import { Search, Calendar, Check, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import doc1 from "../../../assets/images/doc1.jpg"
export default function Notification() {
    return (
        <div className="mx-auto p-4 w-full">
            <Card className="shadow-xl border-[#E7E8EB] overflow-hidden">
                <CardHeader className="p-5 border-b">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-[#0A1B39] font-bold text-xl">
                            Notifications
                        </CardTitle>
                        <div className="flex gap-3 text-sm">
                            <Button variant="outline" className="h-9 px-4 text-[#212529] border-[#CED1D7]">
                                <Check className="w-3 h-3 mr-2" />
                                Mark all as read
                            </Button>
                            <Button variant="outline" className="h-9 px-4 text-[#EF1E1E] border-[#CED1D7]">
                                <X className="w-3 h-3 mr-2" />
                                Delete all
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <div className="p-5 flex gap-4 items-center border-b">
                    <div className="relative w-55'">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search..."
                            className="pl-10 h-9 border-[#D9D9D9] shadow-sm text-sm w-full"
                        />
                    </div>
                </div>

                <CardContent className="p-5">
                    <div className="space-y-3">
                        <div className="flex items-center p-4 border border-[#CED1D7] bg-white shadow-sm rounded-lg">
                            <div className="h-11.25 w-11.25 rounded-full mr-4">
                                <Image
                                    src={doc1}
                                    alt="avatar"
                                    className="h-11.25 w-11.25 rounded-full mr-4 object-cover bg-[#F5F5F5]"
                                />
                            </div>
                            <div className="grow">
                                <p className="font-semibold text-sm text-[#0A1B39]">Dr. Smith</p>
                                <p className="text-xs text-[#6C7688] truncate">updated the surgery schedule.</p>
                            </div>
                            <span className="text-xs text-[#6C7688] shrink-0 ml-4">2 mins ago</span>
                            <div className="flex gap-2 ml-4 shrink-0">
                                <Button variant="outline" className="h-8 px-4 text-sm text-[#6C7688] border-[#CED1D7]">Decline</Button>
                                <Button className="h-8 px-4 text-sm bg-[#3C449C] hover:bg-[#2E37A4]">Accept</Button>
                            </div>
                        </div>

                        <div className="flex items-center p-4 border border-[#CED1D7] bg-white shadow-sm rounded-lg">
                            <div className="h-11.25 w-11.25 rounded-full mr-4">
                                <Image
                                    src={doc1}
                                    alt="avatar"
                                    className="h-11.25 w-11.25 rounded-full mr-4 object-cover bg-[#F5F5F5]"
                                />
                            </div>
                            <div className="grow">
                                <p className="font-semibold text-sm text-[#0A1B39]">Dr. Smith</p>
                                <p className="text-xs text-[#6C7688] truncate">updated the surgery schedule.</p>
                            </div>
                            <span className="text-xs text-[#6C7688] shrink-0 ml-4">2 mins ago</span>

                        </div>
                        <div className="flex items-center p-4 border border-[#CED1D7] bg-white shadow-sm rounded-lg">
                            <div className="h-11.25 w-11.25 rounded-full mr-4">
                                <Image
                                    src={doc1}
                                    alt="avatar"
                                    className="h-11.25 w-11.25 rounded-full mr-4 object-cover bg-[#F5F5F5]"
                                />
                            </div>
                            <div className="grow">
                                <p className="font-semibold text-sm text-[#0A1B39]">Dr. Smith</p>
                                <p className="text-xs text-[#6C7688] truncate">updated the surgery schedule.</p>
                            </div>
                            <span className="text-xs text-[#6C7688] shrink-0 ml-4">2 mins ago</span>

                        </div>
                        <div className="flex items-center p-4 border border-[#CED1D7] bg-white shadow-sm rounded-lg">
                            <div className="h-11.25 w-11.25 rounded-full mr-4">
                                <Image
                                    src={doc1}
                                    alt="avatar"
                                    className="h-11.25 w-11.25 rounded-full mr-4 object-cover bg-[#F5F5F5]"
                                />
                            </div>
                            <div className="grow">
                                <p className="font-semibold text-sm text-[#0A1B39]">Dr. Smith</p>
                                <p className="text-xs text-[#6C7688] truncate">updated the surgery schedule.</p>
                            </div>
                            <span className="text-xs text-[#6C7688] shrink-0 ml-4">2 mins ago</span>

                        </div>
                        <div className="flex items-center p-4 border border-[#CED1D7] bg-white shadow-sm rounded-lg">
                            <div className="h-11.25 w-11.25 rounded-full mr-4">
                                <Image
                                    src={doc1}
                                    alt="avatar"
                                    className="h-11.25 w-11.25 rounded-full mr-4 object-cover bg-[#F5F5F5]"
                                />
                            </div>
                            <div className="grow">
                                <p className="font-semibold text-sm text-[#0A1B39]">Dr. Smith</p>
                                <p className="text-xs text-[#6C7688] truncate">updated the surgery schedule.</p>
                            </div>
                            <span className="text-xs text-[#6C7688] shrink-0 ml-4">2 mins ago</span>

                        </div>
                    </div>
                </CardContent>

            </Card>
        </div>
    );
}


