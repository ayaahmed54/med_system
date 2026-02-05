import { MoreVertical, CalendarCog, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import doc1 from '../../../assets/images/doc1.jpg';
export default function Doctor() {
    return <>

        <div className=' min-h-screen w-full flex flex-col'>
            <div className="w-full max-w-300 mx-auto p-4 md:px-6 grow">
                <header className="w-full pb-4 border-b border-[#E7E8EB] flex items-center justify-between">
                    <h4 className="font-bold text-[20px] leading-6 text-[#0A1B39]">
                        Doctor Report
                    </h4>

                </header>

                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 w-full max-w-7xl mx-auto">

                    <Card className="w-full h-40 border-[#E7E8EB] shadow-sm rounded-[6px] overflow-hidden bg-white">
                        <CardContent className="p-5 flex flex-row items-center gap-4 h-full">
                            <div className="relative w-30 h-30 bg-gray-100 rounded-[6px] overflow-hidden shrink-0">
                                <Image

                                    src={doc1} alt="doctor"
                                    className="object-cover w-full h-full mb-8"
                                />
                            </div>

                            <div className="flex flex-col justify-between h-fullgrow py-0">
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-start w-full">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-[14px] font-semibold text-[#0A1B39] leading-5.25">
                                                Dr. Michael Thompson
                                            </h3>
                                            <p className="text-[13px] font-normal text-[#6C7688] leading-5">
                                                Cardiologist
                                            </p>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon" className="w-5.5 h-5.5 p-1 ml-5 border-[#E7E8EB] rounded-[6px]">
                                                    <MoreVertical className="w-3.5 h-3.5  text-[#6C7688]" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-white">
                                                <Link
                                                    href="/doctor-details"
                                                    className="w-full cursor-pointer text-[13px]"
                                                >
                                                    Doctor Details
                                                </Link>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className="text-[13px] font-normal text-[#6C7688] leading-5">
                                        Available : <span className="text-[#6C7688]">Mon, 20 Jan 2025</span>
                                    </p>
                                </div>
                                <div className="flex justify-between items-end w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[13px] text-[#6C7688]">Starts From :</span>
                                        <span className="text-[14px] font-semibold text-[#2E37A4]">499</span>
                                    </div>
                                    <Button variant="outline" size="icon" className="w-5.5 h-5.5 p-1 border-[#E7E8EB] rounded-[6px] shadow-sm">
                                        <CalendarCog className="w-3.5 h-3.5 text-[#6C7688]" />
                                    </Button>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-40 border-[#E7E8EB] shadow-sm rounded-[6px] overflow-hidden bg-white">
                        <CardContent className="p-5 flex flex-row items-center gap-4 h-full">
                            <div className="relative w-30 h-30 bg-gray-100 rounded-[6px] overflow-hidden shrink-0">
                                <Image

                                    src={doc1} alt="doctor"
                                    className="object-cover w-full h-full mb-8"
                                />
                            </div>

                            <div className="flex flex-col justify-between h-fullgrow py-0">
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-start w-full">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-[14px] font-semibold text-[#0A1B39] leading-5.25">
                                                Dr. Michael Thompson
                                            </h3>
                                            <p className="text-[13px] font-normal text-[#6C7688] leading-5">
                                                Cardiologist
                                            </p>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon" className="w-5.5 h-5.5 p-1 ml-5 border-[#E7E8EB] rounded-[6px]">
                                                    <MoreVertical className="w-3.5 h-3.5  text-[#6C7688]" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-white">
                                                <Link
                                                    href="/doctor-details"
                                                    className="w-full cursor-pointer text-[13px]"
                                                >
                                                    Doctor Details
                                                </Link>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className="text-[13px] font-normal text-[#6C7688] leading-5">
                                        Available : <span className="text-[#6C7688]">Mon, 20 Jan 2025</span>
                                    </p>
                                </div>
                                <div className="flex justify-between items-end w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[13px] text-[#6C7688]">Starts From :</span>
                                        <span className="text-[14px] font-semibold text-[#2E37A4]">499</span>
                                    </div>
                                    <Button variant="outline" size="icon" className="w-5.5 h-5.5 p-1 border-[#E7E8EB] rounded-[6px] shadow-sm">
                                        <CalendarCog className="w-3.5 h-3.5 text-[#6C7688]" />
                                    </Button>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-40 border-[#E7E8EB] shadow-sm rounded-[6px] overflow-hidden bg-white">
                        <CardContent className="p-5 flex flex-row items-center gap-4 h-full">
                            <div className="relative w-30 h-30 bg-gray-100 rounded-[6px] overflow-hidden shrink-0">
                                <Image

                                    src={doc1} alt="doctor"
                                    className="object-cover w-full h-full mb-8"
                                />
                            </div>

                            <div className="flex flex-col justify-between h-fullgrow py-0">
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-start w-full">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-[14px] font-semibold text-[#0A1B39] leading-5.25">
                                                Dr. Michael Thompson
                                            </h3>
                                            <p className="text-[13px] font-normal text-[#6C7688] leading-5">
                                                Cardiologist
                                            </p>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon" className="w-5.5 h-5.5 p-1 ml-5 border-[#E7E8EB] rounded-[6px]">
                                                    <MoreVertical className="w-3.5 h-3.5  text-[#6C7688]" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-white">
                                                <Link
                                                    href="/doctor-details"
                                                    className="w-full cursor-pointer text-[13px]"
                                                >
                                                    Doctor Details
                                                </Link>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className="text-[13px] font-normal text-[#6C7688] leading-5">
                                        Available : <span className="text-[#6C7688]">Mon, 20 Jan 2025</span>
                                    </p>
                                </div>
                                <div className="flex justify-between items-end w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[13px] text-[#6C7688]">Starts From :</span>
                                        <span className="text-[14px] font-semibold text-[#2E37A4]">499</span>
                                    </div>
                                    <Button variant="outline" size="icon" className="w-5.5 h-5.5 p-1 border-[#E7E8EB] rounded-[6px] shadow-sm">
                                        <CalendarCog className="w-3.5 h-3.5 text-[#6C7688]" />
                                    </Button>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-40 border-[#E7E8EB] shadow-sm rounded-[6px] overflow-hidden bg-white">
                        <CardContent className="p-5 flex flex-row items-center gap-4 h-full">
                            <div className="relative w-30 h-30 bg-gray-100 rounded-[6px] overflow-hidden shrink-0">
                                <Image

                                    src={doc1} alt="doctor"
                                    className="object-cover w-full h-full mb-8"
                                />
                            </div>

                            <div className="flex flex-col justify-between h-fullgrow py-0">
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-start w-full">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-[14px] font-semibold text-[#0A1B39] leading-5.25">
                                                Dr. Michael Thompson
                                            </h3>
                                            <p className="text-[13px] font-normal text-[#6C7688] leading-5">
                                                Cardiologist
                                            </p>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon" className="w-5.5 h-5.5 p-1 ml-5 border-[#E7E8EB] rounded-[6px]">
                                                    <MoreVertical className="w-3.5 h-3.5  text-[#6C7688]" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-white">
                                                <Link
                                                    href="/doctor-details"
                                                    className="w-full cursor-pointer text-[13px]"
                                                >
                                                    Doctor Details
                                                </Link>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className="text-[13px] font-normal text-[#6C7688] leading-5">
                                        Available : <span className="text-[#6C7688]">Mon, 20 Jan 2025</span>
                                    </p>
                                </div>
                                <div className="flex justify-between items-end w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[13px] text-[#6C7688]">Starts From :</span>
                                        <span className="text-[14px] font-semibold text-[#2E37A4]">499</span>
                                    </div>
                                    <Button variant="outline" size="icon" className="w-5.5 h-5.5 p-1 border-[#E7E8EB] rounded-[6px] shadow-sm">
                                        <CalendarCog className="w-3.5 h-3.5 text-[#6C7688]" />
                                    </Button>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-40 border-[#E7E8EB] shadow-sm rounded-[6px] overflow-hidden bg-white">
                        <CardContent className="p-5 flex flex-row items-center gap-4 h-full">
                            <div className="relative w-30 h-30 bg-gray-100 rounded-[6px] overflow-hidden shrink-0">
                                <Image

                                    src={doc1} alt="doctor"
                                    className="object-cover w-full h-full mb-8"
                                />
                            </div>

                            <div className="flex flex-col justify-between h-fullgrow py-0">
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-start w-full">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-[14px] font-semibold text-[#0A1B39] leading-5.25">
                                                Dr. Michael Thompson
                                            </h3>
                                            <p className="text-[13px] font-normal text-[#6C7688] leading-5">
                                                Cardiologist
                                            </p>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon" className="w-5.5 h-5.5 p-1 ml-5 border-[#E7E8EB] rounded-[6px]">
                                                    <MoreVertical className="w-3.5 h-3.5  text-[#6C7688]" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-white">
                                                <Link
                                                    href="/doctor-details"
                                                    className="w-full cursor-pointer text-[13px]"
                                                >
                                                    Doctor Details
                                                </Link>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className="text-[13px] font-normal text-[#6C7688] leading-5">
                                        Available : <span className="text-[#6C7688]">Mon, 20 Jan 2025</span>
                                    </p>
                                </div>
                                <div className="flex justify-between items-end w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[13px] text-[#6C7688]">Starts From :</span>
                                        <span className="text-[14px] font-semibold text-[#2E37A4]">499</span>
                                    </div>
                                    <Button variant="outline" size="icon" className="w-5.5 h-5.5 p-1 border-[#E7E8EB] rounded-[6px] shadow-sm">
                                        <CalendarCog className="w-3.5 h-3.5 text-[#6C7688]" />
                                    </Button>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-40 border-[#E7E8EB] shadow-sm rounded-[6px] overflow-hidden bg-white">
                        <CardContent className="p-5 flex flex-row items-center gap-4 h-full">
                            <div className="relative w-30 h-30 bg-gray-100 rounded-[6px] overflow-hidden shrink-0">
                                <Image

                                    src={doc1} alt="doctor"
                                    className="object-cover w-full h-full mb-8"
                                />
                            </div>

                            <div className="flex flex-col justify-between h-fullgrow py-0">
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-start w-full">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-[14px] font-semibold text-[#0A1B39] leading-5.25">
                                                Dr. Michael Thompson
                                            </h3>
                                            <p className="text-[13px] font-normal text-[#6C7688] leading-5">
                                                Cardiologist
                                            </p>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon" className="w-5.5 h-5.5 p-1 ml-5 border-[#E7E8EB] rounded-[6px]">
                                                    <MoreVertical className="w-3.5 h-3.5  text-[#6C7688]" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-white">
                                                <Link
                                                    href="/doctor-details"
                                                    className="w-full cursor-pointer text-[13px]"
                                                >
                                                    Doctor Details
                                                </Link>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className="text-[13px] font-normal text-[#6C7688] leading-5">
                                        Available : <span className="text-[#6C7688]">Mon, 20 Jan 2025</span>
                                    </p>
                                </div>
                                <div className="flex justify-between items-end w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[13px] text-[#6C7688]">Starts From :</span>
                                        <span className="text-[14px] font-semibold text-[#2E37A4]">499</span>
                                    </div>
                                    <Button variant="outline" size="icon" className="w-5.5 h-5.5 p-1 border-[#E7E8EB] rounded-[6px] shadow-sm">
                                        <CalendarCog className="w-3.5 h-3.5 text-[#6C7688]" />
                                    </Button>
                                </div>

                            </div>
                        </CardContent>
                    </Card>


                </main>


            </div>
        </div>

    </>;
}

