
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import {
    User, Lock, Bell, Camera, Save, LogOut, Loader2,
    ShieldCheck, Mail, Smartphone, ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Settings() {
    const { data: session, update, status } = useSession(); // أضفنا status هنا
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);

    const [formData, setFormData] = useState({ name: "", email: "" });
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    if (status === "loading") {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
                <div className="text-center font-sans">
                    <div className="flex flex-col gap-6 items-center justify-center">
                        <div className="w-20 h-20 border-4 border-transparent text-[#2B6CEE] animate-spin flex items-center justify-center border-t-[#2B6CEE] rounded-full">
                            <div className="w-14 h-14 border-4 border-transparent text-[#EF4444] animate-spin flex items-center justify-center border-t-[#EF4444] rounded-full"></div>
                        </div>
                        <p className="text-[#4C669A] font-bold text-lg animate-pulse tracking-wide">
                            Loading your settings...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const userImage =
        previewImage ||
        session?.user?.profilePic?.url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || "User")}&background=135BEC&color=fff`;

    useEffect(() => {
        if (session?.user) {
            setFormData({
                name: session.user.name || "",
                email: session.user.email || "",
            });
            setPreviewImage(session.user.profilePic?.url || null);
        }
    }, [session]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/users/updateMe`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                const updatedUser = data.data.user;
                await update({
                    user: {
                        ...session?.user,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        profilePic: updatedUser.profilePic,
                    },
                });
                toast.success("Profile updated successfully ");
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const tempImageUrl = URL.createObjectURL(file);
        setPreviewImage(tempImageUrl);
        const formDataUpload = new FormData();
        formDataUpload.append("profilePic", file);
        setIsUploading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/users/updatePhoto`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${session?.token}` },
                body: formDataUpload,
            });
            const data = await res.json();
            if (res.ok) {
                const newImageUrl = data.data.user.profilePic.url;
                setPreviewImage(newImageUrl);
                await update({
                    user: { ...session?.user, profilePic: { url: newImageUrl } },
                });
                toast.success("Profile photo updated!");
            } else {
                toast.error(data.message || "Failed to update photo");
                setPreviewImage(session?.user?.profilePic?.url || null);
            }
        } catch {
            toast.error("Something went wrong");
            setPreviewImage(session?.user?.profilePic?.url || null);
        } finally {
            setIsUploading(false);
        }
    };

    const handleResetPassword = async () => {
        setResetLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/users/forgotPassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: session?.user?.email }),
            });
            const data = await res.json();
            if (res.ok) {
                if (data.token) router.push(`/reset-password/${data.token}`);
                else toast.success("Check your email for reset link");
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Error");
        } finally {
            setResetLoading(false);
        }
    };
    return <>
        <Tabs defaultValue="profile" className="w-full">
            <TabsList className="bg-white/50 backdrop-blur-md border border-[#E2E8F0] p-1.5 h-auto mb-10 rounded-2xl shadow-sm inline-flex">
                <TabsTrigger value="profile" className="flex gap-2 px-8 py-3 rounded-xl data-[state=active]:bg-[#135BEC] data-[state=active]:text-white transition-all duration-300">
                    <User className="w-4 h-4" /> Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex gap-2 px-8 py-3 rounded-xl data-[state=active]:bg-[#135BEC] data-[state=active]:text-white transition-all duration-300">
                    <Bell className="w-4 h-4" /> Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="flex gap-2 px-8 py-3 rounded-xl data-[state=active]:bg-[#135BEC] data-[state=active]:text-white transition-all duration-300">
                    <Lock className="w-4 h-4" /> Security
                </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
                    <CardHeader className="p-8 pb-4 text-center md:text-left">
                        <CardTitle className="text-xl font-bold text-[#0D121B]">Personal Information</CardTitle>
                        <CardDescription>Update your photo and personal details here.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-4">
                        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">

                            <div className="relative group">
                                <div className="w-40 h-40 rounded-[42px] bg-gradient-to-tr from-[#EFF6FF] to-[#DBEAFE] border-[6px] border-white shadow-2xl flex items-center justify-center overflow-hidden rotate-2 group-hover:rotate-0 transition-transform duration-500">
                                    {isUploading ? (
                                        <Loader2 className="w-10 h-10 animate-spin text-[#135BEC]" />
                                    ) : (
                                        <img src={userImage} className="w-full h-full object-cover" alt="Avatar" />
                                    )}
                                </div>
                                <input type="file" hidden ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" />
                                <Button
                                    size="icon"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-[#135BEC] hover:bg-[#0e48bd] border-4 border-white shadow-lg text-white transition-all hover:scale-110"
                                >
                                    <Camera className="w-5 h-5" />
                                </Button>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="flex-1 w-full space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2.5">
                                        <Label className="text-sm font-bold text-[#334155] ml-1">Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-3.5 w-4 h-4 text-[#94A3B8]" />
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="h-12 pl-11 rounded-2xl border-[#E2E8F0] focus:ring-4 focus:ring-[#135BEC]/10 transition-all bg-[#F8FAFC]/50"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2.5">
                                        <Label className="text-sm font-bold text-[#334155] ml-1">Email Address</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-3.5 w-4 h-4 text-[#94A3B8]" />
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="h-12 pl-11 rounded-2xl border-[#E2E8F0] focus:ring-4 focus:ring-[#135BEC]/10 transition-all bg-[#F8FAFC]/50"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4 border-t border-[#F8FAFC]">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="h-12 px-10 rounded-2xl bg-[#135BEC] hover:bg-[#0e48bd] text-white font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 gap-2"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="notifications" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-[#E2E8F0] shadow-sm rounded-[32px] overflow-hidden bg-white">
                    <CardHeader className="p-8 pb-4">
                        <CardTitle className="text-xl font-bold">Preferences</CardTitle>
                        <CardDescription>Manage how you receive alerts and updates.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-4 space-y-4">
                        <div className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-[24px] border border-[#F1F5F9] group">
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-sm text-[#135BEC] group-hover:scale-110 transition-transform">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#0D121B]">Email Alerts</h4>
                                    <p className="text-sm text-[#64748B]">Get reports directly to your inbox.</p>
                                </div>
                            </div>
                            <Switch defaultChecked className="data-[state=checked]:bg-[#135BEC]" />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="security" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-[#E2E8F0] shadow-sm rounded-[32px] overflow-hidden bg-white">
                    <CardHeader className="p-8 pb-4">
                        <CardTitle className="text-xl font-bold">Security Settings</CardTitle>
                        <CardDescription>Update your password to keep your account safe.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-4">
                        <div className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-[24px] border border-[#F1F5F9]">
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-sm text-[#135BEC]">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#0D121B]">Reset Password</h4>
                                    <p className="text-sm text-[#64748B]">We will send you a reset link to your email.</p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                onClick={handleResetPassword}
                                disabled={resetLoading}
                                className="rounded-xl border-[#E2E8F0] font-bold h-11 px-6 hover:bg-white gap-2"
                            >
                                {resetLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                                Send Link
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs></>
}