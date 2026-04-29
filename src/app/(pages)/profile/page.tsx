import {
    Briefcase, Edit3, Mail, User, Users, Calendar, Wallet, ShieldCheck
} from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'

interface DashboardData {
    totalDoctors: number
    totalPatients: number
    totalAppointments: number
    revenue: number
    topDoctors: Array<{
        doctor: {
            displayName: string
            specialty: string
            image: string
        }
        totalAppointments: number
    }>
}

interface AdminProfile {
    name: string
    email: string
    role: string
    profilePic: { url: string }
}
async function getDashboardData(token: string): Promise<DashboardData | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/admin/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` },
        next: { revalidate: 300 }
    })
    const data = await res.json()
    return data.status === 'success' ? data.data : null
}

async function getAdminProfile(token: string): Promise<AdminProfile | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    return data.status === 'success' ? data.data.data : null
}

export default async function AdminProfilePage() {
    const session = await getServerSession(authOptions)
    const token = session?.token as string

    const [dashboard, profile] = await Promise.all([
        getDashboardData(token),
        getAdminProfile(token)
    ])

    if (!profile || !dashboard) return <div className="p-10">Loading data...</div>

    const profileImage = profile.profilePic?.url
        || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=2B6CEE&color=fff&size=128`


    return (
        <div className="p-8 bg-[#F8F9FC] min-h-screen">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-[#E7EBF3] p-8 shadow-sm mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <div className="h-32 w-32 rounded-full border-4 border-white shadow-sm overflow-hidden">
                            <img
                                src={profileImage}
                                alt={profile.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-500 border-4 border-white rounded-full" title="Online" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-[#0D121B]">{profile.name}</h1>
                            <span className="w-fit mx-auto md:mx-0 px-3 py-1 rounded-full bg-[#2B6CEE1A] text-[#2B6CEE] text-xs font-semibold uppercase tracking-wider">
                                {profile.role}
                            </span>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-y-3 gap-x-6 text-[#4C669A] text-sm">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" /> {profile.email}
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4" /> System Access: Full Admin
                            </div>
                        </div>
                    </div>

                    <Link href="/Settings">
                        <button className="flex items-center gap-2 bg-[#2B6CEE] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-md shadow-blue-100">
                            <Edit3 className="h-4 w-4" /> Edit Profile
                        </button>
                    </Link>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-[#E7EBF3] shadow-sm">
                            <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <p className="text-sm text-[#4C669A]">Total Doctors</p>
                            <p className="text-2xl font-bold text-[#0D121B]">{dashboard.totalDoctors}</p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-[#E7EBF3] shadow-sm">
                            <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                                <User className="h-6 w-6 text-green-600" />
                            </div>
                            <p className="text-sm text-[#4C669A]">Total Patients</p>
                            <p className="text-2xl font-bold text-[#0D121B]">{dashboard.totalPatients}</p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-[#E7EBF3] shadow-sm">
                            <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center mb-3">
                                <Calendar className="h-6 w-6 text-purple-600" />
                            </div>
                            <p className="text-sm text-[#4C669A]">Appointments</p>
                            <p className="text-2xl font-bold text-[#0D121B]">{dashboard.totalAppointments}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#E7EBF3] p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-[#0D121B] mb-6 flex items-center gap-2 border-b border-gray-50 pb-4">
                            <Briefcase className="h-5 w-5 text-[#2B6CEE]" /> Top Performing Doctors
                        </h3>
                        {dashboard.topDoctors.map((item, idx) => {

                            const doctorImage =
                                item.doctor.image && item.doctor.image !== "default-doctor.jpg"
                                    ? `${process.env.NEXT_PUBLIC_URL_API}/uploads/doctors/${item.doctor.image}`
                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.doctor.displayName)}&background=2B6CEE&color=fff`;

                            return (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">

                                        <div className="h-10 w-10 rounded-full overflow-hidden">
                                            <img
                                                src={doctorImage}
                                                alt={item.doctor.displayName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div>
                                            <p className="font-semibold text-[#0D121B]">
                                                {item.doctor.displayName}
                                            </p>
                                            <p className="text-xs text-[#4C669A]">
                                                {item.doctor.specialty}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-bold text-[#2B6CEE]">
                                            {item.totalAppointments} Appts
                                        </p>
                                        <p className="text-[10px] text-[#4C669A] uppercase">
                                            Performance
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white rounded-2xl border border-[#E7EBF3] p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                                <Wallet className="h-6 w-6 text-yellow-600" />
                            </div>
                            <h3 className="font-bold text-[#0D121B]">Total Revenue</h3>
                        </div>
                        <p className="text-3xl font-bold text-[#0D121B] mb-1">{dashboard.revenue} EGP</p>
                        <p className="text-xs text-green-500 font-medium">↑ 12% from last month</p>
                    </div>
                </div>
            </div>
        </div>
    )
}




