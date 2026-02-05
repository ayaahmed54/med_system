"use client"

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

export default function TablePatients() {
    const [date, setDate] = useState<Date>();
    const [patient, setPatient] = useState("");
    const [location, setLocation] = useState("");
    const [practitioner, setPractitioner] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [status, setStatus] = useState("");
    const [showErrors, setShowErrors] = useState(false);

    const [records, setRecords] = useState<any[]>([]);

    // res
    useEffect(() => {
        const saved = localStorage.getItem("medical_records");
        if (saved) setRecords(JSON.parse(saved));
    }, []);

    // save data
    useEffect(() => {
        if (records.length > 0 || localStorage.getItem("medical_records")) {
            localStorage.setItem("medical_records", JSON.stringify(records));
        }
    }, [records]);

    const handleAddRecord = () => {
        if (!date || !patient || !location || !practitioner || !contactInfo || !status) {
            setShowErrors(true);
            toast.error("Please fill all fields!");
            return;
        }

        const newRecord = {
            id: Date.now(),
            date: format(date, "dd/MM/yyyy"),
            patient,
            location,
            practitioner,
            contactInfo,
            status
        };

        setRecords([...records, newRecord]);

        // Clear data after adding
        setDate(undefined);
        setPatient("");
        setLocation("");
        setPractitioner("");
        setContactInfo("");
        setStatus("");
        setShowErrors(false);
    };

    return (
        <>
            <div className="w-full flex flex-col items-center p-4 gap-6">
                <div className="max-w-279 w-full min-h-56.5 bg-white border border-[#E7E8EB] rounded-[6px] p-6 shadow-sm flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
                        {/* Date */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[14px] font-medium text-[#0A1B39] font-['Inter']">Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full h-9 justify-between text-left font-normal border-[#E7E8EB] px-3 rounded-[6px] shadow-none",
                                            !date ? "text-[#9DA4B0]" : "text-[#0A1B39]",
                                            !date && showErrors && "border-red-500 bg-red-50 ring-1 ring-red-500"
                                        )}
                                    >
                                        <span className="truncate">{date ? format(date, "dd/MM/yyyy") : "dd/mm/yyyy"}</span>
                                        <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-[#0A1B39]" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Patient */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[14px] font-medium text-[#0A1B39]">Patient</label>
                            <Select value={patient} onValueChange={setPatient}>
                                <SelectTrigger className={cn(
                                    "w-full h-9 border-[#E7E8EB] text-[#9DA4B0] px-3 rounded-[6px] shadow-none focus:ring-1 focus:ring-[#0A1B39]",
                                    !patient && showErrors && "border-red-500 bg-red-50 ring-1 ring-red-500"
                                )}>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Alberto Ripley">Alberto Ripley</SelectItem>
                                    <SelectItem value="Susan Babin">Susan Babin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[14px] font-medium text-[#0A1B39] whitespace-nowrap">Location</label>
                            <Select value={location} onValueChange={setLocation}>
                                <SelectTrigger className={cn(
                                    "w-full h-9 border-[#E7E8EB] text-[#9DA4B0] px-3 rounded-[6px] shadow-none",
                                    !location && showErrors && "border-red-500 bg-red-50 ring-1 ring-red-500"
                                )}>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Cairo">Cairo</SelectItem>
                                    <SelectItem value="Giza">Giza</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Practitioner */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[14px] font-medium text-[#0A1B39]">Practioner</label>
                            <Select value={practitioner} onValueChange={setPractitioner}>
                                <SelectTrigger className={cn(
                                    "w-full h-9 border-[#E7E8EB] text-[#9DA4B0] px-3 rounded-[6px] shadow-none",
                                    !practitioner && showErrors && "border-red-500 bg-red-50 ring-1 ring-red-500"
                                )}>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Dr. Mick Thompson">Dr. Mick Thompson</SelectItem>
                                    <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[14px] font-medium text-[#0A1B39]">Contact Info</label>
                            <Select value={contactInfo} onValueChange={setContactInfo}>
                                <SelectTrigger className={cn(
                                    "w-full h-9 border-[#E7E8EB] text-[#9DA4B0] px-3 rounded-[6px] shadow-none",
                                    !contactInfo && showErrors && "border-red-500 bg-red-50 ring-1 ring-red-500"
                                )}>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="item1">Item 1</SelectItem>
                                    <SelectItem value="item2">Item 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Status */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[14px] font-medium text-[#0A1B39]">Status</label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className={cn(
                                    "w-full h-9 border-[#E7E8EB] text-[#9DA4B0] px-3 rounded-[6px] shadow-none",
                                    !status && showErrors && "border-red-500 bg-red-50 ring-1 ring-red-500"
                                )}>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem className="bg-[#E9F8FB] border-[#06AED4] text-[#06AED4]" value="Checked Out">Checked Out</SelectItem>
                                    <SelectItem value="Checked in">Checked in</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                    <SelectItem value="Schedule">Schedule</SelectItem>
                                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleAddRecord} className="bg-[#030303] text-white gap-2">
                            <Plus className="w-4 h-4" /> Add Record
                        </Button>
                    </div>
                </div>
                <div className="max-w-279 w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Practitioner</TableHead>
                                <TableHead>Contact Info</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {records.map((rec) => (
                                <TableRow key={rec.id}>
                                    <TableCell>{rec.date}</TableCell>
                                    <TableCell>{rec.patient}</TableCell>
                                    <TableCell>{rec.location}</TableCell>
                                    <TableCell>{rec.practitioner}</TableCell>
                                    <TableCell>{rec.contactInfo}</TableCell>
                                    <TableCell>{rec.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

