import { z } from "zod";

export const doctorSchema = z
    .object({
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
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    });

export type DoctorFormValues = z.infer<typeof doctorSchema>;

