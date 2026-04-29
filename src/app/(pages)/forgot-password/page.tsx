"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Loader2 } from "lucide-react"

import { forgotPasswordSchema } from "@/schema/forgotPasswordSchema"

export default function ForgotPasswordForm() {
    const router = useRouter()

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ""
        },
    });

    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_URL_API;
            const response = await fetch(`${baseUrl}/users/forgotPassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: values.email }),
            });

            const data = await response.json();
            if (response.ok || data.statusmsg === 'success') {
                toast.success("Reset code sent! Check your email. 📧");



                router.push(`/reset-password?token=${data.token}`);


            } else {
                toast.error(data.message || "Failed to send reset code");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 border border-[#E2E8F0] rounded-[24px] shadow-sm flex flex-col items-center">
                <h1 className="text-[24px] font-bold text-[#0F172A] tracking-tight mb-1">
                    Forgot Password?
                </h1>
                <p className="text-[14px] text-[#64748B] mb-8 text-center px-4">
                    Enter your email address and we&apos;ll send you a code to reset your password.
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
                                            type="email"
                                            placeholder="Enter your registered email"
                                            className="h-12 rounded-xl border-[#E2E8F0] px-4 focus:ring-[#2E37A4]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[11px]" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 bg-[#2E37A4] hover:bg-[#1e256d] rounded-xl text-[16px] font-bold transition-all shadow-md shadow-blue-100"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="animate-spin h-4 w-4" /> Sending...
                                </div>
                            ) : (
                                "Send Reset Code"
                            )}
                        </Button>

                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                onClick={() => router.push("/reset-Password")}
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
