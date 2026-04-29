"use client"

import React, { useEffect, useState } from 'react'
import {
    Users, UserPlus, Bookmark, LucideUserRoundMinus, ArrowUpRight
} from "lucide-react"
import { Card } from "@/components/ui/card"
import TablePatients from '@/components/tablePatients/tablePatients'
import { useSession } from 'next-auth/react'


export default function Patients() {
    const { data: session } = useSession();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [patientsList, setPatientsList] = useState([]);
    const [doctorsList, setDoctorsList] = useState([]);
    useEffect(() => {
        async function fetchPatients() {
            const userToken = session?.token;
            if (!userToken) return;
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/patients`, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });
                const result = await response.json();
                setPatients(result.data?.data || []);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPatients();
    },
        [session]);

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
    </div>;

    return (
        <div className='min-h-screen w-full flex flex-col bg-[#F8F9FC] p-4 md:p-8'>
            <header className="mb-8">
                <div className="flex justify-between mb-8">
                    <h4 className="font-bold text-[22px] text-[#0A1B39]">
                        Patients Report</h4>



                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Patients" value={patients.length} icon={<Users size={22} />} color="bg-[#2E37A4]" />
                <StatCard title="New Patients" value="210" icon={<UserPlus size={22} />} color="bg-[#27AE60]" />
                <StatCard title="Booked" value="500" icon={<Bookmark size={22} />} color="bg-[#E2B93B]" />
                <StatCard title="Returning" value="380" icon={<LucideUserRoundMinus size={22} />} color="bg-[#EF1E1E]" />
            </main>

            <TablePatients patients={patients} />
        </div>
    );
}

function StatCard({ title, value, icon, color }: any) {
    return (
        <Card className="p-5 bg-white border-[#E7E8EB] shadow-sm rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <div className={`w-11 h-11 ${color} rounded-full flex items-center justify-center text-white`}>
                    {icon}
                </div>
                <div className="flex items-center gap-1 text-[#27AE60] bg-[#F4FBF7] px-2 py-0.5 rounded-md text-[11px] font-bold">
                    +10% <ArrowUpRight size={12} />
                </div>
            </div>
            <div>
                <span className="text-[14px] text-[#6C7688] block mb-1">{title}</span>
                <h3 className="text-[20px] font-bold text-[#0A1B39]">{value.toLocaleString()}</h3>
            </div>
        </Card>
    );
}

