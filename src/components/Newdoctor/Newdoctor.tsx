
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { X } from "lucide-react";


const doctorSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string(),
    phone: z.string().min(10, "Phone number is too short"),
    specialty: z.string().min(1, "Specialty is required"),
    yearsOfExperience: z.coerce.number().min(0),
    price: z.coerce.number().min(0),
    schedule: z.array(z.string()).min(1, "Select at least one day"),
    workingHours: z.object({
        start: z.string(),
        end: z.string(),
    }),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    address: z.object({
        street: z.string().min(1, "Street is required"),
        city: z.string().min(1, "City is required"),
        country: z.string().min(1, "Country is required"),
    }),
    gender: z.enum(["male", "female"]),
    description: z.string().optional(),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
});

type DoctorFormValues = z.infer<typeof doctorSchema>;

import { CreateDoctor } from "../Adddocaction/adddocaction";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "../ui/button";

const FormField = ({ label, children, error }: any) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>
        {children}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
);

export default function AddDoctorModal() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<DoctorFormValues>({
        resolver: zodResolver(doctorSchema) as any,
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            phone: "",
            specialty: "dermatology",
            yearsOfExperience: 0,
            price: 0,
            schedule: ["monday", "wednesday", "friday"],
            workingHours: { start: "09:00", end: "15:00" },
            dateOfBirth: "",
            address: { street: "", city: "Cairo", country: "Egypt" },
            gender: "male",
            description: "",
        },
    });

    const onSubmit = async (data: DoctorFormValues) => {
        try {
            const res = await CreateDoctor({ ...data, displayName: data.name });
            toast.success("Doctor created successfully! ✨");
            reset();
        } catch (error: any) {
            toast.error(error.message || "Failed to create doctor");
        }
    };

    const inputClass = "w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B6CEE] outline-none bg-gray-50 transition-all";

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#2B6CEE] hover:bg-[#1e56cc] text-white rounded-full px-6 shadow-md font-bold transition-all active:scale-95">
                    + Add New Doctor
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[750px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
                <div className="bg-[#2B6CEE] p-6 text-white relative">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white">Doctor Registration</DialogTitle>
                        <p className="text-blue-100 text-sm">Create a new professional profile</p>
                    </DialogHeader>
                    <DialogClose className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors">

                    </DialogClose>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5 max-h-[75vh] overflow-y-auto bg-white">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Full Name" error={errors.name?.message}>
                            <input {...register("name")} placeholder="Dr.example " className={inputClass} />
                        </FormField>
                        <FormField label="Email Address" error={errors.email?.message}>
                            <input {...register("email")} type="email" placeholder="example@clinic.com" className={inputClass} />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Password" error={errors.password?.message}>
                            <input {...register("password")} type="password" placeholder="••••••••" className={inputClass} />
                        </FormField>
                        <FormField label="Confirm Password" error={errors.passwordConfirm?.message}>
                            <input {...register("passwordConfirm")} type="password" placeholder="••••••••" className={inputClass} />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField label="Phone" error={errors.phone?.message}>
                            <input {...register("phone")} placeholder="01xxxxxxxxx" className={inputClass} />
                        </FormField>
                        <FormField label="Years of Experience" error={errors.yearsOfExperience?.message}>
                            <input {...register("yearsOfExperience")} type="number" className={inputClass} />
                        </FormField>
                        <FormField label="Price (EGP)" error={errors.price?.message}>
                            <input {...register("price")} type="number" className={inputClass} />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Date of Birth" error={errors.dateOfBirth?.message}>
                            <input {...register("dateOfBirth")} type="date" className={inputClass} />
                        </FormField>
                        <FormField label="Street Address" error={errors.address?.street?.message}>
                            <input {...register("address.street")} placeholder="e.g. Mohandessin" className={inputClass} />
                        </FormField>
                    </div>

                    <FormField label="Description" error={errors.description?.message}>
                        <textarea {...register("description")} rows={3} placeholder="Tell us about the doctor..." className={`${inputClass} resize-none`} />
                    </FormField>

                    <div className="flex gap-4 pt-4 border-t border-gray-100">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl border-gray-200 text-gray-500 font-semibold hover:bg-gray-50">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-[2] h-12 rounded-xl bg-[#2B6CEE] hover:bg-[#1e56cc] text-white font-bold transition-all shadow-lg shadow-blue-100 active:scale-[0.98]"
                        >
                            {isSubmitting ? "Creating Account..." : "Confirm & Create Doctor"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

