import React from 'react'
import { ArrowUpRight, CalendarArrowDownIcon, CalendarArrowUp, CalendarClock, CalendarHeart, LucideCalendarSync } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import FormHeader from '@/components/FormHeader/FormHeader'

export default function Appointments() {
    return (
        <div className=' min-h-screen w-full flex flex-col'>
            <div className="w-full max-w-300 mx-auto p-4 md:px-6 grow">
                <header className="w-full pb-4 border-b border-[#E7E8EB]">
                    <h4 className="font-bold text-[20px] leading-6 text-[#0A1B39]">
                        Appointment Report
                    </h4>
                </header>
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-6">

                    <Card className="h-33.5 bg-white border-[#E7E8EB] shadow-[0px_4px_20px_rgba(92,92,92,0.08)] rounded-[5px] flex flex-col justify-between p-5 border">
                        <div className="flex justify-between items-start w-full">
                            <div className="w-8 h-8 bg-[#ECEDF7] border border-[#2E37A4] rounded-sm flex items-center justify-center flex-none">
                                <CalendarClock size={16} strokeWidth={1.5} className="text-[#2E37A4]" />
                            </div>
                            <Badge variant="outline" className="bg-[#F4FBF7] text-[#27AE60] border-[#E9F7EF] rounded-[6px] px-2 py-0.5 flex items-center gap-1 font-normal text-[12px]">
                                +10% <ArrowUpRight className="w-3 h-3" />
                            </Badge>
                        </div>
                        <CardContent className="p-0">
                            <div className="flex flex-col gap-1">
                                <span className="text-[14px] leading-5.25 text-[#6C7688]">Total Appointments</span>
                                <span className="text-[16px] leading-4.75 font-bold text-[#0A1B39]">850</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="h-33.5 bg-white border-[#E7E8EB] shadow-[0px_4px_20px_rgba(92,92,92,0.08)] rounded-[5px] flex flex-col justify-between p-5 border">
                        <div className="flex justify-between items-start w-full">
                            <div className="w-8 h-8 bg-[#ECEDF7] border border-[#27AE60] rounded-sm flex items-center justify-center flex-none">
                                <CalendarArrowUp size={16} strokeWidth={1.5} className="text-[#27AE60]" />
                            </div>
                            <Badge variant="outline" className="bg-[#F4FBF7] text-[#27AE60] border-[#E9F7EF] rounded-[6px] px-2 py-0.5 flex items-center gap-1 font-normal text-[12px]">
                                +11.5% <ArrowUpRight className="w-3 h-3" />
                            </Badge>
                        </div>
                        <CardContent className="p-0">
                            <div className="flex flex-col gap-1">
                                <span className="text-[14px] leading-5.25 text-[#6C7688]"> Completed</span>
                                <span className="text-[16px] leading-4.75 font-bold text-[#0A1B39]">720</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="h-33.5 bg-white border-[#E7E8EB] shadow-[0px_4px_20px_rgba(92,92,92,0.08)] rounded-[5px] flex flex-col justify-between p-5 border">
                        <div className="flex justify-between items-start w-full">
                            <div className="w-8 h-8 bg-[#ECEDF7] border border-[#E2B93B rounded-sm flex items-center justify-center flex-none">
                                <CalendarArrowDownIcon size={16} strokeWidth={1.5} className="text-[#E2B93B]" />
                            </div>
                            <Badge variant="outline" className="bg-[#F4FBF7] text-[#27AE60] border-[#E9F7EF] rounded-[6px] px-2 py-0.5 flex items-center gap-1 font-normal text-[12px]">
                                +8.43% <ArrowUpRight className="w-3 h-3" />
                            </Badge>
                        </div>
                        <CardContent className="p-0">
                            <div className="flex flex-col gap-1">
                                <span className="text-[14px] leading-5.25 text-[#6C7688]">Cancelled</span>
                                <span className="text-[16px] leading-4.75 font-bold text-[#0A1B39]">65</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="h-33.5 bg-white border-[#E7E8EB] shadow-[0px_4px_20px_rgba(92,92,92,0.08)] rounded-[5px] flex flex-col justify-between p-5 border">
                        <div className="flex justify-between items-start w-full">
                            <div className="w-8 h-8 bg-[#ECEDF7] border border-[#EF1E1E] rounded-sm flex items-center justify-center flex-none">
                                <LucideCalendarSync size={16} strokeWidth={1.5} className="text-[#EF1E1E]" />
                            </div>
                            <Badge variant="outline" className="bg-[#F4FBF7] text-[#27AE60] border-[#E9F7EF] rounded-[6px] px-2 py-0.5 flex items-center gap-1 font-normal text-[12px]">
                                +6.58% <ArrowUpRight className="w-3 h-3" />
                            </Badge>
                        </div>
                        <CardContent className="p-0">
                            <div className="flex flex-col gap-1">
                                <span className="text-[14px] leading-5.25 text-[#6C7688]">Rescheduled</span>
                                <span className="text-[16px] leading-4.75 font-bold text-[#0A1B39]">40</span>
                            </div>
                        </CardContent>
                    </Card>


                </main>
                <FormHeader />
            </div>
        </div>

    )
}






