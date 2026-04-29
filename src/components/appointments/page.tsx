import AddAppointments from "@/components/AddAppointments/AddAppointments";

async function getPatients() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/patients`, {
            cache: "no-store",
        });
        const data = await res.json();

        return (data.data || []).map((p: any) => ({
            id: p._id,
            name: p.name,
        }));
    } catch {
        return [];
    }
}

async function getDoctors() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/doctors`, {
            cache: "no-store",
        });
        const data = await res.json();

        return (data.data || []).map((d: any) => ({
            id: d._id,
            name: d.name,
        }));
    } catch {
        return [];
    }
}

export default async function Page() {
    const patients = await getPatients();
    const doctors = await getDoctors();

    return (
        <div className="p-6">
            <AddAppointments patients={patients} doctors={doctors} />
        </div>
    );
}