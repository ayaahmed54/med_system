"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/schema/login.schema"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function ReceptionistLogin() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setIsLoading(true)
        try {
            await signIn('credentials', {
                callbackUrl: '/',
                redirect: true,
                email: values.email,
                password: values.password
            })
        } catch (error) {
            console.error("Login failed", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-md h-132.75 bg-white p-8 border border-[#E2E8F0] rounded-[24px] shadow-sm flex flex-col items-center justify-center">
                <h1 className="text-[24px] font-bold text-[#0F172A] tracking-tight mb-1">
                    Welcome back, Receptionist
                </h1>
                <p className="text-[14px] text-[#64748B] mb-6 text-center">
                    Please sign in to manage appointments.
                </p>

                <Form {...form}>
                    {searchParams.get('error') && (
                        <div className="w-full bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                            <h1 className="text-destructive text-sm text-center font-medium">
                                {searchParams.get('error')}
                            </h1>
                        </div>
                    )}

                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4" noValidate>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-[13px] font-medium text-[#0F172A]">Email or Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isLoading}
                                            placeholder="Enter your email"
                                            className="h-13 rounded-3xl border-[#E2E8F0] px-4"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[11px]" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-[13px] font-medium text-[#0F172A]">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isLoading}
                                            type="password"
                                            placeholder="Enter your password"
                                            className="h-13 rounded-4xl border-[#E2E8F0] px-4"
                                        />
                                    </FormControl>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            disabled={isLoading}
                                            onClick={() => router.push("/forgot-password")}
                                            className="text-[12px] text-[#EF1E1E] font-medium hover:underline"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                    <FormMessage className="text-[11px]" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-[#2E37A4] hover:bg-[#1e256d] rounded-lg text-[16px] font-bold transition-all"
                        >
                            {isLoading ? "Logging in..." : "Log In"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}




