"use client"
import React, { useEffect, useState } from 'react'
import { ArrowUpRight, CalendarArrowDownIcon, CalendarArrowUp, CalendarClock, LucideCalendarSync } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import FormHeader from '@/components/FormHeader/FormHeader'
import { useSession } from 'next-auth/react'
import AddAppointments from '@/components/AddAppointments/AddAppointments'
import { getPatients, getDoctors } from "@/components/Addappaction/Addappaction";

interface Appointment {
    _id: string;
    startTime: string;
    status: 'completed' | 'cancelled' | 'pending' | 'confirmed';
    patient?: { displayName: string };
    location?: { clinicName: string };
    doctor?: { displayName: string };
    price: number;
}

interface DataItem {
    _id: string;
    displayName: string;
    specialty?: string;
    phone?: string;
}

export default function Appointments() {
    const { data: session } = useSession();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState<DataItem[]>([]);
    const [doctors, setDoctors] = useState<DataItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const [patientsData, doctorsData] = await Promise.all([
                getPatients(),
                getDoctors(),
            ]);
            setPatients(patientsData);
            setDoctors(doctorsData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchAppointments() {
            const userToken = session?.token;
            if (!userToken) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/appointments`, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });
                const result = await response.json();
                setAppointments(result.data ?? []);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        }
        fetchAppointments();
    }, [session]);

    const total = appointments.length;
    const completed = appointments.filter(a => a.status === 'completed').length;
    const cancelled = appointments.filter(a => a.status === 'cancelled').length;
    const pending = appointments.filter(a => a.status === 'pending' || a.status === 'confirmed').length;

    const getPercent = (value: number) => total > 0 ? Math.round((value / total) * 100) : 0;

    if (loading) return (
        <div className="p-10 text-center font-sans text-[#4C669A]">
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                    <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                </div>
            </div>
        </div>
    );

    const statsCards = [
        {
            title: "Total Appointments",
            value: total,
            icon: <CalendarClock size={16} className="text-[#2E37A4]" />,
            color: "border-[#2E37A4]",
            percent: "100%",
            trend: "Overall"
        },
        {
            title: "Completed",
            value: completed,
            icon: <CalendarArrowUp size={16} className="text-[#27AE60]" />,
            color: "border-[#27AE60]",
            percent: `+${getPercent(completed)}%`,
            trend: "Success Rate"
        },
        {
            title: "Cancelled",
            value: cancelled,
            icon: <CalendarArrowDownIcon size={16} className="text-[#E2B93B]" />,
            color: "border-[#E2B93B]",
            percent: `+${getPercent(cancelled)}%`,
            trend: "Dropout"
        },
        {
            title: "Pending/Confirmed",
            value: pending,
            icon: <LucideCalendarSync size={16} className="text-[#EF1E1E]" />,
            color: "border-[#EF1E1E]",
            percent: `+${getPercent(pending)}%`,
            trend: "In Progress"
        },
    ];

    return (
        <div className='min-h-screen w-full flex flex-col bg-white'>
            <div className="w-full max-w-300 mx-auto p-4 md:px-6 grow">
                <header className="w-full pb-4 border-b border-[#E7E8EB]">
                    <div className="flex justify-between mb-8">
                        <h4 className="font-bold text-[20px] leading-6 text-[#0A1B39]">
                            Appointment Report
                        </h4>

                        <AddAppointments
                            patients={patients}
                            doctors={doctors}
                            onSuccess={(newAppointment) => {

                                setAppointments((prev) => [newAppointment, ...prev]);
                            }}
                        />
                    </div>
                </header>

                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-6">
                    {statsCards.map((stat, index) => (
                        <Card key={index} className="h-33.5 bg-white border-[#E7E8EB] shadow-[0px_4px_20px_rgba(92,92,92,0.08)] rounded-[5px] flex flex-col justify-between p-5 border">
                            <div className="flex justify-between items-start w-full">
                                <div className={`w-8 h-8 bg-[#ECEDF7] border ${stat.color} rounded-sm flex items-center justify-center flex-none`}>
                                    {stat.icon}
                                </div>
                                <Badge variant="outline" className="bg-[#F4FBF7] text-[#27AE60] border-[#E9F7EF] rounded-[6px] px-2 py-0.5 flex items-center gap-1 font-normal text-[12px]">
                                    {stat.percent} <ArrowUpRight className="w-3 h-3" />
                                </Badge>
                            </div>
                            <CardContent className="p-0">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[14px] leading-5.25 text-[#6C7688]">{stat.title}</span>
                                    <span className="text-[16px] leading-4.75 font-bold text-[#0A1B39]">
                                        {stat.value.toLocaleString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </main>

                <FormHeader appointments={appointments} />
            </div>
        </div>
    );
}









