"use client"

import React from "react";
import { format } from "date-fns";
import { MoreVertical, Phone, MapPin, Droplets, User } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface TablePatientsProps {
    patients: any[];
}

export default function TablePatients({ patients }: TablePatientsProps) {
    return (
        <div className="w-full bg-white border border-[#E7E8EB] rounded-xl overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-[#F8F9FB]">
                    <TableRow className="border-b border-[#E7E8EB] hover:bg-transparent">
                        <TableHead className="p-4 text-[#6C7688] font-bold text-[12px] uppercase">Patient Name</TableHead>
                        <TableHead className="p-4 text-[#6C7688] font-bold text-[12px] uppercase">Contact & Location</TableHead>
                        <TableHead className="p-4 text-[#6C7688] font-bold text-[12px] uppercase">Age / Gender</TableHead>
                        <TableHead className="p-4 text-[#6C7688] font-bold text-[12px] uppercase">Blood Type</TableHead>
                        <TableHead className="p-4 text-[#6C7688] font-bold text-[12px] uppercase">Created At</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <TableRow key={patient._id} className="hover:bg-[#F8F9FC] transition-colors border-b border-[#E7E8EB]">
                                <TableCell className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#2B6CEE] font-bold text-xs">
                                            {patient.displayName?.charAt(0).toUpperCase() || <User size={14} />}
                                        </div>
                                        <span className="text-[#0A1B39] font-semibold">{patient.displayName}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="p-4">
                                    <div className="flex flex-col gap-1 text-[13px]">
                                        <div className="flex items-center gap-1 text-[#6C7688]">
                                            <Phone size={12} className="text-[#9DA4B0]" /> {patient.phone}
                                        </div>
                                        <div className="flex items-center gap-1 text-[#9DA4B0]">
                                            <MapPin size={12} /> {patient.address?.city}, {patient.address?.street}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="p-4">
                                    <div className="text-[#0A1B39] font-medium">{patient.age} Years</div>
                                    <div className="text-[11px] text-[#9DA4B0] capitalize">{patient.gender}</div>
                                </TableCell>
                                <TableCell className="p-4">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-[#EF1E1E] rounded-md w-fit font-bold text-[12px]">
                                        <Droplets size={14} /> {patient.bloodType}
                                    </div>
                                </TableCell>
                                <TableCell className="p-4 text-[#6C7688] text-[13px]">
                                    {patient.createdAt ? format(new Date(patient.createdAt), "dd MMM yyyy") : "N/A"}
                                </TableCell>
                                <TableCell className="p-4">
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#0A1B39]">
                                        <MoreVertical size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="h-32 text-center text-[#9DA4B0]">
                                No patients record found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

