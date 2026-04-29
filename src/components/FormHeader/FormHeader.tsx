"use client"

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Appointment {
    _id: string;
    startTime: string;
    status: 'completed' | 'cancelled' | 'pending' | 'confirmed';
    patient?: { displayName: string };
    location?: { clinicName: string };
    doctor?: { displayName: string };
    price: number;
}

interface FormHeaderProps {
    appointments: Appointment[];
}

const statusStyles: Record<string, string> = {
    completed: "bg-[#E8F8F0] text-[#27AE60]",
    cancelled: "bg-[#FEE2E2] text-[#EF4444]",
    pending: "bg-[#FFF9E5] text-[#E2B93B]",
    confirmed: "bg-[#EBF2FF] text-[#2B6CEE]",
};

const statusOptions = [
    { value: "all", label: "All Status", dot: "bg-[#6C7688]" },
    { value: "completed", label: "Completed", dot: "bg-[#27AE60]" },
    { value: "confirmed", label: "Confirmed", dot: "bg-[#2B6CEE]" },
    { value: "pending", label: "Pending", dot: "bg-[#E2B93B]" },
    { value: "cancelled", label: "Cancelled", dot: "bg-[#EF4444]" },
];

export default function FormHeader({ appointments }: FormHeaderProps) {
    const [date, setDate] = useState<Date>();
    const [status, setStatus] = useState<string>("all");
    const [calendarOpen, setCalendarOpen] = useState(false);

    const filtered = appointments.filter((apt) => {
        const matchDate = date
            ? new Date(apt.startTime).toDateString() === date.toDateString()
            : true;
        const matchStatus = status !== "all" ? apt.status === status : true;
        return matchDate && matchStatus;
    });

    const handleReset = () => {
        setDate(undefined);
        setStatus("all");
    };

    return (
        <div className="w-full flex flex-col gap-6 mt-6">

            <div className="flex flex-wrap items-center gap-3">

                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "h-10 px-4 rounded-xl border-[#E7EBF3] text-sm font-medium gap-2",
                                date ? "text-[#0A1B39]" : "text-[#9DA4B0]"
                            )}
                        >
                            <CalendarIcon size={15} />
                            {date ? format(date, "dd MMM yyyy") : "Pick a date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-2xl border-[#E7EBF3] shadow-xl">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(d) => {
                                setDate(d);
                                setCalendarOpen(false);
                            }}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                {/* Status Filter */}
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="h-10 w-44 rounded-xl border-[#E7EBF3] text-sm font-medium text-[#0A1B39]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-[#E7EBF3] shadow-xl">
                        {statusOptions.map((s) => (
                            <SelectItem key={s.value} value={s.value} className="rounded-lg py-2">
                                <div className="flex items-center gap-2">
                                    <span className={cn("w-2 h-2 rounded-full", s.dot)} />
                                    {s.label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {(date || status !== "all") && (
                    <Button
                        variant="ghost"
                        onClick={handleReset}
                        className="h-10 px-4 rounded-xl text-[#EF4444] hover:bg-[#FEE2E2] text-sm font-medium"
                    >
                        Reset
                    </Button>
                )}
                <span className="ml-auto text-[13px] text-[#9DA4B0] font-medium">
                    {filtered.length} record{filtered.length !== 1 ? "s" : ""} found
                </span>
            </div>

            {/* Table */}
            <div className="w-full bg-white border border-[#E7E8EB] rounded-[8px] overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-[#F8F9FB]">
                        <TableRow className="border-b border-[#E7E8EB] hover:bg-transparent">
                            <TableHead className="text-[#6C7688] font-bold text-[12px] uppercase p-4">Date & Time</TableHead>
                            <TableHead className="text-[#6C7688] font-bold text-[12px] uppercase p-4">Patient Name</TableHead>
                            <TableHead className="text-[#6C7688] font-bold text-[12px] uppercase p-4">Practitioner</TableHead>
                            <TableHead className="text-[#6C7688] font-bold text-[12px] uppercase p-4">Status</TableHead>
                            <TableHead className="text-[#6C7688] font-bold text-[12px] uppercase p-4">Amount</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.length > 0 ? (
                            filtered.map((apt) => (
                                <TableRow key={apt._id} className="border-b border-[#E7E8EB] hover:bg-[#F8F9FC] transition-colors">
                                    <TableCell className="p-4">
                                        <div className="text-[#0A1B39] font-medium">
                                            {format(new Date(apt.startTime), "dd MMM yyyy")}
                                        </div>
                                        <div className="text-[11px] text-[#9DA4B0]">
                                            {format(new Date(apt.startTime), "hh:mm a")}
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-4 text-[#0A1B39] font-semibold">
                                        {apt.patient?.displayName ?? "N/A"}
                                    </TableCell>
                                    <TableCell className="p-4 text-[#0A1B39] text-[13px]">
                                        {apt.doctor?.displayName ?? "N/A"}
                                    </TableCell>
                                    <TableCell className="p-4">
                                        <span className={cn(
                                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                            statusStyles[apt.status]
                                        )}>
                                            {apt.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="p-4 text-[#0A1B39] font-bold">
                                        ${apt.price}
                                    </TableCell>
                                    <TableCell className="p-4">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9DA4B0] hover:text-[#0A1B39]">
                                            <MoreVertical size={16} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-[#9DA4B0]">
                                    No records found for the selected filters.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}






