"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getAuthToken() {
    const session = await getServerSession(authOptions);
    const token = session?.token;
    if (!token) throw new Error("Unauthorized");
    return token;
}

export async function getPatients() {
    const token = await getAuthToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/patients`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch patients");
    return data.data?.data ?? [];
}

export async function getDoctors() {
    const token = await getAuthToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/doctors`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch doctors");

    return data.data?.data ?? [];
}

export async function BookAppointment(
    doctorId: string,
    patientId: string,
    startTime: string,
    status: string
) {
    const token = await getAuthToken();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/appointments`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                doctor: doctorId,
                patient: patientId,
                startTime,
                status
            }),
        }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to book");

    return data;
}