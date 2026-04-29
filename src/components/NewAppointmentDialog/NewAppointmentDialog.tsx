"use client"

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Doctor {
    _id: string;
    displayName: string;
    specialty: string;
    price: number;
}

interface Patient {
    _id: string;
    displayName: string;
    phone: string;
}

interface NewAppointmentDialogProps {
    open: boolean;
    onClose: () => void;
    token: string;
    onSuccess: () => void;
}

const TIME_SLOTS = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
];

export default function NewAppointmentDialog({ open, onClose, token, onSuccess }: NewAppointmentDialogProps) {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loadingData, setLoadingData] = useState(false);

    const [date, setDate] = useState<Date>();
    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [price, setPrice] = useState("200");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // جلب الداتا لما الـ Dialog يفتح
    useEffect(() => {
        if (!open || !token) return;

        const fetchData = async () => {
            setLoadingData(true);
            try {
                const [doctorsRes, patientsRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_URL_API}/doctors`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch(`${process.env.NEXT_PUBLIC_URL_API}/patients`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                ]);

                const [doctorsData, patientsData] = await Promise.all([
                    doctorsRes.json(),
                    patientsRes.json(),
                ]);

                // الـ structure هو result.data.data
                setDoctors(doctorsData.data?.data ?? []);
                setPatients(patientsData.data?.data ?? []);
            } catch (err) {
                console.error("Failed to fetch doctors/patients:", err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [open, token]);

    // لما تختار دكتور يتحط السعر بتاعه تلقائياً
    const handleDoctorChange = (id: string) => {
        setDoctorId(id);
        const doctor = doctors.find(d => d._id === id);
        if (doctor) setPrice(String(doctor.price));
    };

    const resetForm = () => {
        setDate(undefined);
        setPatientId("");
        setDoctorId("");
        setStartTime("");
        setEndTime("");
        setPrice("200");
        setNotes("");
        setError("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = async () => {
        if (!patientId || !doctorId || !date || !startTime || !endTime) {
            setError("Please fill in all required fields.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const dateStr = format(date, "yyyy-MM-dd");
            const body = {
                patient: patientId,
                doctor: doctorId,
                startTime: `${dateStr}T${startTime}:00Z`,
                endTime: `${dateStr}T${endTime}:00Z`,
                price: Number(price),
                location: { clinicName: "Main Clinic" },
                status: "pending",
                ...(notes && { notes }),
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/v1/appointments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message ?? "Something went wrong");
            }

            resetForm();
            onSuccess();
        } catch (err: any) {
            setError(err.message ?? "Failed to book appointment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-[560px] p-0 gap-0 rounded-[10px] border-[#E7E8EB]">
                <DialogHeader className="px-5 py-4 border-b border-[#E7E8EB] space-y-0">
                    <DialogTitle className="text-[15px] font-semibold text-[#0A1B39]">
                        New Appointment
                    </DialogTitle>
                    <p className="text-[12px] text-[#6C7688] mt-1">
                        Fill in the details to book a new visit
                    </p>
                </DialogHeader>

                {loadingData ? (
                    <div className="px-5 py-10 text-center text-[13px] text-[#6C7688]">
                        Loading...
                    </div>
                ) : (
                    <div className="px-5 py-5 flex flex-col gap-4">

                        {/* Patient + Doctor */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-medium text-[#0A1B39]">
                                    Patient <span className="text-red-500">*</span>
                                </label>
                                <Select value={patientId} onValueChange={setPatientId}>
                                    <SelectTrigger className="h-9 border-[#E7E8EB] rounded-[6px] shadow-none text-[13px]">
                                        <SelectValue placeholder="Select patient" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {patients.map(p => (
                                            <SelectItem key={p._id} value={p._id}>
                                                {p.displayName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-medium text-[#0A1B39]">
                                    Practitioner <span className="text-red-500">*</span>
                                </label>
                                <Select value={doctorId} onValueChange={handleDoctorChange}>
                                    <SelectTrigger className="h-9 border-[#E7E8EB] rounded-[6px] shadow-none text-[13px]">
                                        <SelectValue placeholder="Select doctor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map(d => (
                                            <SelectItem key={d._id} value={d._id}>
                                                <div className="flex flex-col">
                                                    <span>{d.displayName}</span>
                                                    <span className="text-[11px] text-[#9DA4B0] capitalize">{d.specialty}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Date + Times */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-medium text-[#0A1B39]">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "h-9 w-full justify-between text-left font-normal border-[#E7E8EB] px-3 rounded-[6px] shadow-none text-[13px]",
                                                !date && "text-[#9DA4B0]"
                                            )}
                                        >
                                            <span>{date ? format(date, "dd/MM/yyyy") : "dd/mm/yyyy"}</span>
                                            <CalendarIcon className="h-3.5 w-3.5 text-[#0A1B39]" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-medium text-[#0A1B39]">
                                        Start <span className="text-red-500">*</span>
                                    </label>
                                    <Select value={startTime} onValueChange={setStartTime}>
                                        <SelectTrigger className="h-9 border-[#E7E8EB] rounded-[6px] shadow-none text-[13px]">
                                            <SelectValue placeholder="09:00" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TIME_SLOTS.map(t => (
                                                <SelectItem key={t} value={t}>{t}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-medium text-[#0A1B39]">
                                        End <span className="text-red-500">*</span>
                                    </label>
                                    <Select value={endTime} onValueChange={setEndTime}>
                                        <SelectTrigger className="h-9 border-[#E7E8EB] rounded-[6px] shadow-none text-[13px]">
                                            <SelectValue placeholder="09:30" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TIME_SLOTS.filter(t => t > startTime).map(t => (
                                                <SelectItem key={t} value={t}>{t}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-[#0A1B39]">Price</label>
                            <div className="flex h-9 border border-[#E7E8EB] rounded-[6px] overflow-hidden">
                                <span className="flex items-center px-3 text-[13px] text-[#6C7688] border-r border-[#E7E8EB] bg-[#F8F9FB]">
                                    $
                                </span>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    className="flex-1 px-3 text-[13px] text-[#0A1B39] outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-[#0A1B39]">
                                Notes{" "}
                                <span className="text-[#9DA4B0] font-normal">(optional)</span>
                            </label>
                            <textarea
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                placeholder="Add any notes about this appointment..."
                                className="h-16 resize-none border border-[#E7E8EB] rounded-[6px] px-3 py-2 text-[13px] text-[#0A1B39] outline-none placeholder:text-[#9DA4B0]"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-[12px] text-red-500 bg-red-50 border border-red-100 rounded-[6px] px-3 py-2">
                                {error}
                            </p>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E7E8EB]">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        className="h-9 px-4 border-[#E7E8EB] text-[#6C7688] rounded-[6px] text-[13px] font-medium"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || loadingData}
                        className="h-9 px-4 bg-[#0A1B39] hover:bg-[#0A1B39]/90 text-white rounded-[6px] text-[13px] font-medium"
                    >
                        {loading ? "Booking..." : "Book Appointment"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}