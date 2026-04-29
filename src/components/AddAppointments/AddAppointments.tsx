"use client";

import React, { useState, useTransition } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { BookAppointment } from "@/components/Addappaction/Addappaction";

interface DataItem {
    _id: string;
    displayName: string;
    specialty?: string;
    phone?: string;
}

export default function AddAppointments({
    patients = [],
    doctors = [],
    onSuccess,
}: {
    patients?: DataItem[];
    doctors?: DataItem[];
    onSuccess?: (newAppointment: any) => void; 
}) {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        patientId: "",
        doctorId: "",
        date: "",
        time: "11:00:00",
        status: "",
    });

    const handleBook = () => {
        if (!formData.patientId || !formData.doctorId || !formData.date) {
            return toast.error("Please fill all required fields");
        }

        const startDateTime = `${formData.date}T${formData.time}Z`;

        startTransition(async () => {
            try {
                const result = await BookAppointment(
                    formData.doctorId,
                    formData.patientId,
                    startDateTime,
                    formData.status
                );

                toast.success("Appointment booked successfully!");

                setOpen(false);

                setFormData({
                    patientId: "",
                    doctorId: "",
                    date: "",
                    time: "11:00:00",
                    status: "",
                });
                if (onSuccess) onSuccess(result);

            } catch (error: any) {
                toast.error(error.message || "Something went wrong");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#2B6CEE] hover:bg-[#2B6CEE]/90 text-white rounded-xl px-5 h-11 transition-all shadow-md shadow-blue-100">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Appointment
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-[24px] shadow-2xl">
                <DialogHeader className="px-6 py-5 bg-[#F8F9FC] border-b border-[#E7EBF3]">
                    <DialogTitle className="text-xl font-bold text-[#0A1B39]">Book Appointment</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-5">

                    <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-gray-500 ml-1">PATIENT</label>
                        <Select onValueChange={(val) => setFormData({ ...formData, patientId: val })}>
                            <SelectTrigger className="w-full h-14 bg-white border-[#E7EBF3] rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none">
                                <SelectValue placeholder="Select Patient" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-[#E7EBF3] shadow-xl">
                                {patients.map((p: any) => (
                                    <SelectItem key={p._id} value={p._id} className="py-3 focus:bg-blue-50 rounded-xl cursor-pointer">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-[#0A1B39]">{p.user?.displayName || p.displayName || p.name}</span>
                                            <span className="text-[11px] text-gray-400">ID: {p._id.slice(-6)}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-gray-500 ml-1">DOCTOR</label>
                        <Select onValueChange={(val) => setFormData({ ...formData, doctorId: val })}>
                            <SelectTrigger className="w-full h-14 bg-white border-[#E7EBF3] rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none">
                                <SelectValue placeholder="Select Doctor" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-[#E7EBF3] shadow-xl">
                                {doctors.map((d: any) => (
                                    <SelectItem key={d._id} value={d._id} className="py-3 focus:bg-blue-50 rounded-xl cursor-pointer">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-[#0A1B39]">{d.user?.displayName || d.displayName || d.name}</span>
                                            <span className="text-[11px] text-blue-600 font-medium uppercase tracking-wider">{d.specialty || "General Medicine"}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[13px] font-semibold text-gray-500 ml-1">DATE</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full h-14 bg-white border border-[#E7EBF3] rounded-2xl px-4 text-sm text-[#0A1B39] outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-semibold text-gray-500 ml-1">TIME SLOT</label>
                            <Select onValueChange={(val) => setFormData({ ...formData, time: val })} defaultValue="11:00:00">
                                <SelectTrigger className="h-14 bg-white border-[#E7EBF3] rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-[#E7EBF3]">
                                    <SelectItem value="09:00:00" className="rounded-lg">09:00 AM</SelectItem>
                                    <SelectItem value="11:00:00" className="rounded-lg">11:00 AM</SelectItem>
                                    <SelectItem value="13:00:00" className="rounded-lg">01:00 PM</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-gray-500 ml-1">STATUS</label>
                        <Select
                            onValueChange={(val) => setFormData({ ...formData, status: val })}
                            defaultValue="pending"
                        >
                            <SelectTrigger className="w-full h-14 bg-white border-[#E7EBF3] rounded-2xl">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-[#E7EBF3]">
                                <SelectItem value="pending"> Pending</SelectItem>
                                <SelectItem value="confirmed"> Confirmed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                <SelectItem value="completed"> Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-3 mt-4 pt-2">
                        <DialogClose asChild>
                            <Button variant="ghost" className="flex-1 h-12 rounded-xl text-gray-500 hover:bg-gray-100 font-medium">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            onClick={handleBook}
                            disabled={isPending}
                            className="flex-1 h-12 rounded-xl bg-[#2B6CEE] hover:bg-[#1e56cc] text-white font-bold transition-all shadow-lg shadow-blue-100"
                        >
                            {isPending ? "Booking..." : "Confirm Booking"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}


