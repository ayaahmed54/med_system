"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function CreateDoctor(formData: any) {
    try {
        const session = await getServerSession(authOptions);
        const token = session?.token;


        if (!token) throw new Error("Unauthorized");


        const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_API}/doctors/createDoctor`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        const data = await response.json();

        console.log("📥 API RESPONSE:", data);

        if (!response.ok) {
            console.error(" API ERROR:", data);
            throw new Error(data.message || "Failed to create doctor");
        }

        return data;
    } catch (error) {
        console.error(" SERVER ACTION ERROR:", error);
        throw error;
    }
}
