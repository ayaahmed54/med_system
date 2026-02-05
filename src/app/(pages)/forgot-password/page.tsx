"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
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
import { ArrowLeft } from "lucide-react"
import { forgotPasswordSchema } from "@/schema/forgotPasswordSchema"



export default function ForgotPassword() {
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            email: ""

        },

        resolver: zodResolver(forgotPasswordSchema),
    });
    function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        console.log("Email submitted:", values.email)
        router.push("/verification")
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-md h-auto bg-white p-8 border border-[#E2E8F0] rounded-[24px] shadow-sm flex flex-col items-center justify-center">
                <h1 className="text-[24px] font-bold text-[#0F172A] tracking-tight mb-1">
                    Forgot Password?
                </h1>
                <p className="text-[14px] text-[#64748B] mb-6 text-center">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6" noValidate>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-[13px] font-medium text-[#0F172A]">Email Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your registered email"
                                            className="h-13 rounded-3xl border-[#E2E8F0] px-4"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[11px]" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full h-12 bg-[#2E37A4] hover:bg-[#1e256d] rounded-lg text-[16px] font-bold transition-all"
                        >
                            Send Reset Link
                        </Button>

                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                onClick={() => router.push("/login")}
                                className="flex items-center gap-2 text-[14px] text-[#64748B] font-medium hover:text-[#0F172A] transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Back to Login
                            </button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
