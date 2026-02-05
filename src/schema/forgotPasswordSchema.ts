import * as z from "zod"

export const forgotPasswordSchema = z.object({
    email: z.email().nonempty("Invalid email"),
})

export type forgotPasswordSchemaForm = z.infer<typeof forgotPasswordSchema>
