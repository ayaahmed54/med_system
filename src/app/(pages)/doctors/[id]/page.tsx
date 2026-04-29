"use client"

import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { useSession } from 'next-auth/react';
import { ChevronLeft, Building2, CalendarDays, Loader2, User, Clock, MapPin, CheckCircle2, Mail, Phone, DollarSign, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

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

export default function DoctorCard() {
    const { id } = useParams();
    const { data: session } = useSession();
    const [doctor, setDoctor] = useState<Doctor | null>(null);
  
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDoctorDetails() {
            const userToken = session?.token;
            if (!userToken || !id) return;
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/doctors/${id}`, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });
                const result = await response.json();
                setDoctor(result.data?.data || result.data);
            } catch (error) {
                console.error("Error fetching doctor details:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDoctorDetails();
    }, [id, session]);

    if (loading) return (<div className="p-10 text-center font-sans text-[#4C669A]">
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
    );

    if (!doctor) return <div className="p-10 text-center">Doctor not found.</div>;

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6">
        
            <Card className="p-6 rounded-2xl mb-6">
                <CardContent className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
                        {doctor.displayName?.charAt(0) || "D"}
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl font-bold">
                            {doctor.displayName}
                        </h2>

                        <p className="text-blue-600">
                            {capitalize(doctor.specialty)}
                        </p>

                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                            {doctor.workingHours && (
                                <span className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {doctor.workingHours.start} – {doctor.workingHours.end}
                                </span>
                            )}

                            <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {doctor.gender || "Not specified"}
                            </span>

                            {doctor.isActive && (
                                <span className="flex items-center gap-1 text-green-600">
                                    <CheckCircle2 size={14} />
                                    Available
                                </span>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-[300px_1fr] gap-6">

                <div className="flex flex-col gap-5">
                    <Card className="p-5 rounded-2xl">
                        <h3 className="font-semibold mb-4">Contact</h3>

                        <div className="flex items-center gap-3 mb-4">
                            <Phone size={16} />
                            <p className="text-sm">{doctor.phone}</p>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <DollarSign size={16} />
                            <p className="text-sm">{doctor.price} EGP</p>
                        </div>
                        {doctor.schedule && (
                            <div className="flex items-center gap-3">
                                <Calendar size={16} />
                                <p className="text-sm">
                                    {doctor.schedule.map(day => capitalize(day)).join(', ')}
                                </p>
                            </div>
                        )}
                    </Card>

                    <Card className="p-5 rounded-2xl">
                        <h3 className="font-semibold mb-3">Specialty</h3>
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                            {capitalize(doctor.specialty)}
                        </span>
                    </Card>
                </div>
                <div className="flex flex-col gap-5">
                    <Card className="p-6 rounded-2xl">
                        <h3 className="font-semibold mb-3">About doctor </h3>
                        <p className="text-gray-600">
                            {doctor.description || "No description available."}
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )
}

