"use client"
import React, { useEffect, useState } from 'react';
import { MoreVertical, CalendarCog, User } from "lucide-react";
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
import { useSession } from 'next-auth/react';
import AddDoctorModal from '@/components/Newdoctor/Newdoctor';
export interface Doctor {
    _id: string;
    displayName: string;
    phone: string;
    specialty: string;
    yearsOfExperience: number;
    price: number;
    description?: string;

    email?: string;
    gender?: string;

    workingHours?: {
        start: string;
        end: string;
    };

    schedule?: string[];

    image?: string;
    isActive?: boolean;
}
export default function DoctorReport() {
    const { data: session } = useSession();
    const [doctors, setDoctors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDoctors() {
            const userToken = session?.token;
            if (!userToken) return;
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/doctors`, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });
                const result = await response.json();
                setDoctors(result.data?.data || []);
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDoctors();
    }, [session]);

    if (loading) return <div className="p-10 text-center font-sans text-[#4C669A]">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div
                className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
            >
                <div
                    className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                ></div>
            </div>
        </div>
    </div>

    return (
        <div className='min-h-screen w-full flex flex-col bg-[#F8F9FC]'>
            <div className="w-full max-w-7xl mx-auto p-4 md:px-6 grow">
                <header className="w-full pb-4 border-b border-[#E7E8EB] flex items-center justify-between">
                    <h4 className="font-bold text-[20px] leading-6 text-[#0A1B39]">
                        Doctor Report
                    </h4>

                    <div className="flex-shrink-0">
                        <AddDoctorModal />
                    </div>
                </header>

                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 w-full">
                    {doctors.map((doctor) => (
                        <Card key={doctor._id} className="w-full h-40 border-[#E7E8EB] shadow-sm rounded-[6px] overflow-hidden bg-white">
                            <CardContent className="p-5 flex flex-row items-center gap-4 h-full">


                                <div className="flex flex-col justify-between h-full grow py-0">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between items-start w-full">
                                            <div className="flex flex-col">
                                                <h3 className="text-[14px] font-semibold text-[#0A1B39] leading-5 truncate w-32">
                                                    {doctor.displayName}
                                                </h3>
                                                <p className="text-[12px] font-normal text-[#6C7688] uppercase">
                                                    {doctor.specialty}
                                                </p>
                                            </div>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" size="icon" className="w-6 h-6 p-1 border-[#E7E8EB] rounded-[6px]">
                                                        <MoreVertical className="w-3.5 h-3.5 text-[#6C7688]" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-white">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/doctors/${doctor._id}`}>
                                                            View Details
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <p className="text-[12px] font-normal text-[#6C7688] mt-1">
                                            Exp: <span className="font-medium text-[#0A1B39]">{doctor.yearsOfExperience} Years</span>
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-end w-full">
                                        <div className="flex flex-col">
                                            <span className="text-[11px] text-[#6C7688]">Starts From :</span>
                                            <span className="text-[14px] font-bold text-[#2E37A4]">{doctor.price} EGP</span>
                                        </div>
                                        <Button variant="outline" size="icon" className="w-7 h-7 p-1 border-[#E7E8EB] rounded-[6px] shadow-sm">
                                            <CalendarCog className="w-4 h-4 text-[#6C7688]" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </main>
            </div>
        </div>
    );
}
