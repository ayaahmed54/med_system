"use client"
import React, { useEffect, useState } from 'react';
import {
  Card, CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users, Calendar, CreditCard, CalendarHeartIcon,
  AlignLeft, Clock, Phone, User2, DollarSign, Award
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import AddAppointments from '@/components/AddAppointments/AddAppointments';
import FormHeader from '@/components/FormHeader/FormHeader';
import { getPatients, getDoctors } from "@/components/Addappaction/Addappaction";
import AddDoctorModal from '@/components/Newdoctor/Newdoctor';
import Link from 'next/link';

interface DoctorDetails {
  _id: string;
  displayName: string;
  specialty: string;
  phone: string;
  yearsOfExperience: number;
  price: number;
  gender: string;
  description: string;
  schedule: string[];
  workingHours?: { start: string; end: string };
  image?: string;
}

interface TopDoctor {
  _id: string;
  totalRevenue: number;
  totalAppointments: number;
  doctor: DoctorDetails;
}

interface DashboardData {
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  revenue: number;
  topDoctors: TopDoctor[];
}

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

export default function AdminDashboardShadcn() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorDetails | null>(null);
  const [open, setOpen] = useState(false);

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
    const userToken = session?.token;
    if (!userToken) return;

    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/appointments`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const result = await res.json();
        setAppointments(result.data ?? []);
      } catch (error) {
        console.error("Appointments error:", error);
        setAppointments([]);
      }
    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchDashboard(), fetchAppointments()]);
      setLoading(false);
    };

    loadData();
  }, [session]);

  if (loading) return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
      <div className="text-center font-sans text-[#4C669A]">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">

            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
          <p className="font-medium animate-pulse">Loading ...</p>
        </div>
      </div>
    </div>

  );

  const stats = [
    { title: "Doctors", value: data?.totalDoctors || 0, icon: <CalendarHeartIcon />, color: "bg-[#5046E5]", target: 500 },
    { title: "Patients", value: data?.totalPatients || 0, icon: <Users />, color: "bg-[#F97316]", target: 10000 },
    { title: "Appointments", value: data?.totalAppointments || 0, icon: <Calendar />, color: "bg-[#06B6D4]", target: 20000 },
    { title: "Revenue", value: data?.revenue || 0, icon: <CreditCard />, color: "bg-[#10B981]", target: 1000000, isCurrency: true },
  ];

  return (
    <div className="p-8 bg-[#F8F9FC] min-h-screen">

      <div className="flex justify-between mb-8">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <AddAppointments
          patients={patients}
          doctors={doctors}
          onSuccess={(newAppointment) => {
            setAppointments((prev) => [newAppointment, ...prev]);
          }}
        />

      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const percentage = Math.round((Number(stat.value) / stat.target) * 100);
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex justify-between mb-3">
                  <div className={`p-2 rounded ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                  <span className="text-green-600 text-xs">+{percentage}%</span>
                </div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold">
                  {stat.isCurrency ? `$${stat.value}` : stat.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#0A1B39]">Popular Doctors</h2>
          <Link href='/doctors'>
            <button className="text-blue-600 font-semibold text-xs hover:underline">View All</button></Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

          {data?.topDoctors.map((item) => (
            <Card
              key={item._id}
              className="group border-none shadow-sm hover:shadow-md transition-all bg-white rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => {
                setSelectedDoctor(item.doctor);
                setOpen(true);
              }}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar أصغر */}
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-600 transition-colors duration-300">
                    <span className="text-lg font-bold text-blue-600 group-hover:text-white">
                      {item.doctor.displayName.charAt(0)}
                    </span>
                  </div>

                  {/* اسم الدكتور - خط أصغر */}
                  <h3 className="font-bold text-sm text-[#0A1B39] line-clamp-1">
                    {item.doctor.displayName}
                  </h3>

                  {/* التخصص - خط أصغر جداً */}
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                    {item.doctor.specialty}
                  </p>

                  {/* الحجوزات - تصميم ملموم */}
                  <div className="mt-4 w-full flex items-center justify-center gap-1.5 py-1.5 bg-gray-50 rounded-lg">
                    <span className="text-[12px] font-bold text-blue-600">{item.totalAppointments}</span>
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">Bookings</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>



      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] border-t-4 border-t-blue-600">
          <DialogHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xl font-bold border-2 border-blue-200 shadow-sm">
              {selectedDoctor?.displayName?.charAt(0)}
            </div>
            <div className="flex flex-col">
              <DialogTitle className="text-xl font-bold text-slate-800">
                {selectedDoctor?.displayName}
              </DialogTitle>
              <Badge className="w-fit mt-1 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors">
                {selectedDoctor?.specialty}
              </Badge>
            </div>
          </DialogHeader>

          {selectedDoctor && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Experience</p>
                    <p className="text-sm font-semibold">{selectedDoctor.yearsOfExperience} Years</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-green-600">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Price</p>
                    <p className="text-sm font-semibold">${selectedDoctor.price}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 px-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <span>{selectedDoctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <User2 className="h-4 w-4 text-blue-500" />
                    <span className="capitalize">{selectedDoctor.gender}</span>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Available Days</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedDoctor.schedule?.map((day) => (
                          <span key={day} className="text-[12px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md border border-blue-100">
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">Working Hours</p>
                      <p className="text-sm text-slate-600">
                        {selectedDoctor.workingHours?.start} — {selectedDoctor.workingHours?.end}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50">
                <AlignLeft className="absolute right-4 top-4 h-4 w-4 text-blue-200" />
                <p className="text-sm font-bold text-blue-900 mb-1">About Doctor</p>
                <p className="text-sm text-blue-800/80 leading-relaxed italic">
                  "{selectedDoctor.description}"
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <FormHeader appointments={appointments} />
    </div>
  );
}






