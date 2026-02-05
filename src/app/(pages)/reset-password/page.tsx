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
import { resetPasswordSchema } from "@/schema/resetPasswordSchema"
import { useState } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"
export default function ResetPassword() {
    const router = useRouter()
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
    });

    function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
        console.log("New Password:", values.password)
        router.push("/login")
    }
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-10">
            <div className="w-md bg-white p-10 border border-[#E7E8EB] rounded-4xl shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start">
                <div className="w-full flex flex-col gap-1 mb-7.5">
                    <h1 className="text-[20px] font-bold text-[#0A1B39] leading-6 text-center w-full">
                        Reset Password
                    </h1>
                    <p className="text-[14px] text-[#6C7688] opacity-70 leading-5.25 text-center w-full">
                        Your new password must be different from previous used passwords.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5" noValidate>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1 w-full">

                                    <FormLabel className="text-[14px] font-medium text-[#0A1B39] leading-5.25" >

                                        New Password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative flex items-center">

                                            <Input
                                                type="password"
                                                placeholder="************"
                                                className="h-9 rounded-[6px] border-[#E7E8EB] px-3 py-1.5 text-[14px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] ]"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-[11px]" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-1 w-full">
                                    <FormLabel className="text-[14px] font-medium text-[#0A1B39] leading-5.25]">
                                        Confirm Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="************"
                                            className="h-9 rounded-[6px] border-[#E7E8EB] px-3 py-1.5 text-[14px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] ]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[11px]" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full h-10 bg-[#2E37A4] hover:bg-[#232a7d] text-white rounded-[6px] text-[14px] font-semibold mt-2.5 transition-all"
                        >
                            Reset Password
                        </Button>

                        <div className="flex justify-center w-full">
                            <button
                                type="button"
                                onClick={() => router.push("/login")}
                                className="text-[14px] text-[#6C7688] font-normal hover:text-[#0A1B39] transition-colors"
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>

    )
}
