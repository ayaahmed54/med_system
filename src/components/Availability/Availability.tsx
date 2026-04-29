"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react";

export default function Availability({ doctorData }: { doctorData: any }) {

    const availableDays = doctorData?.schedule || [];
    const workingHours = doctorData?.workingHours;
    const description = doctorData?.description;

    return <>
        <div className="flex justify-between gap-3">
            <Card className="w-125 border-[#E7E8EB] shadow-sm rounded-md bg-white">
                <CardContent className="p-5 flex flex-col gap-5">
                    <h3 className="text-[18px] font-bold text-[#0A1B39]">Availability Schedule</h3>

                    {availableDays.length > 0 ? (
                        <Tabs defaultValue={availableDays[0]} className="w-full">
                            <TabsList className="w-full bg-transparent border-b border-[#E7E8EB] rounded-none h-auto p-0 flex justify-start gap-6">
                                {availableDays.map((day: string) => (
                                    <TabsTrigger
                                        key={day}
                                        value={day}
                                        className="pb-2 px-2 text-sm font-medium text-[#6C7688] capitalize rounded-none border-b-2 border-transparent data-[state=active]:border-[#2E37A4] data-[state=active]:text-[#2E37A4] transition-all shadow-none"
                                    >
                                        {day}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {availableDays.map((day: string) => (
                                <TabsContent key={day} value={day} className="mt-6">
                                    <div className="flex flex-wrap gap-3">
                                        <Badge
                                            variant="secondary"
                                            className="bg-[#F5F6F8] text-[#0A1B39] border-none py-2.5 px-4 flex items-center gap-2 rounded-md font-medium text-[13px]"
                                        >
                                            <Clock size={14} className="text-[#2E37A4]" />
                                            {workingHours?.start} - {workingHours?.end}
                                        </Badge>
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    ) : (
                        <p className="text-sm text-muted-foreground italic">No schedule available for this doctor.</p>
                    )}
                </CardContent>
            </Card>
            <Card className="w-full border-[#E7EBF3] shadow-sm rounded-xl bg-white">
                <CardContent className="p-6 flex flex-col gap-4">
                    <h3 className="text-[18px] font-bold text-[#0D121B]">
                        About Doctor
                    </h3>
                    <p className="text-[14px] leading-5.75 text-[#4C669A]">
                        {description}
                    </p>

                </CardContent>
            </Card>
        </div>

    </>;
}


