import { ChevronLeft, Building2, CalendarDays } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import doc1 from "../../../assets/images/doc1.jpg"
import Link from "next/link"
import Availability from "@/components/Availability/Availability"
export default function DoctorCard() {
    return (
        <div className="flex flex-col gap-5 w-full max-w-6xl mx-auto">
            <div className="flex items-center gap-1 cursor-pointer w-fit group">
                <ChevronLeft className="w-3.5 h-3.5 text-[#0A1B39]" />
                <span className="font-semibold text-sm">Doctors</span>
            </div>

            <Card className="border-[#E7E8EB] shadow-sm rounded-md overflow-hidden">
                <CardContent className="p-5 flex flex-col md:flex-row gap-4">

                    <div className="w-30 h-30 bg-secondary rounded-md shrink-0 overflow-hidden relative">
                        <Image
                            src={doc1}
                            alt="doctor"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="flex flex-col justify-between grow gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-[#2E37A4]">ID: 12345</span>

                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-lg font-bold text-[#0A1B39]">Dr. Jane Doe</h2>
                                <Badge variant="outline" className="h-6 gap-1 border-[#E7E8EB] text-[#0A1B39] font-medium px-2 shadow-none">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#2F80ED]" />
                                    Available
                                </Badge>

                            </div>

                            <p className="text-sm text-muted-foreground">MBBS, MD - Cardiology</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-[#0A1B39]" />
                            <span className="text-sm text-muted-foreground">City Heart Clinic, New York</span>
                            <Badge className="bg-[#F4FBF7] text-[#27AE60] border-[#E9F7EF] hover:bg-[#F4FBF7] h-6 px-2 gap-1 shadow-none">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#27AE60]" />
                                Verified
                            </Badge>
                        </div>
                    </div>


                    <div className="flex flex-col justify-between items-start md:items-end w-full md:w-40 h-30 border-t md:border-t-0 md:border-s border-[#E7E8EB] pt-4 md:pt-0 md:ps-4">
                        <div className="flex flex-col gap-1 md:items-end">
                            <span className="text-sm text-muted-foreground">Consultation Fee</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg font-bold text-[#0A1B39] leading-tight">$499</span>
                                <span className="text-sm text-muted-foreground">/30min</span>
                            </div>
                        </div>
                        <Button
                            asChild
                            className="w-full md:w-fit bg-[#2E37A4] hover:bg-[#232a7d] text-white h-8 px-2.5 rounded-md gap-1 text-[13px] font-semibold shadow-none"
                        >
                            <Link href="/appointments">
                                <CalendarDays className="w-3.5 h-3.5" />
                                Book Appointment
                            </Link>
                        </Button>
                    </div>

                </CardContent>
            </Card>
            <Availability />
        </div>
    )
}



