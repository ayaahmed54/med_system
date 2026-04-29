"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import { resetPasswordSchema } from "@/schema/resetPasswordSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            passwordConfirm: ""
        },
    });

    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
        try {
            if (!token) {
                toast.error("Missing reset token");
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/user/resetPassword/${token}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        password: values.password,
                        passwordConfirm: values.passwordConfirm,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                toast.success("Password reset successfully 🔥");
                router.push("/login");
            } else {
                toast.error(data.message || "Invalid or expired token");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">

                <h1 className="text-2xl font-bold text-center mb-2">
                    New Password
                </h1>

                <p className="text-sm text-gray-500 text-center mb-8">
                    Enter your new password
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full"
                        >
                            {isSubmitting ? "Updating..." : "Reset Password"}
                        </Button>

                    </form>
                </Form>
            </div>
        </div>
    );
}

