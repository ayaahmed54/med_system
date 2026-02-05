
import { ArrowDownLeft, ArrowDownRight, ArrowUpRight, Bookmark, CalendarArrowDownIcon, CalendarArrowUp, CalendarClock, CalendarHeart, LucideCalendarSync, LucideUserRoundMinus, Plus, UserMinus, UserPlus, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import TablePatients from '@/components/tablePatients/tablePatients'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function patients() {
    return <>
        <div className=' min-h-screen w-full flex flex-col'>
            <div className="w-full max-w-300 mx-auto p-4 md:px-6 grow">
                <header className="w-full pb-4 border-b border-[#E7E8EB] flex items-center justify-between">
                    <h4 className="font-bold text-[20px] leading-6 text-[#0A1B39]">
                        Patients Report
                    </h4>

                </header>

                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6 w-full">

                    <Card className="w-full h-32 bg-white border-[#E7E8EB] shadow-[0px_4px_20px_rgba(92,92,92,0.08)] rounded-[5px] p-5 flex flex-col gap-3 isolation-isolate">
                        <div className="flex flex-row items-center justify-between w-full h-12 gap-2">
                            <div className="flex flex-col gap-1 grow">
                                <span className="text-[14px] leading-5.25 text-[#6C7688] font-normal ">
                                    Total Patients
                                </span>
                                <span className="text-[16px] leading-4.75 font-bold text-[#0A1B39] ">
                                    1,240
                                </span>
                            </div>
                            <div className="w-12 h-12 bg-[#2E37A4] rounded-full flex items-center justify-center flex-none">
                                <Users size={24} className="text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="w-full h-px bg-[#E7E8EB]" />
                            <div className="flex flex-row items-center gap-1 ">
                                <ArrowUpRight className='text-[#27AE60]' size={14} strokeWidth={2.5} />
                                <p className="text-[13px] leading-5 font-normal text-[#6C7688]">
                                    <span className='text-[#27AE60]'>10%</span>  from last month
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full h-32 bg-white border-[#E7E8EB] shadow-[0px_4px_20px_rgba(92,92,92,0.08)] rounded-[5px] p-5 flex flex-col gap-3 isolation-isolate">
                        <div className="flex flex-row items-center justify-between w-full h-12 gap-2">
                            <div className="flex flex-col gap-1 grow">
                                <span className="text-[14px] leading-5.25 text-[#6C7688] font-normal ">
                                    New Patients
                                </span>
                                <span className="text-[16px] leading-4.75 font-bold text-[#0A1B39] ">
                                    210
                                </span>
                            </div>
                            <div className="w-12 h-12 bg-[#27AE60] rounded-full flex items-center justify-center flex-none">
                                <UserPlus size={24} className="text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="w-full h-px bg-[#E7E8EB]" />
                            <div className="flex flex-row items-center gap-1 ">
                                <ArrowUpRight className='text-[#27AE60]' size={14} strokeWidth={2.5} />
                                <p className="text-[13px] leading-5 font-normal text-[#6C7688]">
                                    <span className='text-[#27AE60]'>11.4%</span>  from last month
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full h-32 bg-white border-[#E7E8EB] shadow-[0px_4px_20px_rgba(92,92,92,0.08)] rounded-[5px] p-5 flex flex-col gap-3 isolation-isolate">
                        <div className="flex flex-row items-center justify-between w-full h-12 gap-2">
                            <div className="flex flex-col gap-1 grow">
                                <span className="text-[14px] leading-5.25 text-[#6C7688] font-normal ">
                                    Appointment Booked
                                </span>
                                <span className="text-[16px] leading-4.75 font-bold text-[#0A1B39] ">
                                    500
                                </span>
                            </div>
                            <div className="w-12 h-12 bg-[#E2B93B] rounded-full flex items-center justify-center flex-none">
                                <Bookmark size={24} className="text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="w-full h-px bg-[#E7E8EB]" />
                            <div className="flex flex-row items-center gap-1 ">
                                <ArrowUpRight className='text-[#27AE60]' size={14} strokeWidth={2.5} />
                                <p className="text-[13px] leading-5 font-normal text-[#6C7688]">
                                    <span className='text-[#27AE60]'>8.25%</span> from last month
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full h-32 bg-white border-[#E7E8EB] shadow-[0px_4px_20px_rgba(92,92,92,0.08)] rounded-[5px] p-5 flex flex-col gap-3 isolation-isolate">
                        <div className="flex flex-row items-center justify-between w-full h-12 gap-2">
                            <div className="flex flex-col gap-1 grow">
                                <span className="text-[14px] leading-5.25 text-[#6C7688] font-normal ">
                                    Returning Patients
                                </span>
                                <span className="text-[16px] leading-4.75 font-bold text-[#0A1B39] ">
                                    380
                                </span>
                            </div>
                            <div className="w-12 h-12 bg-[#EF1E1E] rounded-full flex items-center justify-center flex-none">
                                <LucideUserRoundMinus size={24} className="text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="w-full h-px bg-[#E7E8EB]" />
                            <div className="flex flex-row items-center gap-1 ">
                                <ArrowDownRight className='text-[#EF1E1E]' size={14} strokeWidth={2.5} />
                                <p className="text-[13px] leading-5 font-normal text-[#6C7688]">
                                    <span className='text-[#EF1E1E]'>7.45%</span>  from last month
                                </p>
                            </div>
                        </div>
                    </Card>


                </main>
            </div>
            <TablePatients />
        </div>

    </>
}
