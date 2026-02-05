import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { BadgeCheckIcon, Bookmark, CalendarIcon, FileBadge, Globe, Mail, MapPin, Phone } from "lucide-react";

export default function AvailabilitySchedule() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const slots = ["11:30 AM - 12:30 PM ", "11:30 AM - 12:30 PM", "01:00 PM - 02:00 PM", "03:00 PM - 04:00 PM", "11:30 AM - 12:30 PM "];
    const infoItems = [
        {
            icon: <Bookmark className="w-4 h-4 text-[#0A1B39]" />,
            label: "Medical Liscence Number",
            value: "ML566659898",
        },
        {
            icon: <Phone className="w-4 h-4 text-[#0A1B39]" />,
            label: "Phone Number",
            value: "+1 (555) 000-0000",
        },
        {
            icon: <Mail className="w-4 h-4 text-[#0A1B39]" />,
            label: "Email Address",
            value: "dr.johnsmith@example.com",
        },
        {
            icon: <MapPin className="w-4 h-4 text-[#0A1B39]" />,
            label: "Location",
            value: "123 Medical Center Dr, NY",
        },
        {
            icon: <CalendarIcon className="w-4 h-4 text-[#0A1B39]" />,
            label: "DOB",
            value: "25 Jan 1990",
        },


    ]
    return <>
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-279 mx-auto p-4">

            <div className="flex flex-col gap-6 grow max-w-184">

                <Card className="w-full min-h-52.25 border-[#E7E8EB] shadow-sm rounded-[6px] bg-white">
                    <CardContent className="p-5 flex flex-col gap-5">
                        <h3 className="text-[18px] font-bold text-[#0A1B39]">Availability</h3>
                        <Tabs defaultValue="Monday" className="w-full">
                            <TabsList className="w-full bg-transparent border-b border-[#E7E8EB] rounded-none h-auto p-0 flex justify-between">
                                {days.map((day) => (
                                    <TabsTrigger
                                        key={day}
                                        value={day}
                                        className="flex-1 py-2 text-sm font-medium text-[#0A1B39] rounded-none border-b-2 border-transparent data-[state=active]:border-[#2E37A4] data-[state=active]:text-[#2E37A4] transition-none shadow-none"
                                    >
                                        {day}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            {days.map((day) => (
                                <TabsContent key={day} value={day} className="mt-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {slots.map((slot, index) => (
                                            <Badge key={index} variant="secondary" className="bg-[#F5F6F8] text-[#0A1B39] border-none py-2 px-3 justify-center rounded-md font-medium text-[13px] cursor-pointer">
                                                {slot}
                                            </Badge>
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </CardContent>
                </Card>
                <Card className="w-full min-h-52.75 border-[#E7E8EB] shadow-sm rounded-[6px] bg-white">
                    <CardContent className="p-5 flex flex-col gap-5">
                        <h1 className="text-[18px] font-bold text-[#0A1B39]">Short Bio</h1>
                        <p className="text-[14px] font-normal leading-5.25 text-[#6C7688]">
                            Dr. John Smith has been practicing family medicine for over 10 years. She has extensive experience in managing chronic illnesses, preventive care, and treating a wide range of medical conditions for patients of all ages. Dr. Smith is dedicated to providing patient-centered care and emphasizes building long-term relationships with her patients.

                        </p>
                    </CardContent>
                </Card>
                <Card className="w-full border-[#E7E8EB] shadow-sm rounded-[6px] bg-white">
                    <CardContent className="p-5 flex flex-col gap-5">
                        <h3 className="text-[18px] font-bold text-[#0A1B39]">Education</h3>
                        <div className="flex flex-col relative ml-1">
                            <div className="relative pl-6 pb-6">
                                <div className="absolute left-0.75 top-3 w-px h-full border-l border-dashed border-[#E7E8EB]" />
                                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#2E37A4] z-10" />
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-[16px] font-bold text-[#0A1B39]">Harvard Medical School</h4>
                                    <span className="text-[14px] text-[#6C7688]">MD in Cardiology, 2010 - 2014</span>
                                </div>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#2E37A4] z-10" />
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-[16px] font-bold text-[#0A1B39]">Johns Hopkins University</h4>
                                    <span className="text-[14px] text-[#6C7688]">Residency in Internal Medicine, 2014 - 2017</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full border-[#E7E8EB] shadow-sm rounded-[6px] bg-white">
                    <CardContent className="p-5 flex flex-col gap-5">
                        <h3 className="text-[18px] font-bold text-[#0A1B39] leading-5.5">Awards & Recognition</h3>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2">
                                    <BadgeCheckIcon size={16} />
                                    <h4 className="text-[16px] font-bold text-[#0A1B39]">Top Doctor Award (2023)</h4>
                                </div>
                                <p className="text-[14px] text-[#6C7688] leading-5.25">
                                    Recognized by U.S. News & World Report for outstanding achievements in family medicine.
                                </p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2">
                                    <BadgeCheckIcon size={16} />
                                    <h4 className="text-[16px] font-bold text-[#0A1B39]">Patient Choice Award (2022)</h4>
                                </div>
                                <p className="text-[14px] text-[#6C7688] leading-5.25">
                                    Recognized by U.S. News & World Report for outstanding achievements in family medicine.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full border-[#E7E8EB] shadow-sm rounded-[6px] bg-white">
                    <CardContent className="p-5 flex flex-col gap-5">
                        <h3 className="text-[18px] font-bold text-[#0A1B39] leading-5.5">Certifications</h3>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2">
                                    <FileBadge size={16} />
                                    <h4 className="text-[16px] font-bold text-[#0A1B39]">
                                        Certification by the American Board of Family Medicine (ABFM), 2015</h4>
                                </div>
                                <p className="text-[14px] text-[#6C7688] leading-5.25">
                                    Demonstrates mastery of comprehensive, ongoing care for individuals and families, across all ages and genders.
                                </p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2">
                                    <FileBadge size={16} />
                                    <h4 className="text-[16px] font-bold text-[#0A1B39]">
                                        Certification by the American Board of Family Medicine (ABFM), 2015</h4>
                                </div>
                                <p className="text-[14px] text-[#6C7688] leading-5.25">
                                    Demonstrates mastery of comprehensive, ongoing care for individuals and families, across all ages and genders.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="w-full lg:w-89 shrink-0">
                <Card className="h-130 border-[#E7E8EB] shadow-sm rounded-[6px] bg-white">
                    <CardContent className="p-5 flex flex-col gap-5">
                        <h3 className="text-[18px] font-bold text-[#0A1B39]">Info</h3>
                        <div className="flex flex-col gap-5">
                            {infoItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#F5F6F8] rounded-full flex items-center justify-center shrink-0">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-semibold text-[#0A1B39]">{item.label}</span>
                                        <span className="text-[14px] text-[#6C7688] truncate w-55">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    </>
}
