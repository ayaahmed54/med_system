"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"


export function OTPForm({ className, ...props }: React.ComponentProps<typeof Card>) {
    const router = useRouter()
    const [value, setValue] = React.useState("")
    const [timeLeft, setTimeLeft] = React.useState(30)
    React.useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault()
        if (value.length === 6) {
            router.push("/reset-password")
        }
    }

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Enter verification code</CardTitle>
                <CardDescription>We sent a 6-digit code to your email.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleVerify}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="otp">Verification code</FieldLabel>
                            <InputOTP
                                maxLength={6}
                                id="otp"
                                required
                                value={value}
                                onChange={(val) => setValue(val)}
                            >
                                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            <FieldDescription>
                                Enter the 6-digit code sent to your email.
                            </FieldDescription>
                        </Field>
                        <FieldGroup>
                            <div className="space-y-4">
                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-[#2E37A4] hover:bg-[#1e256d] rounded-lg text-[16px] font-bold transition-all"
                                >
                                    Verify & Proceed
                                </Button>
                                <Link
                                    href="/forgot-password"
                                    className="flex items-center gap-2 text-[14px] text-[#64748B] font-medium hover:text-[#0F172A] transition-colors mt-2"
                                >
                                    <ArrowLeft size={16} />
                                    Back to forgot password
                                </Link>
                            </div>
                            <FieldDescription className="text-center">
                                Didn&apos;t receive the code? <a href="#">Resend</a>
                                <span className="text-[#EF1E1E]">
                                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                                </span>
                            </FieldDescription>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
